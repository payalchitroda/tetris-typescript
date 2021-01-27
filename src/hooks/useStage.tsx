import { useState, useEffect } from 'react'
import { createStage } from '../gameHelper';
interface Point {
x: number
y: number
}

interface Player {
pos: Point
tetromino: (string | number)[][],
collided: boolean,
}
type Stage=Array<Array<Array<string | number>>>
type Function = () => void;
export const useStage = (player:Player,resetPlayer:Function)=> {
    const [stage, setStage] = useState<Stage>(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = (newStage:Stage) =>
        newStage.reduce((ack:Stage, row) => {
         
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            setRowsCleared(prev => prev + 1);
            ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
            return ack;
          }
          ack.push(row);
          return ack;
        }, [])


        const updateStage = (prevStage:Stage) => {

            const newStage = prevStage.map(row =>
                row.map(cell =>(cell[1] === 'clear' ? [0, 'clear'] : cell)));

                for(var i=0;i<player.tetromino.length;i++)
                {
                    for(var j=0;j<player.tetromino[0].length;j++)
                    {
                        if(player.tetromino[i][j]!==0)
                        {
                            newStage[i+player.pos.y][j+player.pos.x]=[
                                player.tetromino[i][j],
                                `${player.collided?'merged':'clear' }`
                            ]
                        }
                    }
                }

                if(player.collided)
                {
                    resetPlayer();
                    return sweepRows(newStage);
                }

                return newStage;

        }
        setStage(prev => updateStage(prev))
    }, [player])
   
     return [stage, setStage,rowsCleared] as const;

}