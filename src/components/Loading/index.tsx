import React, { FC } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';

import { getColors } from '~/utils';
import Block from '../Block';
import Text from '../Text';
import { NoConnection, TryAgainButton } from './styles';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

type Props = {
  isNoConnection?: boolean;
  tryAgain?: () => void;
};

const Loading: FC<Props> = ({
  isNoConnection = false,
  tryAgain = () => {},
}) => {
  return (
    <Block
      style={{
        backgroundColor: isNoConnection
          ? getColors('white')
          : 'rgba(255,255,255,0.6)',
      }}
      center
      middle
      zIndex={100}
      absolute
      width={width}
      height={height}
    >
      {isNoConnection ? (
        <>
          <NoConnection />
          <Text>There was a problem fetching the breweries</Text>
          <TryAgainButton onPress={tryAgain}>try again</TryAgainButton>
        </>
      ) : (
        <ActivityIndicator size="large" color={getColors('text')} />
      )}
    </Block>
  );
};

export default Loading;
