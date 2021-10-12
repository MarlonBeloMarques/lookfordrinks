import React, { FC } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Block } from '~/components';

type Props = {
  position: Geolocation.GeoPosition;
  listBreweries: Array<Brewerie>;
};

const Home: FC<Props> = ({ position, listBreweries }) => {
  const renderMarkerBreweries = () => {
    return listBreweries.map((brewerie, index) => {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: Number.parseFloat(brewerie.latitude),
            longitude: Number.parseFloat(brewerie.longitude),
          }}
          title={brewerie.name}
        />
      );
    });
  };

  return (
    <Block>
      <MapView
        testID="mapView"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {position && (
          <Marker
            coordinate={position.coords}
            title="Your real-time location"
          />
        )}
        {listBreweries.length !== 0 && renderMarkerBreweries()}
      </MapView>
    </Block>
  );
};

export default Home;
