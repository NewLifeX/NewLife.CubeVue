import route from './modules/route';
import user from './modules/user';
import entity from './modules/entity';
import moduleApp from './modules/app';
import getters from './getters';
import { createStore as create, Store, StoreOptions } from 'vuex';
import { App } from 'vue';

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
  app: App<Element>,
  configure: ((options: StoreOptions<S>) => void) | undefined | null = null,
): Store<S> => {
  if (configure) {
    configure(storeOptions);
  }
  const store = create(storeOptions);
  app.use(store);

  return store;
};
