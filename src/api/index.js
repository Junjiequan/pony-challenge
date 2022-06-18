import axios from 'axios';

const requestUrl = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';
// const config = {
//   headers: { 'Content-Type': 'application/json' },
// };

export const createMazeId = (param) => axios.post(requestUrl, param);
export const getMazeCurrentState = (id) => axios.get(`${requestUrl}/${id}`);
export const makeMove = (id, move) => axios.post(`${requestUrl}/${id}`, { direction: move });
