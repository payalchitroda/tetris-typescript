import { useState, useEffect } from 'react';

export const useGameStatus = (rowsCleared:number) => {
  const [score, setScore] = useState<number>(0);
  

  useEffect(() => {
    setScore(prev => prev + rowsCleared);
  }, [rowsCleared]);

  return [score, setScore];
};
