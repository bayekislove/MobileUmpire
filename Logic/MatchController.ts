import getOppositePlayer from "./PointsCounting/Player";
import { Score } from "./PointsCounting/Score";
import SetsCounter from "./PointsCounting/SetsCounter";
import ServeCounter from "./ServeCounter";
import StatsCounter from "./Stats/StatsCounter";

const SETS_TO_WIN : number = 3;

export default class MatchController {
    #pointsCounter : SetsCounter = new SetsCounter();
    #serveCounter : ServeCounter = new ServeCounter();
    #statsCounter : StatsCounter = new StatsCounter(SETS_TO_WIN);

    public get playerAScore() : Score {
        return this.#pointsCounter.playerAScore;
    };

    public get playerBScore() : Score {
        return this.#pointsCounter.playerAScore;
    };
}