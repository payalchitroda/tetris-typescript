import React, { useState,KeyboardEvent } from 'react';
import Stage from './Stage';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage, checkCollision } from '../gameHelper';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
    const [gameOver, setGameOver] = useState<boolean>(false)

    const [player, updatePlayerPos, resetPlayer,playerRotate]:Array<any> = usePlayer();
    const [stage, setStage, rowsCleared]:Array<any> = useStage(player, resetPlayer);
    const [score, setScore] = useGameStatus(rowsCleared);
    const movePlayer = (dir:number) => {
        if (!checkCollision(player, stage, dir,0)) {
            updatePlayerPos( dir,0 )
        }

    }
    const startGame = () => {
        setStage(createStage())
        resetPlayer()
        setGameOver(false)

    }

    const dropPlayer = () => {

        if (!checkCollision(player, stage, 0, 1 )) {
            updatePlayerPos( 0, 1, false )
        }
        else {
            if (player.pos.y < 1) {
                setGameOver(true)
                
            }
            updatePlayerPos(0,0,true )
        }



    }

      const move = (e: KeyboardEvent) => {
        if (!gameOver) {
    
          if (e.keyCode === 37)
            movePlayer(-1);
          else if (e.keyCode === 39)
            movePlayer(1);
          else if (e.keyCode === 40)
            dropPlayer();
          else if (e.keyCode === 38) {
            playerRotate(stage);
          }
    
    
        }
      }    

    return (
      <StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={(e: KeyboardEvent) => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                &nbsp;&nbsp; <button onClick={startGame}>Start</button>
                <br />
                &nbsp;&nbsp;Score: {score}
                <br />
                &nbsp;&nbsp;{gameOver ? "GAMEOVER" : ""}

            </StyledTetris>
        </StyledTetrisWrapper>

    )
}
export default Tetris;