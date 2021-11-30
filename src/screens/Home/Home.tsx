import React, { FC, LegacyRef, useMemo } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Block, Image, Loading, MapCardList, NotFoundCard } from '~/components';
import { BeerMarker } from '~/assets/images';
import {
  NearMeButton,
  NearMeIcon,
  WrapperNearMe,
  WrapperNotFound,
} from './styles';

type Props = {
  position: Geolocation.GeoPosition;
  positioIsEmpty: boolean;
  loading: boolean;
  isConnected: boolean;
  initialized: boolean;
  listBreweries: Array<Brewerie>;
  mapViewRef: LegacyRef<MapView>;
  animatedEvent: any;
  getBreweriesNearMe: () => void;
  widthMapCard: number;
  animation: Animated.SharedValue<number>;
};

const Home: FC<Props> = ({
  position,
  positioIsEmpty,
  loading,
  isConnected,
  initialized,
  listBreweries,
  mapViewRef,
  animatedEvent,
  animation,
  widthMapCard,
  getBreweriesNearMe,
}) => {
  const showList = !loading && listBreweries.length !== 0;

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
          testID={`marker_${index}_id`}
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

  const getInitialRegion = () => {
    return {
      latitude: getInitialRegionLatitude(),
      longitude: getInitialRegionLongitude(),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  };

  const renderNotFound = () => {
    if (!loading && listBreweries.length === 0 && initialized) {
      return (
        <WrapperNotFound>
          <NotFoundCard />
        </WrapperNotFound>
      );
    }

    return <></>;
  };

  return (
    <Block>
      {loading && (
        <Loading
          isNoConnection={!isConnected}
          tryAgain={() => getBreweriesNearMe()}
        />
      )}
      <NearMeButton onPress={() => getBreweriesNearMe()}>
        <WrapperNearMe>
          <NearMeIcon />
        </WrapperNearMe>
      </NearMeButton>
      {renderNotFound()}
      <MapView
        ref={mapViewRef}
        testID="mapView"
        style={{ flex: 1 }}
        initialRegion={!positioIsEmpty ? getInitialRegion() : undefined}
      >
        {!positioIsEmpty && (
          <Marker
            coordinate={position.coords}
            title="Your real-time location"
          />
        )}
        {showList && renderMarkerBreweries()}
      </MapView>
      {showList &&
        useMemo(
          () => (
            <MapCardList
              listBreweries={listBreweries}
              onScroll={animatedEvent}
              width={widthMapCard}
              myPosition={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }}
            />
          ),
          [listBreweries],
        )}
    </Block>
  );
};

export default Home;
