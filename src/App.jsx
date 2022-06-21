import { useState, useEffect, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import MazePrinter from './components/MazePrinter';
import * as api from './api';
import './App.css';

function App() {
  const [end, setEnd] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoMovePath, setAutoMovePath] = useState([
    'east',
    'south',
    'west',
    'east',
    'south',
    'west',
    'east',
    'south',
    'west',
  ]);
  const [mazeId, setMazeId] = useState(null);
  const [mazeData, setMazeData] = useState(null);
  const [maze, setMaze] = useState([]);
  const [mazeParam, setMazeParam] = useState({
    'maze-width': 15,
    'maze-height': 15,
    'maze-player-name': 'Twilight Sparkle',
    difficulty: 0,
  });
  const key = {
    w: 'north',
    s: 'south',
    a: 'west',
    d: 'east',
  };

  const onUpdateMazeData = async (data, move) => {
    const id = data?.data.maze_id;
    try {
      const resp = await api.makeMove(id, move);
      if (resp.status === 200) {
        const newData = await api.getMazeCurrentState(id);
        setMazeData(newData);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      switch (event.key) {
        case 'w':
          onUpdateMazeData(mazeData, key.w);
          break;
        case 's':
          onUpdateMazeData(mazeData, key.s);
          break;
        case 'a':
          onUpdateMazeData(mazeData, key.a);
          break;
        case 'd':
          onUpdateMazeData(mazeData, key.d);
          break;
      }
    },
    [mazeId]
  );

  //Auto
  useEffect(() => {
    if (!auto || !maze) return;
    for (const move in autoMovePath) {
      setTimeout(() => onUpdateMazeData(mazeData, autoMovePath[move]), 1000 * move);
    }
  }, [auto]);

  //Manual
  useEffect(() => {
    if (auto || !!end) return;
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, end, auto]);

  return (
    <div className='App'>
      <ControlPanel
        setMazeData={setMazeData}
        mazeParam={mazeParam}
        setMazeParam={setMazeParam}
        mazeId={mazeId}
        setMazeId={setMazeId}
        setEnd={setEnd}
        auto={auto}
        setAuto={setAuto}
        setMaze={setMaze}
      />
      <MazePrinter mazeData={mazeData} setEnd={setEnd} setAutoMovePath={setAutoMovePath} maze={maze} />
      <div> Press W A S D key to control pony</div>
      {end && (
        <div className='notification'>
          <b>{end}</b>
        </div>
      )}
    </div>
  );
}

export default App;
