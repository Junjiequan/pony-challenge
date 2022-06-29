import { useState } from 'react';
import Maze from './components/Maze';
import Setting from './components/Setting';
import Control from './components/Control';
import { solveMaze } from './util/auto';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [param, setParam] = useState({
    ponyName: 'Twilight Sparkle',
    width: 15,
    height: 15,
    difficulty: 1,
  });
  const [maze, setMaze] = useState({
    width: null,
    height: null,
    auto: false,
    autoPath: [],
    id: null,
    path: [],
    pony: null,
    domokun: null,
    endPoint: null,
    gameState: null,
  });

  useEffect(() => {
    if (maze.id) solveMaze(maze.pony, 'start', maze.path, maze.endPoint, [], maze, setMaze);
  }, [maze.id, maze.auto]);

  return (
    <div className='App'>
      <Setting maze={maze} setMaze={setMaze} param={param} setParam={setParam} />
      <Maze maze={maze} setMaze={setMaze} param={param} setParam={setParam} />
      <Control maze={maze} setMaze={setMaze} />
    </div>
  );
}

export default App;
