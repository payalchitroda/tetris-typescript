import React, { useState, KeyboardEvent } from 'react';
import Stage from './Stage';
import './styles.css';

import { createStage, checkCollision } from '../gameHelper';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus';
import { useInterval } from '../hooks/useInterval';


const Tetris = () => {
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [dropTime, setDropTime] = useState<number>(0);

  const [player, updatePlayerPos, resetPlayer, playerRotate]: Array<any> = usePlayer();
  const [stage, setStage, rowsCleared]: Array<any> = useStage(player, resetPlayer);
  const [score, setScore] = useGameStatus(rowsCleared);
  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, dir, 0)) {
      updatePlayerPos(dir, 0)
    }

  }
  const startGame = () => {
    setStage(createStage())
    setDropTime(1000);
    resetPlayer()
    setGameOver(false)

  }

  const dropPlayer = () => {

    if (!checkCollision(player, stage, 0, 1)) {
      updatePlayerPos(0, 1, false)
    }
    else {
      if (player.pos.y < 1) {
        setDropTime(0);
        setGameOver(true)

      }
      updatePlayerPos(0, 0, true)
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

  useInterval(() => {
    dropPlayer();
  }, dropTime);


  return (
    < div className="StyledTetris" role="button" tabIndex={0} onKeyDown={(e: KeyboardEvent) => move(e)}>
      <div className="header">TETRIS</div>

      <div className="left"> <Stage stage={stage} /></div>
      <div className="right">
        <button onClick={startGame}>Start</button>
        <br /> <br />
        Score: {score}
        <br />
        {gameOver ? "GAMEOVER😞" : ""}
      </div>
    </div>

  )
}
export default Tetris;