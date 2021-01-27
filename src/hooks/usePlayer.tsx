import { useState } from 'react'
import { TETROMINOS, randomTetromino } from '../tetrominos'
import { STAGE_WIDTH } from '../gameHelper'
import { checkCollision } from '../gameHelper';



interface point {
    x: number
    y: number
}

interface IPlayer {
    pos: point
    tetromino: (string | number)[][],
    collided: boolean,
}

export const usePlayer = () => {
    const [player, setPlayer] = useState<IPlayer>({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePlayerPos = (x: number, y: number, collided: boolean) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }))

    }

    const resetPlayer = () => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }


    const rotate = (matrix: Array<Array<string | number>>) => {
        const mtrx = matrix.map((_, index) => matrix.map(column => {
            console.log(column[index])
            return column[index]
        }));
        return mtrx.map(row => row.reverse());

    }

    const playerRotate = (stage: Array<Array<Array<string | number>>>) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

        if (checkCollision(clonedPlayer, stage, 0, 0))
            return;
        setPlayer(clonedPlayer);
    }

    return [player, updatePlayerPos, resetPlayer, playerRotate];


}