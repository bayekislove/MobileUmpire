import { expect } from '@jest/globals';

import StatsCounter, * as SUT from '../Logic/Stats/StatsCounter';
import StatsStype from '../Logic/Stats/StatsType';
import { Player } from '../Logic/PointsCounting/Player';

describe('StatsCounter', () => {
    it('Ace adds also point', () => {
        let statsCounter = new StatsCounter(3);
        statsCounter.addAce(Player.PLAYER_A, 1);
        statsCounter.addServe(Player.PLAYER_A, 1);

        expect(statsCounter.playerAStats[0].get(StatsStype.ACES)).toBe(1);
        expect(statsCounter.playerAStats[0].get(StatsStype.TOTAL_SERVES)).toBe(1);
        expect(statsCounter.playerAStats[0].get(StatsStype.POINTS_WON)).toBe(1);
    });

    it('First serve adds', () => {
        let statsCounter = new StatsCounter(3);
        statsCounter.addFirstServeIn(Player.PLAYER_A, 1);

        expect(statsCounter.playerAStats[0].get(StatsStype.FIRST_SERVES_IN)).toBe(1);
    });

    it('Double fault adds point for opponent', () => {
        let statsCounter = new StatsCounter(3);
        statsCounter.addDoubleFault(Player.PLAYER_A, 1);

        expect(statsCounter.playerAStats[0].get(StatsStype.DOUBLE_FAULTS)).toBe(1);
        expect(statsCounter.playerBStats[0].get(StatsStype.POINTS_WON)).toBe(1);
    });
});
