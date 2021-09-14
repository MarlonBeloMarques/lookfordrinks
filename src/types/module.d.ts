import { Icons } from '~/utils';
import { colors } from '~/themes';

declare global {
  namespace Modules {
    export { Icons, colors };
  }
}
