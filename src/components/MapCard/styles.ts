import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Block from '../Block';
import TouchableOpacity from '../Button';

import Text from '../Text';

const width = Dimensions.get('screen').width;

export const Wrapper = styled(Block).attrs({})`
  width: ${width / 1.2}px;
  height: 240px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px 22px;
`;

export const Title = styled(Text).attrs({
  align: 'left',
  variant: 'title2',
  weight: 'bold',
})`
  font-family: 'ArchivoBlack-Regular';
`;

export const State = styled(Text).attrs({
  align: 'left',
  variant: 'body',
  weight: 'bold',
})``;

export const DetailContainer = styled(Block)`
  flex: 0.5;
  justify-content: space-around;
`;

export const DistanceContainer = styled(Block)`
  flex: 0.5;
  align-items: flex-end;
`;

export const Button = styled(TouchableOpacity)`
  height: 35px;
  margin-bottom: 10px;
`;

export const City = styled(Text).attrs({
  align: 'left',
  variant: 'caption1',
  weight: 'bold',
})``;

export const Address = styled(Text).attrs({
  align: 'left',
  variant: 'caption1',
  weight: 'medium',
})``;

export const Phone = styled(Text).attrs({
  align: 'left',
  variant: 'caption1',
  weight: 'medium',
})``;

export const Distance = styled(Text).attrs({
  variant: 'title1',
  weight: 'bold',
})`
  font-family: 'ArchivoBlack-Regular';
`;
