import axios from 'axios';
import { cachify } from '../../utils';

const API = 'https://swapi.co/api';

export const list = cachify(page => axios.get(`${API}/people/?page=${page}`).then(processList.bind(this, page)));
export const people = cachify(id => axios.get(`${API}/people/${id}`).then(processPeople));
export const detail = cachify((prop, id) => axios.get(`${API}/${prop}/${id}`).then(getName));

function processList(page, { data }) {
  let list = { page, count: data.count, prev: data.previous, next: data.next, people: [] };
  let people = {};
  data.results.forEach(p => {
    p = processPeople({ data: p });
    list.people.push(p.id);
    people[p.id] = p;
  });
  return { list, people };
}

function processPeople({ data }) {
  data.id = getId(data.url);
  data.homeworld = getId(data.homeworld);
  data.films = data.films.map(getId);
  data.species = data.species.map(getId);
  data.vehicles = data.vehicles.map(getId);
  data.starships = data.starships.map(getId);
  return data;
}

function getName({ data }) {
  return data.name || data.title;
}

function getId(str) {
  return parseInt(str.match(/\/(\d+)\/$/)[1]);
}
