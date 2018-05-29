import axios from 'axios';

const API = 'https://swapi.co/api';

export const list = page => axios.get(`${API}/people/?page=${page}`);
