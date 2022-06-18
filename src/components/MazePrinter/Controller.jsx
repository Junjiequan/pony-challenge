import { useEffect, useCallback } from 'react';

import * as api from '../../api';

const Controller = (props) => {
  const { setDirection, mazeId } = props;
  const handleKeyPress = (event) => {
    // console.log(`Key pressed: ${event.key}`);

    switch (event.key) {
      case 'w':
        setDirection({ direction: 'north' });
        api.makeMove(mazeId, { direction: 'north' });
        break;
      case 's':
        setDirection({ direction: 'south' });
        api.makeMove(mazeId, { direction: 'south' });
        break;
      case 'a':
        setDirection({ direction: 'west' });
        api.makeMove(mazeId, { direction: 'west' });
        break;
      case 'd':
        setDirection({ direction: 'east' });
        api.makeMove(mazeId, { direction: 'east' });
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyPress(e));
    return document.removeEventListener('keydown', (e) => handleKeyPress(e));
  }, []);
  return;
};

export default Controller;
