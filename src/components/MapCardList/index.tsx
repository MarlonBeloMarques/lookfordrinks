import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import phoneCall from 'react-native-phone-call';
import { getDistance } from 'geolib';
import { useAlerts } from '~/utils';
import MapCard from '../MapCard';
import Block from '../Block';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Props = {
  listBreweries: Array<Brewerie>;
  myPosition: Coordinates;
  onScroll: any;
  width: number;
};

const MapCardList: FC<Props> = ({
  listBreweries,
  myPosition,
  onScroll,
  width,
}) => {
  const { showWarning } = useAlerts();

  const callTheBrewery = (numberCall: string) => {
    const phoneCallContent = {
      number: numberCall,
      prompt: false,
    };

    if (numberCall) {
      // eslint-disable-next-line promise/prefer-await-to-then
      phoneCall(phoneCallContent).catch((err: Error) => console.log(err));
    } else {
      showWarning("We can't find the number to contact you.");
    }
  };

  const getMyDistanceToBrewery = (
    start: Coordinates,
    end: Coordinates,
  ): string => {
    const distanceInM = getDistance(start, end);
    if (distanceInM.toString().length < 4) {
      return `${distanceInM} M`;
    }

    let distanceInKm = distanceInM ? distanceInM / 1000 : 0;

    if (distanceInKm.toString().length > 4) {
      distanceInKm = parseInt(distanceInKm.toString().split('.')[0]);
    }

    return `${distanceInKm} KM`;
  };

  return (
    <Animated.ScrollView
      testID="mapCardList_id"
      horizontal
      pagingEnabled
      scrollEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      style={{ position: 'absolute', bottom: 0 }}
      onScroll={onScroll}
    >
      {listBreweries.map((item) => (
        <Block
          key={item.id}
          center
          flex={false}
          width={width}
          style={{ backgroundColor: 'transparent' }}
        >
          <MapCard
            title={item.name}
            state={item.state}
            address={item.street}
            city={item.city}
            phone={item.phone}
            distance={getMyDistanceToBrewery(myPosition, {
              latitude: Number.parseFloat(item.latitude),
              longitude: Number.parseFloat(item.longitude),
            })}
            onPress={() => {
              callTheBrewery(item.phone);
            }}
          />
        </Block>
      ))}
    </Animated.ScrollView>
  );
};

export default MapCardList;
