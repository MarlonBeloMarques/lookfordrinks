import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import MapCard from '../MapCard';
import Block from '../Block';

type Props = {
  listBreweries: Array<Brewerie>;
  onScroll: any;
  width: number;
};

const MapCardList: FC<Props> = ({ listBreweries, onScroll, width }) => {
  return (
    <Animated.ScrollView
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
            distance="9 KM"
            onPress={() => {}}
          />
        </Block>
      ))}
    </Animated.ScrollView>
  );
};

export default MapCardList;
