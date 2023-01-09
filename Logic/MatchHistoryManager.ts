import IdentityManager from "./IdentityManager";
import StatsType from "./Stats/StatsType";

const fetchDest : string = "http://192.168.1.24:8080"

export type MatchRecord = {
    playerAName : string,
    playerBName : string,
    duration: string,
    date: string,
    tournamentName: string,
    round: string,
    result: string,
    umpire: string
}

export default class MatchHistoryManager {

    static getMatchHistoryForPlayer = async () => {
        return await fetch(
            fetchDest + `/matches/${await IdentityManager.loggedUser()}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((res) => {
            return res as Array<MatchRecord>;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static addMatchToHistory = async (info : MatchRecord,
        statsPlayerA : Array<Map<StatsType, number>>,
        statsPlayerB : Array<Map<StatsType, number>>) => {
        info.umpire = await IdentityManager.loggedUser();
        await fetch(fetchDest + '/matches', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)
        });
    }
};
