import * as api from '../../api';

const ControlPanel = (props) => {
  const { mazeParam, setMazeParam, setMazeData, setMazeId, setEnd, setAuto, auto, setAutoMovePath, setMaze } = props;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auto) return;
      const resp = await api.createMazeId(mazeParam);
      const data = await api.getMazeCurrentState(resp.data.maze_id);
      setMazeId(resp.data.maze_id);
      setMazeData(data);
      setMaze(data.data.data);
      setAuto(false);
      setAutoMovePath([]);
      setEnd(false);
    } catch (err) {}
  };

  const handleClick = () => {
    if (auto) return console.log('no');
    setAuto(true);
  };

  const handleOnChange = (e) => {
    const type = e.target.name;
    const value = Number(e.target.value);
    const isValidSize = value <= 99;
    const isValidLevel = value <= 9 && value >= 0;

    if (type === 'width') isValidSize && setMazeParam({ ...mazeParam, 'maze-width': value });
    if (type === 'height') isValidSize && setMazeParam({ ...mazeParam, 'maze-height': value });
    if (type === 'difficulty') isValidLevel && setMazeParam({ ...mazeParam, difficulty: value });
  };
  return (
    <form className='controller' onSubmit={handleOnSubmit}>
      <label htmlFor='width'>width </label>
      <input type='number' min='15' max='25' name='width' value={mazeParam['maze-width']} onChange={handleOnChange} />
      &nbsp;
      <label htmlFor='height'>height </label>
      <input type='number' min='15' max='25' name='height' value={mazeParam['maze-height']} onChange={handleOnChange} />
      &nbsp;
      <label htmlFor='difficulty'>difficulty </label>
      <input
        type='number'
        min='0'
        max='9'
        name='difficulty'
        value={mazeParam['difficulty']}
        onChange={handleOnChange}
      />
      &nbsp; &nbsp;
      <button type='submit'>start</button>
      &nbsp;
      <button type='button' onClick={handleClick}>
        auto
      </button>
    </form>
  );
};

export default ControlPanel;
