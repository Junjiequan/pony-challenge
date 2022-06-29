import { DIRECTIONS, OPPOSITE } from '../Constants';
import { onUpdateMazeData } from '../action';

const isWall = {
  north: (index, maze) => {
    if (index - maze.height < maze.height || maze.path[index].includes('north')) {
      return true;
    }
  },
  south: (index, maze) => {
    if (!maze.path[index + maze.height]) return true;
    if (index + maze.width > maze.width * maze.height || maze.path[index + maze.height].includes('north')) {
      return true;
    }
  },
  east: (index, maze) => {
    const eastWall = (number) => (!((number + 1) % maze.width) ? 'east' : '');

    if (!!eastWall(index) || maze.path[index + 1].includes('west')) {
      return true;
    }
  },
  west: (index, maze) => {
    if (maze.path[index].includes('west')) {
      return true;
    }
  },
};
const getNextPosition = (index, move, width) => {
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
const availableDirections = (index, maze) => {
  let available = new Set(DIRECTIONS);
  if (isWall.north(index, maze)) {
    available.delete('north');
  }
  if (isWall.south(index, maze)) {
    available.delete('south');
  }
  if (isWall.east(index, maze)) {
    available.delete('east');
  }
  if (isWall.west(index, maze)) {
    available.delete('west');
  }
  return Array.from(available);
};

let timer;

export const solveMaze = (start, move, path, exit, directions, maze, setMaze) => {
  const getAvailableDirections = availableDirections(start, maze);
  let run = maze.auto;
  if (start === exit) {
    if ((maze.gameState.state === 'Active' || maze.gameState.state === 'active') && run) {
      directions.map((move, i) => {
        timer = setTimeout(() => onUpdateMazeData(setMaze, maze, move), 500 * i);
      });
    } else {
      window.clearTimeout(timer);
    }
  }

  for (const i in getAvailableDirections) {
    if (move === 'start' || getAvailableDirections[i] !== OPPOSITE[move]) {
      const newPosition = getNextPosition(start, getAvailableDirections[i], maze.width);

      if (!path.includes(newPosition)) {
        const newPath = [...path];
        const newDirections = [...directions];
        newPath.push(newPosition);
        newDirections.push(getAvailableDirections[i]);
        solveMaze(newPosition, getAvailableDirections[i], newPath, exit, newDirections, maze, setMaze);
      }
    }
  }
};
