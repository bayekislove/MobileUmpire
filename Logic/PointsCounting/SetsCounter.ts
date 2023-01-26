import { Score } from "./Score";
import { GemsCounter } from "./GemsCounter";
import { Player } from "./Player";

export default class SetsCounter {

    #playerAsets : number;
    #playerBsets : number;
    #counter : GemsCounter;
    #playerAMatchScore : Array<number>;
    #playerBMatchScore : Array<number>;
    #setsToWin : number;

    constructor(maxSets : number) {
        this.#counter = new GemsCounter();
        this.#playerAsets = 0;
        this.#playerBsets = 0;
        this.#playerAMatchScore = new Array<number>();
        this.#playerBMatchScore = new Array<number>();
        this.#setsToWin = Math.ceil(maxSets / 2);
    }

    public get playerAScore() : Score {
        return {
            pts: this.#counter.playerApts,
            gems: this.#counter.playerAgems,
            sets: this.#playerAsets
        };
    };

    public get playerBScore() : Score {
        return {
            pts: this.#counter.playerBpts,
            gems: this.#counter.playerBgems,
            sets: this.#playerBsets
        };
    };

    public get playerASetsScore() : Array<number> {
        return [...this.#playerAMatchScore, this.#counter.playerAgems];
    }

    public get playerBSetsScore() : Array<number> {
        return [...this.#playerBMatchScore, this.#counter.playerBgems];
    }

    public handlePointWon(player : Player) {
        this.#counter.handlePointWon(player);
        if(this.#counter.whichPlayerWon() != Player.NO_PLAYER) {
            this.handleSetWon(this.#counter.whichPlayerWon());

            this.#playerAMatchScore.push(this.#counter.playerAgems);
            this.#playerBMatchScore.push(this.#counter.playerBgems);

            this.#counter = new GemsCounter();
        }
    };

    public isTiebreak() {
        return this.#counter.playerAgems == 6 &&
            this.#counter.playerBgems == 6;
    }

    public isMatchFinished() {
        return this.#playerAsets == this.#setsToWin
            || this.#playerBsets == this.#setsToWin;
    }

    private handleSetWon(player : Player) {
        if(player == Player.PLAYER_A) {
            this.#playerAsets += 1;
        } else {
            this.#playerBsets += 1;
        }
    }
}
