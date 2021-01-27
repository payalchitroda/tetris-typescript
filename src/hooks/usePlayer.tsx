import { useState } from 'react'
import { TETROMINOS, randomTetromino } from '../tetrominos'
import { STAGE_WIDTH } from '../gameHelper'
import { checkCollision } from '../gameHelper';


type Tetromino = Array<Array<string | number>>
type Stage=Array<Array<Array<string | number>>>

interface Point {
    x: number
    y: number
}

interface Player {
    pos: Point
    tetromino: Tetromino
    collided: boolean,
}

export const usePlayer = ()=> {
    const [player, setPlayer] = useState<Player>({
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


    const rotate = (matrix: Tetromino) => {
        const mtrx = matrix.map((_, index) => matrix.map(column => {
            // console.log(column[index])
            return column[index]
        }));
        return mtrx.map(row => row.reverse());

    }

    const playerRotate = (stage: Stage) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

        // console.log(clonedPlayer.pos.x)
        while (checkCollision(clonedPlayer, stage, 0, 0)) {
            if (clonedPlayer.pos.x < 0)
                clonedPlayer.pos.x++
            else if (clonedPlayer.pos.x >= 9)
                clonedPlayer.pos.x--
            else
                return

        }

        setPlayer(clonedPlayer);
    }

    return [player, updatePlayerPos, resetPlayer, playerRotate] as const;


}