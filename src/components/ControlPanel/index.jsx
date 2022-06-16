import * as api from '../../api';

const ControlPanel = (props) => {
  const { mazeParam, setMazeParam, setMazeData } = props;
  const handleOnSubmit = async (e) => {
    console.log('submmitee?');
    e.preventDefault();
    try {
      const resp = await api.createMazeId(mazeParam);
      const data = await api.getMaze(resp.data.maze_id);
      setMazeData(data);
    } catch (err) {
      console.log(`Err:${err}`);
    }
  };
  const handleOnChange = (e) => {
    const type = e.target.name;
    const value = Number(e.target.value);
    const isValidSize = value <= 25 && value >= 15;
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
      &nbsp;
      <button type='submit'>Start</button>
    </form>
  );
};

export default ControlPanel;
