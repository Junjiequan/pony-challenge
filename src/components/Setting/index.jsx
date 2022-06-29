import React from 'react';
import { createMaze } from '../../action';
import './setting.css';

const Setting = (props) => {
  const { maze, setMaze, param, setParam } = props;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    createMaze(param, setMaze, maze);
  };

  const handleOnChange = (e) => {
    const type = e.target.name;
    const value = Number(e.target.value);
    const isValidSize = value <= 99;
    const isValidLevel = value <= 9 && value >= 0;

    if (type === 'width') isValidSize && setParam({ ...param, width: value });
    if (type === 'height') isValidSize && setParam({ ...param, height: value });
    if (type === 'difficulty') isValidLevel && setParam({ ...param, difficulty: value });
  };
  return (
    <form className='controller' onSubmit={handleOnSubmit}>
      <label htmlFor='width'>width </label>
      <input type='number' min='15' max='25' name='width' value={param.width} onChange={handleOnChange} />
      &nbsp;
      <label htmlFor='height'>height </label>
      <input type='number' min='15' max='25' name='height' value={param.height} onChange={handleOnChange} />
      &nbsp;
      <label htmlFor='difficulty'>difficulty </label>
      <input type='number' min='0' max='9' name='difficulty' value={param.difficulty} onChange={handleOnChange} />
      &nbsp; &nbsp;
      <button type='submit'>start</button>
      &nbsp;
      <button
        type='button'
        onClick={() =>
          maze.auto
            ? null
            : setMaze((prev) => {
                return { ...prev, auto: !prev.auto };
              })
        }
      >
        auto
      </button>
    </form>
  );
};

export default Setting;
