import React from 'react';
import { StyledStage } from './styles/StyledStage'
import Cell from './Cell';
interface StageProps {
    stage: Array<Array<Array<string | number>>>
  };

const Stage = ( {stage}:StageProps) => (
    <StyledStage>
        {stage.map(row => row.map((cell) => <Cell blocktype={cell[0]} />))}
    </StyledStage>
);
export default Stage;