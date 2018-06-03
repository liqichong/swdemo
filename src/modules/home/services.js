import axios from 'axios';
import { cachify } from '../../utils';

const API = 'https://swapi.co/api';

export const list = cachify(page => axios.get(`${API}/people/?page=${page}`));
