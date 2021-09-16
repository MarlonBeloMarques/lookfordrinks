import { create } from 'mobx-persist';

import { AsyncStorage } from '~/utils';
import UserStore from './user.store';

class RootStore {
  user: UserStore;

  constructor() {
    this.user = new UserStore();
  }
}

const hydrate = create({ storage: AsyncStorage });
const store = new RootStore();
hydrate('user', store.user);

export { UserStore };

export default store;
