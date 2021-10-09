import React, { FC } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Block } from '~/components';

type Props = {
  position: Geolocation.GeoPosition;
};

const Home: FC<Props> = ({ position }) => {
  return (
    <Block>
      <MapView
        testID="mapView"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {position && (
          <Marker
            coordinate={position.coords}
            title="Your real-time location"
          />
        )}
      </MapView>
    </Block>
  );
};

export default Home;
