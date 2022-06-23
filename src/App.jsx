import { useState, useEffect, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import MazePrinter from './components/MazePrinter';
import * as api from './api';
import './App.css';

function App() {
  const [end, setEnd] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoMovePath, setAutoMovePath] = useState([]);
  const [mazeId, setMazeId] = useState(null);
  const [mazeData, setMazeData] = useState(null);
  const [maze, setMaze] = useState([]);
  const [mazeParam, setMazeParam] = useState({
    'maze-width': 15,
    'maze-height': 15,
    'maze-player-name': 'Twilight Sparkle',
    difficulty: 0,
  });

  const KEY = {
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
          onUpdateMazeData(mazeData, KEY.w);
          break;
        case 's':
          onUpdateMazeData(mazeData, KEY.s);
          break;
        case 'a':
          onUpdateMazeData(mazeData, KEY.a);
          break;
        case 'd':
          onUpdateMazeData(mazeData, KEY.d);
          break;
      }
    },
    [mazeId]
  );

  // Auto
  useEffect(() => {
    if (!auto || !maze) return;
    (async () => {
      for (const move in autoMovePath) {
        await new Promise((r) => setTimeout(r, 500));
        onUpdateMazeData(mazeData, autoMovePath[move]);
      }
    })();
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
        setAutoMovePath={setAutoMovePath}
      />
      <MazePrinter
        mazeData={mazeData}
        setEnd={setEnd}
        setAutoMovePath={setAutoMovePath}
        maze={maze}
        setAuto={setAuto}
        auto={auto}
      />
      <div> Press W A S D key to control pony</div>
      {end && (
        <div className='notification'>
          <b>{end}</b>
        </div>
      )}
      <img
        width={200}
        src={
          'https://thumbs.dreamstime.com/z/compass-north-south-east-west-vector-compass-north-south-east-west-107153191.jpg'
        }
      />
    </div>
  );
}

export default App;
