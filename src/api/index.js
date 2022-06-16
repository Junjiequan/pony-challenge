import axios from 'axios';

const requestUrl = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';
// const config = {
//   headers: { 'Content-Type': 'application/json' },
// };

export const createMazeId = (args) => axios.post(requestUrl, args);
export const getMaze = (id) => axios.get(requestUrl + '/' + id);
