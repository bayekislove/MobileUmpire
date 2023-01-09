import { Player } from './Player';
import { IPointsCounter, RegularCounter, TiebreakCounter } from './PointsCounters'

const pointsToWinTiebreak = 7;

export class GemsCounter {

    #playerAgems : number;
    #playerBgems : number;
    #counter : IPointsCounter;

    constructor() {
        this.#playerAgems = 0;
        this.#playerBgems = 0;
        this.#counter = new RegularCounter();
    }

    public get playerAgems() {
        return this.#playerAgems;
    };

    public get playerBgems() {
        return this.#playerBgems;
    };

    public get playerApts() {
        return this.#counter.playerApts;
    }

    public get playerBpts() {
        return this.#counter.playerBpts;
    }

    public handlePointWon(player : Player) {
        this.#counter.handlePointWon(player);
        if(this.#counter.whichPlayerWon() != Player.NO_PLAYER) {
            this.handleGemWon(this.#counter.whichPlayerWon());
        }
    }

    public whichPlayerWon() {
        if((this.#playerAgems == 6 && this.#playerBgems < 5) || 
            (this.#playerAgems == 7)) {
                return Player.PLAYER_A;
        }
        else if((this.#playerBgems == 6 && this.#playerAgems < 5) || 
            (this.#playerBgems == 7)) {
                return Player.PLAYER_B;
        } else {
            return Player.NO_PLAYER;
        }
    }

    private handleGemWon(player : Player) {
        if(player == Player.PLAYER_A) {
            this.#playerAgems += 1;
        } else if(player == Player.PLAYER_B){
            this.#playerBgems += 1;
        }
        this.#counter = (this.#playerAgems == 6 && this.#playerBgems == 6) ?
            new TiebreakCounter(pointsToWinTiebreak) : new RegularCounter();
    }

};