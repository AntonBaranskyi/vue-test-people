import { createStore } from 'vuex';
import { usersModule } from './modules/usersModule';
import { commonModule } from './modules/commonModule';

export default createStore({
  state: {},
  modules: {
    users: usersModule,
    common: commonModule,
  },
});
