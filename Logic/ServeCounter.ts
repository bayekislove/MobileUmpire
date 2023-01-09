import { Player } from "./PointsCounting/Player";
import { Point } from "./PointsCounting/Point";
import { Score } from "./PointsCounting/Score";

import getOppositePlayer from "./PointsCounting/Player";

export default class ServeCounter {

    #servingPlayer : Player;
    #isFirstServe : boolean = true;

    constructor() {
        this.#servingPlayer = Player.PLAYER_A;
    };

    public get servingPlayer() {
        return this.#servingPlayer;
    };

    public get isFirstServe() {
        return this.#isFirstServe;
    }
 
    public ifDoubleFaultAfterError() : boolean {
        this.#isFirstServe = !this.#isFirstServe;
        return this.#isFirstServe; // false | false -> true
    };

    public getServingPlayerAfterPointWon(setScoreA : Score, setScoreB : Score) : Player {
        if(setScoreA.pts == Point.ZERO && setScoreB.pts == Point.ZERO) {
            this.#servingPlayer = getOppositePlayer(this.#servingPlayer);
        } else if (setScoreA.gems == 6 && setScoreB.gems == 6) { // tiebreak
            let ptsSum : number = setScoreA.pts + setScoreB.pts;
            if (ptsSum % 2 == 1) {
                this.#servingPlayer = getOppositePlayer(this.#servingPlayer);
            }
        }
        this.#isFirstServe = true;
        return this.#servingPlayer;
    };

};
