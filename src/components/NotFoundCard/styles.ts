import AnimatedLottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { NotFoundAnimation } from '~/assets/json';
import Block from '../Block';

const width = Dimensions.get('screen').width;

export const Wrapper = styled(Block).attrs({})`
  width: ${width / 1.2}px;
  height: 240px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px 22px;
  justify-content: center;
  align-items: center;
`;

export const NotFound = styled(AnimatedLottieView).attrs({
  source: NotFoundAnimation,
  autoPlay: true,
  resizeMode: 'contain',
  hardwareAccelerationAndroid: true,
})`
  width: 180px;
  height: 180px;
`;
