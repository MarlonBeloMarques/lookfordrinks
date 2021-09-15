import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { getTheme } from '~/utils';

const largeSpacing = getTheme('largeSpacing');
const minimumSpacing = getTheme('minimumSpacing');
const mediumSpacing = getTheme('mediumSpacing');
const smallSpacing = getTheme('smallSpacing');

export const Wrapper = styled.View`
  margin: ${minimumSpacing * 1.2}px 0;
`;
export const Input = styled.TextInput`
  padding: 0 ${smallSpacing}px;
`;
export const ButtonToggle = styled.TouchableOpacity.attrs({
  activityOpacity: 0.8,
})`
  z-index: 10;
  position: absolute;
  width: ${largeSpacing}px;
  height: ${largeSpacing}px;
  right: ${mediumSpacing / 2}px;
  justify-content: center;
  align-items: center;
  top: ${moderateScale(12)}px;
  background-color: transparent;
`;
