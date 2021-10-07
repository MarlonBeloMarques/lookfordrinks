import { Icons } from '~/utils';
import { colors } from '~/themes';
import { Routes } from '~/navigation';

declare global {
  namespace Modules {
    export { Routes, Icons, colors };
  }
  namespace ReactNavigation {
    interface RootParamList {
      LOGIN: string;
      WELCOME: string;
      HOME: string;
    }
  }
}
