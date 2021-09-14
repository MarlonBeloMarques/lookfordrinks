import styled from 'styled-components/native';
import { colors, typography } from '~/themes';
import { fontWeights, getColors, getTheme } from '~/utils';

const getFontSize = (variant: keyof typeof typography) =>
  `${getTheme(variant).fontSize}px`;
const getLineHeight = (variant: keyof typeof typography) =>
  `${getTheme(variant).lineHeight}px`;

interface Props {
  color: keyof typeof colors;
  variant: keyof typeof typography;
  align: string;
  weight: keyof typeof fontWeights;
}

export const Typography = styled.Text<Props>`
  color: ${({ color }) => getColors(color)};
  font-size: ${({ variant }) => getFontSize(variant)};
  line-height: ${({ variant }) => getLineHeight(variant)};
  text-align: ${({ align }) => align};
  font-weight: ${({ weight }) => fontWeights[weight]};
`;
