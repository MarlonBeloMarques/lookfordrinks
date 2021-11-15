import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import MapCardList from '../MapCardList';
import BreweriesList from './fixtures/breweriesList';

type _Brewerie = typeof BreweriesList[0] & Brewerie;

const makeMocks = () => {
  return {
    listBreweries: BreweriesList as Array<_Brewerie>,
    myPosition: {
      latitude: 0,
      longitude: 0,
    },
  };
};

describe('Component: MapCardList', () => {
  test('when it reaches the end of the list, it will call the function to get pokemons', () => {
    // given
    const onScrollMock = jest.fn();
    const { getByTestId } = render(
      <MapCardList
        listBreweries={makeMocks().listBreweries}
        myPosition={makeMocks().myPosition}
        onScroll={onScrollMock}
        width={500}
      />,
    );

    // when
    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: 500,
        },
        contentSize: {
          height: 500,
          width: 500,
        },
        layoutMeasurement: {
          height: 500,
          width: 500,
        },
      },
    };

    fireEvent.scroll(getByTestId('mapCardList_id'), eventData);

    // then
    expect(onScrollMock).toHaveBeenCalled();
  });
});
