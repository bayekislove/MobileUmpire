import PointResult from "./PointsCounting/PointResult";
import getOppositePlayer, { Player } from "./PointsCounting/Player";
import { Point } from "./PointsCounting/Point";
import { Score } from "./PointsCounting/Score";
import SetsCounter from "./PointsCounting/SetsCounter";
import ServeCounter from "./ServeCounter";
import StatsCounter from "./Stats/StatsCounter";
import StatsType from "./Stats/StatsType";

const DEFAULT_CHALLANGES_START_VAL = 3;

export default class MatchLogic {

    #pointsCounter : SetsCounter;
    #serveCounter : ServeCounter;
    #statsCounter : StatsCounter;
    #challanges : Map<Player, number> = new Map<Player, number>();
    #timeToServe : number = 25;

    constructor(setsToWin : number) {
        this.#pointsCounter = new SetsCounter(setsToWin);
        this.#serveCounter = new ServeCounter();
        this.#statsCounter = new StatsCounter(setsToWin);

        this.getCurrentSet.bind(this);
        this.convertPointResultToStatType.bind(this);
        this.handlePointResult.bind(this);
        this.handleServeError.bind(this);
        this.decreaseChallanges.bind(this);

        this.#challanges.set(Player.PLAYER_A, DEFAULT_CHALLANGES_START_VAL);
        this.#challanges.set(Player.PLAYER_B, DEFAULT_CHALLANGES_START_VAL);
    };

    public get playerAScore() : Score {
        return this.#pointsCounter.playerAScore;
    };

    public get playerASetsScore() : number[] {
        return this.#pointsCounter.playerASetsScore;
    };

    public get playerBScore() : Score {
        return this.#pointsCounter.playerBScore;
    };

    public get playerBSetsScore() : number[] {
        return this.#pointsCounter.playerBSetsScore;
    };

    public get playerAChallanges() : number {
        return this.#challanges.get(Player.PLAYER_A) as number;
    };

    public get playerBChallanges() : number {
        return this.#challanges.get(Player.PLAYER_B) as number;
    };

    get isTiebreak() : boolean {
        return this.#pointsCounter.isTiebreak();
    };

    get isFirstServe() : boolean {
        return this.#serveCounter.isFirstServe;
    };

    get servingPlayer() : Player {
        return this.#serveCounter.servingPlayer;
    };

    get playerAStats() : Array<Map<StatsType, number>> {
        return this.#statsCounter.playerAStats;
    };

    get playerBStats() : Array<Map<StatsType, number>> {
        return this.#statsCounter.playerBStats;
    };

    get isMatchFinished() : boolean {
        return this.#pointsCounter.isMatchFinished();
    };

    get timeToServe() : number {
        return this.#timeToServe;
    };

    addChallanges() {
        if( this.#pointsCounter.playerAScore.gems == 0 &&
            this.#pointsCounter.playerAScore.pts == Point.ZERO &&
            this.#pointsCounter.playerBScore.gems == 0 &&
            this.#pointsCounter.playerBScore.pts == Point.ZERO) {
                this.#challanges.set(Player.PLAYER_A, 3);
                this.#challanges.set(Player.PLAYER_B, 3);
        }
        if( this.isTiebreak &&
            this.#pointsCounter.playerAScore.pts == 0 &&
            this.#pointsCounter.playerBScore.pts == 0) {
                this.#challanges.set(Player.PLAYER_A,
                    (this.#challanges.get(Player.PLAYER_A) as number) + 1);
                this.#challanges.set(Player.PLAYER_B,
                    (this.#challanges.get(Player.PLAYER_B) as number) + 1);
        }
    };

    changeTimeoutIfNeeded() {
        let currentGem = this.playerASetsScore.reduce((sum, gems) => sum + gems, 0) +
            this.playerBSetsScore.reduce((sum, gems) => sum + gems, 0) + 1;

        if(this.playerAScore.gems + this.playerBScore.gems == 0 &&
            this.playerAScore.pts + this.playerBScore.pts == 0) {
            this.#timeToServe = 120;
        }
        else if(this.playerAScore.gems + this.playerBScore.gems == 1 || 
            this.isTiebreak) {
            this.#timeToServe = 25;
        } else if (currentGem % 2 == 0 &&
            this.playerAScore.pts + this.playerBScore.pts == 0) {
            this.#timeToServe = 90;
        } else {
            this.#timeToServe = 25;
        }
    };

    decreaseChallanges(player: Player) {
        this.#challanges.set(player, Math.max((this.#challanges.get(player) as number) - 1, 0));
    };

    getCurrentSet() : number {
        return this.#pointsCounter.playerAScore.sets + this.#pointsCounter.playerBScore.sets + 1;
    }

    convertPointResultToStatType = (pointResult : PointResult) => {
        switch (pointResult) {
            case PointResult.ACE:
                return StatsType.ACES

            case PointResult.UNFORCED_ERROR:
                return StatsType.UNFORCED_ERRORS
                
            case PointResult.WINNER:
                return StatsType.WINNERS
        
            default:
                return StatsType.FIRST_SERVES_IN;
        }
    }

    handleServeError = () => {
        if(this.#pointsCounter.isMatchFinished()){
            return;
        }
        if (this.#serveCounter.ifDoubleFaultAfterError()) {
            let doubleFaultPlayer = this.#serveCounter.servingPlayer;
            let pointWonPlayer = getOppositePlayer(doubleFaultPlayer);
            this.#statsCounter.addDoubleFault(doubleFaultPlayer, this.getCurrentSet());

            this.#pointsCounter.handlePointWon(pointWonPlayer);

            this.#serveCounter.getServingPlayerAfterPointWon(
                this.#pointsCounter.playerAScore,
                this.#pointsCounter.playerBScore);
            this.addChallanges();
            this.changeTimeoutIfNeeded();
        }
        this.#statsCounter.addServe(this.#serveCounter.servingPlayer, this.getCurrentSet());
    }

    handlePointResult = (pointResult : PointResult, player : Player) => {
        if(this.#pointsCounter.isMatchFinished()){
            return;
        }
        let stat = this.convertPointResultToStatType(pointResult);
        let statFunction = this.#statsCounter.getStatFunction(stat);

        statFunction(player, this.getCurrentSet());
        if(this.#serveCounter.isFirstServe) {
            this.#statsCounter.addFirstServeIn(
                this.#serveCounter.servingPlayer, this.getCurrentSet());
        };
        this.#statsCounter.addServe(this.#serveCounter.servingPlayer, this.getCurrentSet());
        if(pointResult == PointResult.UNFORCED_ERROR) {
            player = getOppositePlayer(player);
        }
        this.#pointsCounter.handlePointWon(player);
        this.#serveCounter.getServingPlayerAfterPointWon(
            this.#pointsCounter.playerAScore,
            this.#pointsCounter.playerBScore);
        this.addChallanges();
        this.changeTimeoutIfNeeded();
    }
};
