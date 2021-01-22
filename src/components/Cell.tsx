import React from 'react';
import { StyledCell } from './styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

interface CellProps {
  blocktype: string|number
};

const Cell = ({ blocktype }: CellProps) => (
  <StyledCell color={TETROMINOS[blocktype].color} />
);
export default Cell;