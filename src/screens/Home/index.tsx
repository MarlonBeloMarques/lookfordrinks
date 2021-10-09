import React, { FC, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
  const [myPosition, setMyPosition] =
    useState<Geolocation.GeoPosition>(initialPositionValue);

  useEffect(() => {
    getLocation();
  }, []);

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

  return <Home position={myPosition} />;
};

export default HomeContainer;
