import React from 'react';
import MazePrinter from './mazePrinter';
import { BASE_URL } from '../../Constants';

import './maze.css';

const Maze = (props) => {
  const { maze } = props;
  const gridStyle = {
    gridTemplateColumns: `repeat(${maze.width}, 3vmin)`,
    gridTemplateRows: `repeat(${maze.height}, 3vmin)`,
  };

  const eastWall = (number) => (!((number + 1) % maze.width) ? 'east' : '');
  const southWall = (number) => (number >= (maze.height - 1) * maze.width ? 'south' : '');

  const mazePath = maze.path.map((d, index) => {
    const direction = [...d, eastWall(index), southWall(index)].map((d) => d).join(' ');
    return direction;
  });
  if (maze.gameState && (maze.gameState.state === 'over' || maze.gameState.state === 'won')) {
    return <img width='640' src={BASE_URL + maze.gameState['hidden-url']} />;
  }

  return (
    <div className='MazeContainer' style={gridStyle}>
      {mazePath.map((path, index) => {
        const mark = index === maze.pony ? 'mark' : '';
        return (
          <MazePrinter
            key={index}
            className={`${path} block ${mark} `}
            location={index}
            pony={maze.pony}
            domokun={maze.domokun}
            exit={maze.endPoint}
          />
        );
      })}
    </div>
  );
};

export default Maze;
