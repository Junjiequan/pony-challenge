import { useEffect } from 'react';
import MazePath from './MazePath';
import './MazePrinter.css';

const MazePrinter = (props) => {
  const { mazeData, setEnd, maze, setAutoMovePath } = props;
  const width = mazeData?.data['size'][0];
  const height = mazeData?.data['size'][1];
  const pony = mazeData?.data['pony'][0];
  const domokun = mazeData?.data['domokun'][0];
  const exit = mazeData?.data['end-point'][0];

  const eastWall = (number) => (!((number + 1) % width) ? 'east' : '');
  const southWall = (number) => (number >= (height - 1) * width ? 'south' : '');
  const walls = maze.map((d, index) => {
    const direction = [...d, eastWall(index), southWall(index)].map((d) => d).join(' ');
    return direction;
  });

  const gridStyle = {
    gridTemplateColumns: `repeat(${width}, 3vmin)`,
    gridTemplateRows: `repeat(${height}, 3vmin)`,
  };

  const solveMaze = () => {};

  if (!mazeData) return;
  if (domokun === pony) setEnd('Domokun caught pony');
  if (pony === exit) setEnd('Pony escaped');

  return (
    <div className='MazeContainer' style={gridStyle}>
      {walls.map((wall, index) => {
        const mark = index === pony ? 'mark' : '';

        return (
          <MazePath
            key={index}
            className={`${wall} block ${mark} `}
            location={index}
            pony={pony}
            domokun={domokun}
            exit={exit}
          />
        );
      })}
    </div>
  );
};

export default MazePrinter;
