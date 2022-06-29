import * as api from '../api';
import { solveMaze } from '../util/auto';

export const createMaze = async (param, setMaze, maze) => {
  try {
    const resp = await api.createMazeId({
      'maze-width': param.width,
      'maze-height': param.height,
      'maze-player-name': param.ponyName,
      difficulty: param.difficulty,
    });
    const data = await api.getMazeCurrentState(resp.data.maze_id);
    setMaze({
      ...maze,
      width: data.data.size[0],
      height: data.data.size[1],
      auto: false,
      id: resp.data.maze_id,
      path: data.data.data,
      pony: data.data.pony[0],
      domokun: data.data.domokun[0],
      endPoint: data.data['end-point'][0],
      gameState: data.data['game-state'],
    });
  } catch (err) {
    console.log(err);
  }
};

export const onUpdateMazeData = async (setMaze, maze, move) => {
  try {
    await api.makeMove(maze.id, move);
    const newData = await api.getMazeCurrentState(maze.id);
    setMaze({
      ...maze,
      path: newData.data.data,
      pony: newData.data.pony[0],
      domokun: newData.data.domokun[0],
      endPoint: newData.data['end-point'][0],
      gameState: newData.data['game-state'],
    });
    // solveMaze(newData.data.pony[0], 'start', newData.data.data, newData.data['end-point'][0], [], maze, setMaze);
  } catch (err) {
    console.log('err', err);
  }
};
