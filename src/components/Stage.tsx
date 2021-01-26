import React from 'react';
import './styles.css';

import Cell from './Cell';
interface StageProps {
    stage: Array<Array<Array<string | number>>>
  };

const Stage = ( {stage}:StageProps) => (
    <div className= "StyledStage">
        {stage.map(row => row.map((cell) => <Cell blocktype={cell[0]} />))}
    </div>
);
export default Stage;