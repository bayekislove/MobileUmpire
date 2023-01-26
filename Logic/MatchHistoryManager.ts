import IdentityManager from "./IdentityManager";
import StatsType, { STATS_TYPE_LENGTH } from "./Stats/StatsType";

const fetchDest : string = "https://mobile-umpire.onrender.com";

export type MatchRecord = {
    playeraname : string,
    playerbname : string,
    duration: string,
    date: string,
    tournamentname: string,
    round: string,
    result: string,
    id? : number
};

const statsMapToArray = (stats : Map<StatsType, number>) => {
    let statsInArr : Array<number> = new Array<number>();
    for(let i = 0; i < STATS_TYPE_LENGTH; i++) {
        statsInArr[i] = stats.get(i as StatsType) as number; 
    }
    return statsInArr;
};

const statsArrayToMap = (stats : Array<number>) => {
    let statsInMap : Map<StatsType, number> = new Map<StatsType, number>();
    for(let i = 0; i < stats.length; i++) {
        statsInMap.set(i as StatsType, stats[i]);
    }
    return statsInMap;
}

const serializeStats = (stats : Array<Map<StatsType, number>>) => {
    return stats.map(setStat => statsMapToArray(setStat));
};

const deserializeStats = (stats : Array<Array<number>>) => {
    return stats.map(setStat => statsArrayToMap(setStat));
}

export default class MatchHistoryManager {

    static getMatchHistoryForPlayer = async () => {
        return await fetch(
            fetchDest + `/matches`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await IdentityManager.getToken()
            }
        })
        .then(response => response.json())
        .then((res) => {
            console.log(res as Array<MatchRecord>);
            return res as Array<MatchRecord>;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static getMatchStatsForMatch = async (matchId : number) => {
        console.log(`fetching match with id: ${matchId}`);
        return await fetch(
            fetchDest + `/stats/${matchId}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await IdentityManager.getToken()
            }
        })
        .then(response => response.json())
        .then((res) => {
            let playerAStats = deserializeStats(res[0]);
            let playerBStats = deserializeStats(res[1]);
            return [playerAStats, playerBStats];
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static addMatchToHistory = async (info : MatchRecord,
        statsPlayerA : Array<Map<StatsType, number>>,
        statsPlayerB : Array<Map<StatsType, number>>) => {
        console.log(info.duration);
        let matchSummaryWithStats = {info : {...info},
            statsPlayerA: serializeStats(statsPlayerA),
            statsPlayerB: serializeStats(statsPlayerB)};

        await fetch(fetchDest + '/matches', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await IdentityManager.getToken()
            },
            body: JSON.stringify(matchSummaryWithStats)
        });
    }

    static deleteMatchFromHistory = async (matchId : number) => {
        await fetch(fetchDest + `/matches/${matchId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await IdentityManager.getToken()
            },
        });
    }
};
