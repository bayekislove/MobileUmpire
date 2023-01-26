import { expect } from '@jest/globals';

import getOppositePlayer, { Player } from '../Logic/PointsCounting/Player';

import SetsCounter from '../Logic/PointsCounting/SetsCounter';
import ServeCounter from '../Logic/ServeCounter';

const MAX_SETS = 3;

it.each([[1], [2], [4], [5], [6], [7], [8]])
    ("After adding %p gems",
        (gems : number) => {
            let counter = new ServeCounter();
            let resultCounter = new SetsCounter(MAX_SETS);
            let expectedPlayer = Player.PLAYER_A;

            for(let gem = 0; gem < gems; gem++){
                for(let _ = 0; _ < 3; _++) {
                    resultCounter.handlePointWon(expectedPlayer);
                    expect(counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                        resultCounter.playerBScore)).toBe(expectedPlayer);
                };
                resultCounter.handlePointWon(expectedPlayer);
                expectedPlayer = getOppositePlayer(expectedPlayer);
                expect(counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                    resultCounter.playerBScore)).toBe(expectedPlayer);
            }
    });

it.each([[0, Player.PLAYER_A], [1, Player.PLAYER_B], [2, Player.PLAYER_B],
    [3, Player.PLAYER_A], [4, Player.PLAYER_A], [5, Player.PLAYER_B], [6, Player.PLAYER_B],
    [7, Player.PLAYER_A], [8, Player.PLAYER_A], [9, Player.PLAYER_B]])
    ("After adding %p tiebreak pts player %p should serve",
        (tiebreakPts : number, player : Player) => {
            let counter = new ServeCounter();
            let resultCounter = new SetsCounter(MAX_SETS);

            for(let gems = 0; gems < 5; gems++) {
                for(let pts = 0; pts < 4; pts++) {
                    resultCounter.handlePointWon(Player.PLAYER_A);
                    counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                        resultCounter.playerBScore);
                }
            };
            for(let gems = 0; gems < 5; gems++) {
                for(let pts = 0; pts < 4; pts++) {
                    resultCounter.handlePointWon(Player.PLAYER_B);
                    counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                        resultCounter.playerBScore);
                }
            };

            for(let pts = 0; pts < 4; pts++) {
                resultCounter.handlePointWon(Player.PLAYER_A);
                counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                    resultCounter.playerBScore);
            };
            for(let pts = 0; pts < 3; pts++) {
                resultCounter.handlePointWon(Player.PLAYER_B);
                counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                    resultCounter.playerBScore);
            };

            let pointWinner = Player.PLAYER_B;
            for(let pts = 0; pts < tiebreakPts; pts++) {
                resultCounter.handlePointWon(pointWinner);
                counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                    resultCounter.playerBScore);
                if(pts % 2 == 1) {
                    pointWinner = getOppositePlayer(pointWinner);
                }
            }
            resultCounter.handlePointWon(pointWinner);
            expect(counter.getServingPlayerAfterPointWon(resultCounter.playerAScore,
                resultCounter.playerBScore)).toBe(player);
        }
    );