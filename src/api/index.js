import axios from 'axios';
import { REQUEST_URL } from '../Constants';
// const config = {
//   headers: { 'Content-Type': 'application/json' },
// };

export const createMazeId = (param) => axios.post(REQUEST_URL, param);
export const getMazeCurrentState = (id) => axios.get(`${REQUEST_URL}/${id}`);
export const makeMove = (id, move) => axios.post(`${REQUEST_URL}/${id}`, { direction: move });
