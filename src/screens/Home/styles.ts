import styled from 'styled-components/native';
import { Block } from '~/components';

export const WrapperNotFound = styled(Block).attrs({
  zIndex: 10,
  absolute: true,
  flex: false,
})`
  background-color: transparent;
  bottom: 0;
  align-self: center;
`;
