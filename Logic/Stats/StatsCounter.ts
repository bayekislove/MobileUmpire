import { Player } from "../PointsCounting/Player";
import StatsType from "./StatsType";
import getOppositePlayer from "../PointsCounting/Player";

export default class StatsCounter {

#playerAstats = new Array<Map<StatsType, number>>();
#playerBstats = new Array<Map<StatsType, number>>();

constructor(noOfSets : number) {
    this.#playerAstats = 
        Array(noOfSets + 1).fill(null).map((_, i) => new Map<StatsType, number>());

    this.#playerBstats = 
        Array(noOfSets + 1).fill(null).map((_, i) => new Map<StatsType, number>());

    for(let i = 0; i < noOfSets + 1; i++)
    {
        let stats = this.getStatsByPlayer(Player.PLAYER_A, i);
        this.initStats(stats);

        stats = this.getStatsByPlayer(Player.PLAYER_B, i);
        this.initStats(stats);
    }

    this.incrementStat = this.incrementStat.bind(this);
    this.getStatFunction = this.getStatFunction.bind(this);
    this.addWinner = this.addWinner.bind(this);
    this.addAce = this.addAce.bind(this);
    this.addDoubleFault = this.addDoubleFault.bind(this);
    this.addUnforcedError = this.addUnforcedError.bind(this);
    this.addFirstServeIn = this.addFirstServeIn.bind(this);
}

public get playerAStats() {
    return this.#playerAstats;
}

public get playerBStats() {
    return this.#playerBstats;
}

public getStatFunction(stat : StatsType) {
    switch(stat)
    {
        case StatsType.ACES:
            return this.addAce;
        case StatsType.DOUBLE_FAULTS:
            return this.addDoubleFault;
        case StatsType.FIRST_SERVES_IN:
            return this.addFirstServeIn;
        case StatsType.WINNERS:
            return this.addWinner;
        case StatsType.UNFORCED_ERRORS:
            return this.addUnforcedError;
        default:
            return (player : Player) => {};
    }
}

public addAce(player: Player, setNumber: number) {
    this.incrementStat(StatsType.ACES, player, setNumber);
    this.incrementStat(StatsType.POINTS_WON, player, setNumber);
}

public addFirstServeIn(player: Player, setNumber: number) {
    this.incrementStat(StatsType.FIRST_SERVES_IN, player, setNumber);
}

public addDoubleFault(player: Player, setNumber: number) {
    this.incrementStat(StatsType.DOUBLE_FAULTS, player, setNumber);
    this.incrementStat(StatsType.POINTS_WON, getOppositePlayer(player), setNumber);
}

public addWinner(player: Player, setNumber: number) {
    this.incrementStat(StatsType.WINNERS, player, setNumber);
    this.incrementStat(StatsType.POINTS_WON, player, setNumber);
}

public addUnforcedError(player: Player, setNumber: number) {
    this.incrementStat(StatsType.UNFORCED_ERRORS, player, setNumber);
    this.incrementStat(StatsType.POINTS_WON, getOppositePlayer(player), setNumber);
}

public addServe(player: Player, setNumber: number){
    this.incrementStat(StatsType.TOTAL_SERVES, player, setNumber);
}

private incrementStat(stat : StatsType, player : Player, setNumber: number) {
    let currValue = this.getStatsByPlayer(player, setNumber).get(stat) as number;
    this.getStatsByPlayer(player, setNumber).set(stat, currValue + 1);

    currValue = this.getStatsByPlayer(player, 0).get(stat) as number;
    this.getStatsByPlayer(player, 0).set(stat, currValue + 1);
}

private getStatsByPlayer(player: Player, setNumber: number) : Map<StatsType, number> {
    if (player == Player.PLAYER_A) {
        return this.#playerAstats[setNumber];
    }
    return this.#playerBstats[setNumber];
}

initStats(stats: Map<StatsType, number>) {
    stats.set(StatsType.ACES, 0);
    stats.set(StatsType.FIRST_SERVES_IN, 0);
    stats.set(StatsType.TOTAL_SERVES, 0);
    stats.set(StatsType.DOUBLE_FAULTS, 0);
    stats.set(StatsType.UNFORCED_ERRORS, 0);
    stats.set(StatsType.WINNERS, 0);
    stats.set(StatsType.POINTS_WON, 0);
}

};