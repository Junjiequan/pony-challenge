import * as api from '../../api';

const ControlPanel = (props) => {
  const { mazeParam, setMazeParam, setMazeData, setMazeId } = props;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.createMazeId(mazeParam);
      setMazeId(resp.data.maze_id);

      const data = await api.getMazeCurrentState(resp.data.maze_id);

      console.log(resp);
      setMazeData(data);
    } catch (err) {
      console.log(`Err:${err}`);
    }
  };

  const handleOnChange = (e) => {
    const type = e.target.name;
    const value = Number(e.target.value);
    const isValidSize = value <= 99;
    const isValidLevel = value <= 9 && value >= 1;

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
        min='1'
        max='9'
        name='difficulty'
        value={mazeParam['difficulty']}
        onChange={handleOnChange}
      />
      &nbsp; &nbsp;
      <button type='submit'>start</button>
    </form>
  );
};

export default ControlPanel;
