import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class UserStore {
  @persist('object')
  @observable
  userData: UserData = {
    name: '',
  };

  @action
  login = async (credentials: Credentials): Promise<void> => {
    this.userData = { name: credentials.name };
  };
}
