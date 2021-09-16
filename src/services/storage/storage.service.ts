import { AsyncStorage } from '~/utils';

export default class Storage {
  static clearWholeStorage(): void {
    AsyncStorage.clear();
  }

  static async getAllStorage(): Promise<any> {
    return AsyncStorage.getAllKeys();
  }
}
