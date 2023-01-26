import { describe, expect } from '@jest/globals';

import { Player } from '../Logic/PointsCounting/Player';
import { Point } from '../Logic/PointsCounting/Point';
import * as SUT from '../Logic/PointsCounting/PointsCounters';

const pointsToWinTiebreak : number = 7;

describe('TiebreakCounter', () => {
    it.each([
        [0, 1],
        [1, 0],
        [3, 2],
        [6, 5],
        [6, 6],
        [4, 0]])
        ("Handles adding %p pts for A and %p pts for B",
            (pointsA : number, pointsB : number) => {
                let counter = getCounterWithTiebreakScore(pointsA, pointsB);
                expect(counter.playerApts).toBe(pointsA);
                expect(counter.playerBpts).toBe(pointsB);
        });
    
    it('A wins 8 to 6', () => {
        let counter = getCounterWithTiebreakScore(6, 6);
        counter.handlePointWon(Player.PLAYER_A);
        expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);
        counter.handlePointWon(Player.PLAYER_A);
        expect(counter.whichPlayerWon()).toBe(Player.PLAYER_A);
    });

    it('B wins 9 to 7', () => {
        let counter = getCounterWithTiebreakScore(6, 6);
        counter.handlePointWon(Player.PLAYER_A);
        expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);
        counter.handlePointWon(Player.PLAYER_B);
        counter.handlePointWon(Player.PLAYER_B);
        counter.handlePointWon(Player.PLAYER_B);
        expect(counter.whichPlayerWon()).toBe(Player.PLAYER_B);
    });
});

describe('RegularGameCounter', () => {
    it.each([
        [Point.ZERO, Point.FIFTEEN],
        [Point.FIFTEEN, Point.ZERO],
        [Point.FORTY, Point.AD],
        [Point.THIRTY, Point.FORTY]])
        ("Handles adding %p pts for A and %p pts for B",
            (pointsA : Point, pointsB : Point) => {
                let counter = getCounterWithGameScore(pointsA, pointsB);
                expect(counter.playerApts).toBe(pointsA);
                expect(counter.playerBpts).toBe(pointsB);
    });

    it('40 - 0 then game won by A', () => {
        let counter = getCounterWithGameScore(Point.FORTY, Point.ZERO);
        counter.handlePointWon(Player.PLAYER_A);
        expect(counter.whichPlayerWon()).toBe(Player.PLAYER_A);
    });

    it('40 - 40 then game won by A', () => {
        let counter = getCounterWithGameScore(Point.FORTY, Point.FORTY);
        counter.handlePointWon(Player.PLAYER_A);
        counter.handlePointWon(Player.PLAYER_A);
        expect(counter.whichPlayerWon()).toBe(Player.PLAYER_A);
    });
    
    it('40 - 40 then A AD then 40 - 40', () => {
        let counter = getCounterWithGameScore(Point.FORTY, Point.FORTY);
        counter.handlePointWon(Player.PLAYER_A);
        expect(counter.playerApts).toBe(Point.AD);
        expect(counter.playerBpts).toBe(Point.FORTY);
        expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);

        counter.handlePointWon(Player.PLAYER_B);
        expect(counter.playerApts).toBe(Point.FORTY);
        expect(counter.playerBpts).toBe(Point.FORTY);
        expect(counter.whichPlayerWon()).toBe(Player.NO_PLAYER);
    });

});

function getCounterWithTiebreakScore(playerApts : number,
    playerBpts : number) : SUT.TiebreakCounter {

    let counter = new SUT.TiebreakCounter(pointsToWinTiebreak);
    for(let _ = 0; _ < playerApts; _++) {
        counter.handlePointWon(Player.PLAYER_A);
    }
    for(let _ = 0; _ < playerBpts; _++) {
        counter.handlePointWon(Player.PLAYER_B);
    }
    return counter;

}

function getCounterWithGameScore(playerApts : Point, playerBpts : Point)
    : SUT.RegularCounter {

    let counter = new SUT.RegularCounter();
    
    for(let _ = 0; _ < playerApts; _++) {
        counter.handlePointWon(Player.PLAYER_A);
    }
    for(let _ = 0; _ < playerBpts; _++) {
        counter.handlePointWon(Player.PLAYER_B);
    }
    expect(counter.playerApts).toBe(playerApts);
    expect(counter.playerBpts).toBe(playerBpts);
    return counter;

}
