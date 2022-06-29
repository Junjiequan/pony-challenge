import { useEffect, useCallback } from 'react';
import { onUpdateMazeData } from '../../action';
import { KEY } from '../../Constants';

const Control = (props) => {
  const { maze, setMaze } = props;
  // const stopAuto = () => setMaze({ ...maze, auto: false });
  const handleKeyPress = useCallback(
    (event) => {
      if (!maze.auto)
        switch (event.key) {
          case 'w':
            // stopAuto();
            onUpdateMazeData(setMaze, maze, KEY.w);
            break;
          case 's':
            // stopAuto();
            onUpdateMazeData(setMaze, maze, KEY.s);
            break;
          case 'a':
            // stopAuto();
            onUpdateMazeData(setMaze, maze, KEY.a);
            break;
          case 'd':
            // stopAuto();
            onUpdateMazeData(setMaze, maze, KEY.d);
            break;
        }
    },
    [maze.path, maze.auto]
  );
  useEffect(() => {
    if (!maze.auto) {
      document.addEventListener('keydown', handleKeyPress);
    }
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return <div>Press W A S D key to move pony</div>;
};

export default Control;
