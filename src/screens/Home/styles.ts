import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Block, Icon } from '~/components';
import { getTheme } from '~/utils';

export const WrapperNotFound = styled(Block).attrs({
  zIndex: 10,
  absolute: true,
  flex: false,
})`
  background-color: transparent;
  bottom: 0;
  align-self: center;
`;

export const NearMeButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  z-index: 10;
`;

export const WrapperNearMe = styled(Block).attrs({
  center: true,
  middle: true,
  absolute: true,
  flex: false,
})`
  top: 120px;
  border-radius: 4px;
  right: 0;
  margin-right: ${getTheme('baseSpacing')}px;
  width: 30px;
  height: 30px;
`;

export const NearMeIcon = styled(Icon).attrs({
  name: 'near-me',
  fontFamily: 'MaterialIcons',
  size: 20,
  color: 'primary',
})``;
