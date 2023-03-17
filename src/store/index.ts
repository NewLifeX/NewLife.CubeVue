import { createStore as create, Store, StoreOptions } from 'vuex';
import getters from './getters';
import moduleApp from './modules/app';
import entity from './modules/entity';
import route from './modules/route';
import user from './modules/user';

interface S {
  app: typeof moduleApp.state;
  entity: typeof entity.state;
  route: typeof route.state;
  user: typeof user.state;
}

export const storeOptions: StoreOptions<S> = {
  state: {} as S,
  mutations: {},
  actions: {},
  modules: {
    app: moduleApp,
    entity,
    route,
    user,
  },
  getters,
};

export const createStore = (
  app: any,
  configure: ((options: StoreOptions<S>) => void) | undefined = undefined,
): Store<S> => {
  if (configure) {
    configure(storeOptions);
  }
  const store = create(storeOptions);
  app.use(store);

  return store;
};
