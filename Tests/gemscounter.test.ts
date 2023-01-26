import { describe, expect } from '@jest/globals';

import { Player } from '../Logic/PointsCounting/Player';
import * as SUT from '../Logic/PointsCounting/GemsCounter';

describe('SetCounter', () => {
    it.each([
        [0, 1],
        [1, 0],
        [3, 2],
        [4, 5],
        [4, 0]])
        ("Handles adding %p gems for A and %p gems for B but game still on",
            (gemsA : number, gemsB : number) => {
                let counter = getSetCounterWithSetScore(gemsA, gemsB);
                expect(counter.playerAgems).toBe(gemsA);
                expect(counter.playerBgems).toBe(gemsB);
                expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);
    });

    it.each([
        [4, 6],
        [3, 6],
        [1, 6]])
        ("Handles adding %p gems for A and %p gems for B, B won",
            (gemsA : number, gemsB : number) => {
                let counter = getSetCounterWithSetScore(gemsA, gemsB);
                expect(counter.playerAgems).toBe(gemsA);
                expect(counter.playerBgems).toBe(gemsB);
                expect(counter.whichPlayerWon()).toBe(Player.PLAYER_B);
    });

    it('B wins 7-5', () => {
        let counter = getSetCounterWithSetScore(5, 5);
        expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);
        for(let _ = 0; _ < 4 * 2; _++) {
            counter.handlePointWon(Player.PLAYER_B);
        }
        expect(counter.whichPlayerWon()).toBe(Player.PLAYER_B);
    });

    it('A wins tiebreak', () => {
        let counter = getSetCounterWithSetScore(5, 6);
        expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);
        for(let _ = 0; _ < 11; _++) {
            counter.handlePointWon(Player.PLAYER_A);
        };
        expect(counter.playerAgems).toBe(7);
        expect(counter.whichPlayerWon()).toBe(Player.PLAYER_A);
    });
});

function getSetCounterWithSetScore(playerAgems : number,
    playerBgems : number) {

    let counter = new SUT.GemsCounter();
    for(let _ = 0; _ < 4 * playerAgems; _++) {
        counter.handlePointWon(Player.PLAYER_A);
    }

    for(let _ = 0; _ < 4 * playerBgems; _++) {
        counter.handlePointWon(Player.PLAYER_B);
    }

    return counter;
}