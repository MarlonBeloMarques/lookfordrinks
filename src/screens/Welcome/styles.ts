import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { BeerAnimation as BeerLottie } from '~/assets/json';

const BeerAnimation = BeerLottie as string;

export const Beer = styled(AnimatedLottieView).attrs({
  source: BeerAnimation,
  autoPlay: true,
  resizeMode: 'contain',
  hardwareAccelerationAndroid: true,
})``;
