import React, { FC } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { getColors } from '~/utils';
import Block from '../Block';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Loading: FC = () => {
  return (
    <Block
      style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
      center
      middle
      zIndex={100}
      absolute
      width={width}
      height={height}
    >
      <ActivityIndicator size="large" color={getColors('text')} />
    </Block>
  );
};

export default Loading;
