import React, { Dispatch, FC, LegacyRef, SetStateAction } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Block, Image, Loading, MapCardList } from '~/components';
import { BeerMarker } from '~/assets/images';

type Props = {
  position: Geolocation.GeoPosition;
  loading: boolean;
  listBreweries: Array<Brewerie>;
  mapViewRef: LegacyRef<MapView>;
  animatedEvent: any;
  setWidthMapCard: Dispatch<SetStateAction<number>>;
  widthMapCard: number;
  animation: Animated.SharedValue<number>;
};

const Home: FC<Props> = ({
  position,
  loading,
  listBreweries,
  mapViewRef,
  animatedEvent,
  animation,
  widthMapCard,
  setWidthMapCard,
}) => {
  const renderMarkerBreweries = () => {
    return listBreweries.map((brewerie, index) => {
      const scaleStyle = useAnimatedStyle(() => {
        const size = interpolate(
          animation.value,
          [
            (index - 1) * widthMapCard,
            index * widthMapCard,
            (index + 1) * widthMapCard,
          ],
          [25, 40, 25],
          Extrapolate.CLAMP,
        );
        return {
          width: size,
          height: size,
        };
      });

      return (
        <Marker
          key={index}
          coordinate={{
            latitude: Number.parseFloat(brewerie.latitude),
            longitude: Number.parseFloat(brewerie.longitude),
          }}
          title={brewerie.name}
        >
          <Image animated source={BeerMarker} style={scaleStyle} />
        </Marker>
      );
    });
  };

  const getInitialRegionLatitude = () => {
    if (loading || (!loading && listBreweries.length === 0)) {
      return position.coords.latitude;
    }

    return Number.parseFloat(listBreweries[0].latitude);
  };

  const getInitialRegionLongitude = () => {
    if (loading || (!loading && listBreweries.length === 0)) {
      return position.coords.longitude;
    }
    return Number.parseFloat(listBreweries[0].longitude);
  };

  return (
    <Block>
      {loading && <Loading />}
      <MapView
        ref={mapViewRef}
        testID="mapView"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: getInitialRegionLatitude(),
          longitude: getInitialRegionLongitude(),
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
        {!loading && listBreweries.length !== 0 && renderMarkerBreweries()}
      </MapView>
      {!loading && (
        <MapCardList
          listBreweries={listBreweries}
          onScroll={animatedEvent}
          getWidth={(width) => {
            setWidthMapCard(width);
          }}
        />
      )}
    </Block>
  );
};

export default Home;
