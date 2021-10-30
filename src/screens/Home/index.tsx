import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import {
  runOnJS,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { BreweriesApi } from '~/api';
import { Search } from '~/components';
import { useNavigation } from '~/navigation';
import { useDebounce } from '~/utils';
import Home from './Home';
import { hasLocationPermission } from './permissions';

const initialPositionValue: Geolocation.GeoPosition = {
  coords: {
    accuracy: 0,
    altitude: 0,
    latitude: 37.78825,
    longitude: -122.4324,
    heading: null,
    speed: null,
    altitudeAccuracy: null,
  },
  timestamp: 0,
  mocked: true,
  provider: 'passive',
};

const HomeContainer: FC = () => {
  const { setOptions } = useNavigation();

  const [myPosition, setMyPosition] =
    useState<Geolocation.GeoPosition>(initialPositionValue);
  const [listBreweries, setListBreweries] = useState<Array<Brewerie>>([]);
  const [widthMapCard, setWidthMapCard] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [initialized, setInitialized] = useState(false);

  const debouncedSearch = useDebounce(searchValue, 1200);

  const animation = useSharedValue(0);

  const mapViewRef = useRef<MapView>(null);

  const animateToRegion = (index: number) => {
    if (listBreweries.length !== 0) {
      mapViewRef.current?.animateToRegion(
        {
          latitude: Number.parseFloat(listBreweries[index].latitude),
          longitude: Number.parseFloat(listBreweries[index].longitude),
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000,
      );
    }
  };

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Search value={searchValue} onChangeText={setSearchValue} />
      ),
    });
  }, [useNavigation, searchValue]);

  useDerivedValue(() => {
    let index = Math.floor(animation.value / widthMapCard + 0.3);
    if (index >= listBreweries.length) {
      index = listBreweries.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }

    runOnJS(animateToRegion)(index);
  }, [animation, listBreweries]);

  useEffect(() => {
    getLocation();
    getListBreweries();
  }, []);

  const treatsListBreweries = (listBreweries: Array<Brewerie>) => {
    const treatd = listBreweries.filter(
      (brewery) => brewery.latitude && brewery.longitude,
    );

    setListBreweries(treatd);
  };

  const getListBreweries = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = myPosition;
      const data = await BreweriesApi.listBreweriesByDistance(
        latitude,
        longitude,
      );

      treatsListBreweries(data);
    } catch (error) {
    } finally {
      !initialized && setInitialized(true);
    }
  };

  useEffect(() => {
    debouncedSearch.length !== 0 && searchBreweries(debouncedSearch);
  }, [debouncedSearch]);

  const searchBreweries = async (value: string) => {
    try {
      setLoading(true);
      const data = await BreweriesApi.searchBreweries(value);

      treatsListBreweries(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setMyPosition(position);
        },
        (error) => {
          Alert.alert(`Code ${error.code}`, error.message);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 540000,
          distanceFilter: 0,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const animatedEvent = useAnimatedScrollHandler((event) => {
    animation.value = event.contentOffset.x;
  });

  return (
    <Home
      mapViewRef={mapViewRef}
      position={myPosition}
      loading={loading}
      initialized={initialized}
      listBreweries={listBreweries}
      animatedEvent={animatedEvent}
      setWidthMapCard={setWidthMapCard}
      widthMapCard={widthMapCard}
      animation={animation}
    />
  );
};

export default HomeContainer;
