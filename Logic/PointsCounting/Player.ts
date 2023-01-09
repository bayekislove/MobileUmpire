export const enum Player {
    NO_PLAYER, PLAYER_A, PLAYER_B
}

export default function getOppositePlayer(player : Player) {
    if(player == Player.PLAYER_A) {
        return Player.PLAYER_B;
    } else if(player == Player.PLAYER_B) {
        return Player.PLAYER_A;
    }
    return Player.NO_PLAYER;
}