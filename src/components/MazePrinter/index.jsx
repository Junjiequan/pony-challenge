import React from 'react';
import './MazePrinter.css';

const MazePath = (props) => {
  const { className, location, pony, domokun, exit } = props;

  return (
    <div className={className + ` center ${location}`}>
      {location === pony ? 'p' : location === domokun ? 'd' : location === exit ? 'e' : ''}
    </div>
  );
};

const MazePrinter = (props) => {
  const { mazeData } = props;

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
  return (
    <div className='MazeContainer' style={gridStyle}>
      {mazeData.data.data.map((d, index) => {
        const directions = d.map((d) => d).join(' ');
        return (
          <MazePath
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
