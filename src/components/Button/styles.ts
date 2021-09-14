import styled from 'styled-components/native';
import { colors } from '~/themes';
import { getColors, getTheme } from '~/utils';
import Typography from '../Text';

const largeSpacing = getTheme('largeSpacing');
const mediumRadius = getTheme('mediumRadius');
const mediumSpacing = getTheme('mediumSpacing');

type Props = {
  color: keyof typeof colors;
};

export const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<Props>`
  height: ${largeSpacing * 2}px;
  border-radius: ${mediumRadius}px;
  background-color: ${({ color }) => getColors(color)};
  justify-content: center;
  margin: ${mediumSpacing}px 0;
`;

export const Text = styled(Typography)``;
