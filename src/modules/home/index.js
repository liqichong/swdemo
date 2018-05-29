import List from './pages/list';
import People from './pages/people';

export default {
  namespace : 'home',
  state     : {
    list: {},
  },
  effects: {

  },
  reducers: {

  },
  routes: {
    '/'      : { component: List },
    '/p/:id' : { component: People },
  },
};
