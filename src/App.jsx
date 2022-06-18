import { useState, useEffect, useCallback, createContext } from 'react';
import ControlPanel from './components/ControlPanel';
import MazePrinter from './components/MazePrinter';
// import Controller from './components/MazePrinter/Controller';
import * as api from './api';
import './App.css';

export const MazeContext = createContext();

function App() {
  const [mazeId, setMazeId] = useState(null);
  const [mazeData, setMazeData] = useState(null);
  const [end, setEnd] = useState(false);

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  return (
    <MazeContext.Provider value={{ setEnd }}>
      <div className='App'>
        <ControlPanel
          mazeParam={mazeParam}
          setMazeParam={setMazeParam}
          setMazeData={setMazeData}
          mazeId={mazeId}
          setMazeId={setMazeId}
        />
        <MazePrinter mazeData={mazeData} />
        {/* <Controller mazeId={mazeId} setDirection={setDirection} /> */}
        {end && <div> success </div>}
      </div>
    </MazeContext.Provider>
  );
}

export default App;
