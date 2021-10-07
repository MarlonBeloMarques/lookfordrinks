import React, { FC } from 'react';
import MapView from 'react-native-maps';
import { Block } from '~/components';

const Home: FC = () => {
  return (
    <Block>
      <MapView testID="mapView" style={{ flex: 1 }}></MapView>
    </Block>
  );
};

export default Home;
