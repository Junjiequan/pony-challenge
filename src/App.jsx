import { useState, useEffect, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import MazePrinter from './components/MazePrinter';
// import Controller from './components/MazePrinter/Controller';
import * as api from './api';
import './App.css';

function App() {
  const [mazeId, setMazeId] = useState(null);
  const [mazeData, setMazeData] = useState(null);
  const [mazeParam, setMazeParam] = useState({
    'maze-width': 15,
    'maze-height': 15,
    'maze-player-name': 'Twilight Sparkle',
    difficulty: 1,
  });

  // console.log('----------mazzeId', mazeData);
  // const [direction, setDirection] = useState({
  //   direction: '',
  // });
  const onUpdateMazeData = async (data, move) => {
    console.log('--------------------data', data);
    const id = data?.data.maze_id;
    try {
      await api.makeMove(id, move);
      const newData = await api.getMazeCurrentState(id);
      setMazeData(newData);
    } catch (err) {}
  };

  const handleKeyPress = useCallback(
    (event) => {
      console.log('mazeData', mazeData);
      console.log('mazeId', mazeId);
      switch (event.key) {
        case 'w':
          // onMakeMove(mazeId, 'north');
          onUpdateMazeData(mazeData, 'north');
          break;
        case 's':
          // onMakeMove(mazeId, 'south');
          onUpdateMazeData(mazeData, 'south');
          break;
        case 'a':
          // onMakeMove(mazeId, 'west');
          onUpdateMazeData(mazeData, 'west');
          break;
        case 'd':
          // onMakeMove(mazeId, 'east');
          onUpdateMazeData(mazeData, 'east');
          break;
        default:
          console.log('mazeId', mazeData);
      }
    },
    [mazeId]
  );
  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyPress(e));

    return document.removeEventListener('keydown', (e) => handleKeyPress(e));
  }, [handleKeyPress]);

  return (
    <div className='App'>
      <ControlPanel
        mazeParam={mazeParam}
        setMazeParam={setMazeParam}
        setMazeData={setMazeData}
        // mazeId={mazeId}
        setMazeId={setMazeId}
      />
      <MazePrinter mazeData={mazeData} />
      {/* <Controller mazeId={mazeId} setDirection={setDirection} /> */}
    </div>
  );
}

export default App;
