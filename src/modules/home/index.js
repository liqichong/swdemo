import * as services from './services';
import List from './pages/list';
import People from './pages/people';

export default {
  namespace : 'home',
  state     : {
    list      : {},  // {count, 1: {page, count, prev, next, people: [1,2,3,...]}, ...}
    people    : {},  // {1: {id, name, ...}, ...}
    planets   : {},  // {1: 'name', ...}
    films     : {},
    species   : {},
    vehicles  : {},
    starships : {},
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { people, list } = yield call(services.list, payload);
      yield put({ type: 'home/savePeople', payload: people });
      yield put({ type: 'home/saveList', payload: list });
    },
    *fetchPeople({ payload }, { call, put, select, all }) {
      let people = yield select(state => state.home.people[payload]);
      if(!people) {
        people = yield call(services.people, payload);
        yield put({ type: 'home/savePeople', payload: { [people.id]: people } });
      }
      const { homeworld, films, species, vehicles, starships } = yield all({
        homeworld : call(services.detail, 'planets', people.homeworld),
        films     : people.films.map(v => call(services.detail, 'films', v)),
        species   : people.species.map(v => call(services.detail, 'species', v)),
        vehicles  : people.vehicles.map(v => call(services.detail, 'vehicles', v)),
        starships : people.starships.map(v => call(services.detail, 'starships', v)),
      });
      yield put({ type: 'home/savePlanet', payload: { [people.homeworld]: homeworld } });
      yield put({ type: 'home/saveFilms', payload: people.films.reduce((m, v, i) => { m[v] = films[i]; return m; }, {}) });
      yield put({ type: 'home/saveSpecies', payload: people.species.reduce((m, v, i) => { m[v] = species[i]; return m; }, {}) });
      yield put({ type: 'home/saveVehicles', payload: people.vehicles.reduce((m, v, i) => { m[v] = vehicles[i]; return m; }, {}) });
      yield put({ type: 'home/saveStarships', payload: people.starships.reduce((m, v, i) => { m[v] = starships[i]; return m; }, {}) });
    },
  },
  *catch(err, action) {
    alert(err);
    console.group();
    console.log('error', err);
    console.log('action', action);
    console.groupEnd();
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          count          : payload.count,
          [payload.page] : payload,
        },
      };
    },
    savePeople(state, { payload }) {
      return {
        ...state,
        people: { ...state.people, ...payload },
      };
    },
    savePlanet(state, { payload }) {
      return {
        ...state,
        planets: { ...state.planets, ...payload },
      };
    },
    saveFilms(state, { payload }) {
      return {
        ...state,
        films: { ...state.films, ...payload },
      };
    },
    saveSpecies(state, { payload }) {
      return {
        ...state,
        species: { ...state.species, ...payload },
      };
    },
    saveVehicles(state, { payload }) {
      return {
        ...state,
        vehicles: { ...state.vehicles, ...payload },
      };
    },
    saveStarships(state, { payload }) {
      return {
        ...state,
        starships: { ...state.starships, ...payload },
      };
    },
  },
  routes: {
    '/'      : { component: List },
    '/:page' : { component: List },
    '/p/:id' : { component: People },
  },
};
