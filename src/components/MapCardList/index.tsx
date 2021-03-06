import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import phoneCall from 'react-native-phone-call';
import { getDistance } from 'geolib';
import { Dimensions, Platform, StyleProp, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useAlerts } from '~/utils';
import { AnalyticsService, CrashlyticsService } from '~/services';
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

const screenHeight = Dimensions.get('screen').height;
const mapCardHeight = 260;

const MapCardList: FC<Props> = ({
  listBreweries,
  myPosition,
  onScroll,
  width,
}) => {
  const { showWarning } = useAlerts();

  const topCardMap = screenHeight - mapCardHeight - getStatusBarHeight();

  const callTheBrewery = (numberCall: string) => {
    AnalyticsService.logEvent('call', { numberCall });
    const phoneCallContent = {
      number: numberCall,
      prompt: false,
    };

    if (numberCall) {
      // eslint-disable-next-line promise/prefer-await-to-then
      phoneCall(phoneCallContent).catch((err: Error) => {
        CrashlyticsService.recordError(err), console.log(err);
      });
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

  const getStyleMapCardList = (): StyleProp<
    Animated.AnimateStyle<StyleProp<ViewStyle>>
  > => {
    const style =
      Platform.OS === 'ios'
        ? { bottom: 0 }
        : {
            top: topCardMap,
          };

    return { position: 'absolute', ...style };
  };

  return (
    <Animated.ScrollView
      testID="mapCardList_id"
      horizontal
      pagingEnabled
      scrollEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      style={getStyleMapCardList()}
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
