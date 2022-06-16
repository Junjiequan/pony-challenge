import { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import MazePrinter from './components/MazePrinter';
import './App.css';

function App() {
  const [mazeParam, setMazeParam] = useState({
    'maze-width': 15,
    'maze-height': 15,
    'maze-player-name': 'Twilight Sparkle',
    difficulty: 1,
  });

  const [mazeData, setMazeData] = useState(null);

  return (
    <div className='App'>
      <ControlPanel mazeParam={mazeParam} setMazeParam={setMazeParam} setMazeData={setMazeData} />
      <MazePrinter mazeData={mazeData} />
    </div>
  );
}

export default App;
