import { expect } from '@jest/globals';

import MatchLogic from '../Logic/MatchLogic';
import { Player } from '../Logic/PointsCounting/Player';
import PointResult from '../Logic/PointsCounting/PointResult';

describe('MatchLogic', () => {
    it('decreases challanges correctly at set start', () => {
        let matchLogic = new MatchLogic(3);
        matchLogic.decreaseChallanges(Player.PLAYER_A);
        expect(matchLogic.playerAChallanges).toBe(2);
        matchLogic.decreaseChallanges(Player.PLAYER_B);
        expect(matchLogic.playerBChallanges).toBe(2);
    });

    it('decreases challanges correctly at set start', () => {
        let matchLogic = new MatchLogic(3);
        for(let _ = 0; _ < 20; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        for(let _ = 0; _ < 20; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_B);
        }
        for(let _ = 0; _ < 4; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        for(let _ = 0; _ < 4; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_B);
        }
        expect(matchLogic.playerAChallanges).toBe(4);
        expect(matchLogic.playerBChallanges).toBe(4);
    });

    it('decreases challanges correctly at set start', () => {
        let matchLogic = new MatchLogic(3);
        for(let _ = 0; _ < 20; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        for(let _ = 0; _ < 20; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_B);
        }
        for(let _ = 0; _ < 4; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        for(let _ = 0; _ < 4; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_B);
        }
        expect(matchLogic.playerAChallanges).toBe(4);
        expect(matchLogic.playerBChallanges).toBe(4);
        for(let _ = 0; _ < 7; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        expect(matchLogic.playerAChallanges).toBe(3);
        expect(matchLogic.playerBChallanges).toBe(3);
    });

    it('increases challanges correctly at set start', () => {
        let matchLogic = new MatchLogic(3);
        for(let _ = 0; _ < 20; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        for(let _ = 0; _ < 20; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_B);
        }
        for(let _ = 0; _ < 4; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        for(let _ = 0; _ < 4; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_B);
        }
        expect(matchLogic.playerAChallanges).toBe(4);
        expect(matchLogic.playerBChallanges).toBe(4);
        matchLogic.decreaseChallanges(Player.PLAYER_A);
        expect(matchLogic.playerAChallanges).toBe(3);
        matchLogic.decreaseChallanges(Player.PLAYER_A);
        expect(matchLogic.playerAChallanges).toBe(2);
        matchLogic.decreaseChallanges(Player.PLAYER_A);
        expect(matchLogic.playerAChallanges).toBe(1);
        matchLogic.decreaseChallanges(Player.PLAYER_A);
        expect(matchLogic.playerAChallanges).toBe(0);
        matchLogic.decreaseChallanges(Player.PLAYER_B);
        expect(matchLogic.playerBChallanges).toBe(3);
        matchLogic.decreaseChallanges(Player.PLAYER_B);
        expect(matchLogic.playerBChallanges).toBe(2);
        matchLogic.decreaseChallanges(Player.PLAYER_B);
        expect(matchLogic.playerBChallanges).toBe(1);
        matchLogic.decreaseChallanges(Player.PLAYER_B);
        expect(matchLogic.playerBChallanges).toBe(0);
        for(let _ = 0; _ < 7; _++) {
            matchLogic.handlePointResult(PointResult.WINNER, Player.PLAYER_A);
        }
        expect(matchLogic.playerAChallanges).toBe(3);
        expect(matchLogic.playerBChallanges).toBe(3);
    });
});
