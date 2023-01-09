import * as Point from './Point'

import { Player } from './Player';

export interface IPointsCounter {
    handlePointWon(player : Player) : void;
    whichPlayerWon() : Player;
    get playerApts() : Point.Point;
    get playerBpts() : Point.Point;
}

export class RegularCounter implements IPointsCounter {
    #playerApts : Point.Point;
    #playerBpts : Point.Point;

    constructor() {
        this.#playerApts = Point.Point.ZERO;
        this.#playerBpts = Point.Point.ZERO;
    };

    public get playerApts() {
        return this.#playerApts;
    };

    public get playerBpts() {
        return this.#playerBpts;
    };

    handlePointWon = (player : Player) => {
        // if(this.whichPlayerWon() != Player.NO_PLAYER){
        //     return;
        // }

        if (player === Player.PLAYER_A) {
            if (this.#playerApts === Point.Point.FORTY &&
                    this.#playerBpts < Point.Point.FORTY ) {
                this.#playerApts = Point.Point.WON;
            } else if (this.#playerBpts === Point.Point.AD) {
                this.#playerBpts = Point.Point.FORTY;
            } else {
                this.#playerApts = Point.Point.addPoint(this.playerApts);
            }
        }

        else if (player === Player.PLAYER_B) {
            if (this.#playerBpts === Point.Point.FORTY &&
                    this.#playerApts < Point.Point.FORTY ) {
                this.#playerBpts = Point.Point.WON;
            } else if (this.#playerApts === Point.Point.AD) {
                this.#playerApts = Point.Point.FORTY;
            } else {
                this.#playerBpts = Point.Point.addPoint(this.#playerBpts);
            }
        }
    };

    whichPlayerWon() : Player {
        if (this.#playerApts == Point.Point.WON) {
            return Player.PLAYER_A;
        } else if (this.#playerBpts == Point.Point.WON) {
            return Player.PLAYER_B;
        } else {
            return Player.NO_PLAYER;
        }
    };
}

export class TiebreakCounter implements IPointsCounter {
    #playerApts : number;
    #playerBpts : number;
    #pointsToWin : number;

    constructor(pointsToWin : number) {
        this.#playerApts = 0;
        this.#playerBpts = 0;
        this.#pointsToWin = pointsToWin;
    };

    public get playerApts() {
        return this.#playerApts;
    };

    public get playerBpts() {
        return this.#playerBpts;
    };

    handlePointWon = (player : Player) => {
        if(player == Player.PLAYER_A) {
            this.#playerApts += 1;
        } else if(player == Player.PLAYER_B) {
            this.#playerBpts += 1;
        }
    }

    whichPlayerWon() : Player {
        if(this.ifLeftWonAgainstRight(this.#playerApts, this.#playerBpts)){
            return Player.PLAYER_A;
        } else if (this.ifLeftWonAgainstRight(this.#playerBpts, this.#playerApts)) {
            return Player.PLAYER_B;
        }
        return Player.NO_PLAYER;
    };

    ifLeftWonAgainstRight(leftPts : number, rightPts : number) : boolean {
        if(leftPts < this.#pointsToWin) {
            return false;
        }
        if((leftPts == this.#pointsToWin) && 
            (rightPts < this.#pointsToWin - 1)) {
                return true;
            }
        return leftPts > rightPts + 1;
    };
}