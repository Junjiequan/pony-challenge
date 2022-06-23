import { useEffect } from 'react';
import MazePath from './MazePath';
import './MazePrinter.css';

const MazePrinter = (props) => {
  const { mazeData, setEnd, maze, setAuto, auto, setAutoMovePath } = props;
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

  const DIRECTIONS = ['north', 'south', 'west', 'east'];

  const isWall = {
    north: (position) => {
      if (position - height < height || maze[position].includes('north')) {
        return true;
      }
    },
    south: (position) => {
      if (!maze[position + height]) return true;
      if (position + width > width * height || maze[position + height].includes('north')) {
        return true;
      }
    },
    east: (position) => {
      if (!!eastWall(position) || maze[position + 1].includes('west')) {
        return true;
      }
    },
    west: (position) => {
      if (maze[position].includes('west')) {
        return true;
      }
    },
  };

  const OPPOSITE = {
    south: 'north',
    north: 'south',
    east: 'west',
    west: 'east',
  };

  const getNextPosition = (index, move) => {
    switch (move) {
      case 'north':
        return index - width;
      case 'south':
        return index + width;
      case 'west':
        return index - 1;
      case 'east':
        return index + 1;
      default:
        return index;
    }
  };

  const availableDirections = (position) => {
    let available = new Set(DIRECTIONS);
    if (isWall.north(position)) {
      available.delete('north');
    }
    if (isWall.south(position)) {
      available.delete('south');
    }
    if (isWall.east(position)) {
      available.delete('east');
    }
    if (isWall.west(position)) {
      available.delete('west');
    }
    return Array.from(available);
  };

  const solveMaze = (start, move, path, exit, directions) => {
    const getAvailableDirections = availableDirections(start);
    if (start === exit) {
      setAutoMovePath(directions);
    }

    for (const i in getAvailableDirections) {
      if (move === undefined || getAvailableDirections[i] !== OPPOSITE[move]) {
        const newPosition = getNextPosition(start, getAvailableDirections[i]);

        if (!path.includes(newPosition)) {
          const newPath = [...path];
          const newDirections = [...directions];
          newPath.push(newPosition);
          newDirections.push(getAvailableDirections[i]);
          solveMaze(newPosition, getAvailableDirections[i], newPath, exit, newDirections);
        }
      }
    }
  };

  useEffect(() => {
    if (!mazeData && !auto) return;
    solveMaze(pony, undefined, [pony], exit, []);
  }, [mazeData]);

  if (mazeData && pony === domokun) {
    setEnd('Domokun caught pony');
    setAuto(false);
  } else if (mazeData && pony === exit) {
    setEnd('Pony escaped');
    setAuto(false);
  }

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
