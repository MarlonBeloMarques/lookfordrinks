import { getStatusBarHeight } from 'react-native-status-bar-height';
import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { BeerAnimation as BeerLottie } from '~/assets/json';
import { Block, Text } from '~/components';
import { getTheme } from '~/utils';

const BeerAnimation = BeerLottie as string;
const sceneSpacing = getTheme('sceneSpacing');
const baseSpacing = getTheme('baseSpacing');

export const Beer = styled(AnimatedLottieView).attrs({
  source: BeerAnimation,
  autoPlay: true,
  resizeMode: 'contain',
  hardwareAccelerationAndroid: true,
})``;

export const Title = styled(Text).attrs({
  variant: 'largeTitle',
  weight: 'bold',
  align: 'left',
})`
  font-family: 'ArchivoBlack-Regular';
`;

export const SceneWrapper = styled(Block).attrs({})`
  margin-top: ${baseSpacing + getStatusBarHeight()}px;
  margin-left: ${sceneSpacing}px;
  margin-right: ${sceneSpacing}px;
  margin-bottom: ${baseSpacing}px;
`;

export const Environment = styled(Text).attrs({
  color: 'primary',
  weight: 'bold',
  align: 'left',
  variant: 'caption2',
})``;
