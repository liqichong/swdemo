import * as services from './services';
import List from './pages/list';
import People from './pages/people';

export default {
  namespace : 'home',
  state     : {
    list   : {},  // {count, 1: {page, count, prev, next people: [1,2,3,...]}
    people : {},  // {1: {id, name, ...}}
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const { data } = yield call(services.list, payload);
      // transform response from server 
      let list = { page: payload, count: data.count, prev: data.previous, next: data.next, people: [] };
      let people = {};
      data.results.forEach(p => {
        p.id = getId(p);
        list.people.push(p.id);
        people[p.id] = p;
      });
      yield put({ type: 'home/savePeople', payload: people });
      yield put({ type: 'home/saveList', payload: list });
    },
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
        people: {
          ...state.people,
          ...payload,
        },
      };
    },
  },
  routes: {
    '/'      : { component: List },
    '/:page' : { component: List },
    '/p/:id' : { component: People },
  },
};

function getId(result, prop = 'url') {
  return result[prop] && result[prop].match(/\/(\d+)\/$/)[1]|0;
}
