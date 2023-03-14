import { useRouter } from 'virtual:router';
import type { App } from 'vue';

export default {
  install(app: App<any>) {
    app.use(useRouter());
    console.log(useRouter());
  },
  a: 111,
  bb: 222,
};

export const routeConfig = {
  bb: 111,
};
