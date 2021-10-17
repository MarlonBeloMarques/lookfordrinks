import React, { Dispatch, FC, LegacyRef, SetStateAction } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Block, MapCardList } from '~/components';

type Props = {
  position: Geolocation.GeoPosition;
  listBreweries: Array<Brewerie>;
  mapViewRef: LegacyRef<MapView>;
  animatedEvent: any;
  widthMapCard: Dispatch<SetStateAction<number>>;
};

const Home: FC<Props> = ({
  position,
  listBreweries,
  mapViewRef,
  animatedEvent,
  widthMapCard,
}) => {
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
      {listBreweries.length !== 0 && (
        <MapView
          ref={mapViewRef}
          testID="mapView"
          style={{ flex: 1 }}
          initialRegion={{
            latitude: Number.parseFloat(listBreweries[0].latitude),
            longitude: Number.parseFloat(listBreweries[0].longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
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
      )}
      <MapCardList
        listBreweries={listBreweries}
        onScroll={animatedEvent}
        getWidth={(width) => {
          widthMapCard(width);
        }}
      />
    </Block>
  );
};

export default Home;
