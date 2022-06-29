const MazePrinter = (props) => {
  const { className, location, pony, domokun, exit } = props;

  return (
    <div className={className + `center ${location} text-small`}>
      {location === pony ? (
        <span className='pony'> P </span>
      ) : location === domokun ? (
        <span className='domokun'> D </span>
      ) : location === exit ? (
        <span className='exit'> E </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default MazePrinter;
