import styled from 'styled-components/native';
import AnimatedLottieView from 'lottie-react-native';
import { NoConnectionAnimation } from '~/assets/json';
import Button from '../Button';

export const NoConnection = styled(AnimatedLottieView).attrs({
  source: NoConnectionAnimation,
  autoPlay: true,
  resizeMode: 'contain',
})`
  width: 200px;
  height: 200px;
`;
export const TryAgainButton = styled(Button)`
  height: 35px;
  margin-bottom: 10px;
  width: 180px;
`;
