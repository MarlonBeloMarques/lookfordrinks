import {} from 'styled-components';
import { ThemeType } from '../themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
