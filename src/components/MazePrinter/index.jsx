import { useContext } from 'react';
import { MazeContext } from '../../App';
import MazeMap from './MazeMap';
import './MazePrinter.css';

const MazePrinter = (props) => {
  const { mazeData } = props;
  const { setEnd } = useContext(MazeContext);

  const width = mazeData?.data['size'][0];
  const height = mazeData?.data['size'][1];
  const pony = mazeData?.data['pony'];
  const domokun = mazeData?.data['domokun'];
  const exit = mazeData?.data['end-point'];
  const eastBorder = (number) => (number % width ? '' : 'east');
  const southBorder = (number) => (number >= (height - 1) * width ? 'south' : '');
  const gridStyle = {
    gridTemplateColumns: `repeat(${width}, 3vmin)`,
    gridTemplateRows: `repeat(${height}, 3vmin)`,
  };

  if (!mazeData) return;
  if (domokun[0] === pony[0]) setEnd('Domokun caught pony');
  if (pony[0] === exit[0]) setEnd('Pony escaped');
  return (
    <div className='MazeContainer' style={gridStyle}>
      {mazeData?.data.data.map((d, index) => {
        const directions = d.map((d) => d).join(' ');
        return (
          <MazeMap
            key={index}
            className={`${directions} block ${eastBorder(index + 1)} ${southBorder(index)}`}
            location={index}
            pony={pony[0]}
            domokun={domokun[0]}
            exit={exit[0]}
          />
        );
      })}
    </div>
  );
};

export default MazePrinter;
