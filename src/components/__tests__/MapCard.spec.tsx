import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import MapCard from '../MapCard';
import { renderWithTheme } from './helpers/renderWithTheme';

const makeMocks = () => {
  return {
    address: '242 Ofarrell St',
    city: 'San Francisco',
    distance: '9km',
    phone: '4154334332',
    state: 'California',
    title: 'Bartlett Hall',
  };
};

describe('Components: MapCard', () => {
  test('must show all content passed by props', () => {
    // given
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <MapCard
        address={makeMocks().address}
        city={makeMocks().city}
        distance={makeMocks().distance}
        phone={makeMocks().phone}
        state={makeMocks().state}
        title={makeMocks().title}
        onPress={onPressMock}
      />,
    );
    const mockCity = `${makeMocks().city},`;
    // when
    const responseAddress = getByText(makeMocks().address);
    const responseCity = getByText(mockCity);
    const responseDistance = getByText(makeMocks().distance);
    const responsePhone = getByText(makeMocks().phone);
    const responseState = getByText(makeMocks().state);
    const responseTitle = getByText(makeMocks().title);
    // then
    expect(responseAddress).toBeTruthy();
    expect(responseCity).toBeTruthy();
    expect(responseDistance).toBeTruthy();
    expect(responsePhone).toBeTruthy();
    expect(responseState).toBeTruthy();
    expect(responseTitle).toBeTruthy();
  });
  test('must show the content with condition', () => {
    // given
    const onPressMock = jest.fn();
    const { getByText, queryByText } = renderWithTheme(
      <MapCard
        address={''}
        city={makeMocks().city}
        distance={makeMocks().distance}
        phone={''}
        state={makeMocks().state}
        title={makeMocks().title}
        onPress={onPressMock}
      />,
    );
    // when
    const responseAddress = queryByText(makeMocks().address);
    const responseCity = getByText(makeMocks().city);
    const responseDistance = getByText(makeMocks().distance);
    const responsePhone = queryByText(makeMocks().phone);
    const responseState = getByText(makeMocks().state);
    const responseTitle = getByText(makeMocks().title);
    // then
    expect(responseAddress).toBeNull();
    expect(responseCity).toBeTruthy();
    expect(responseDistance).toBeTruthy();
    expect(responsePhone).toBeNull();
    expect(responseState).toBeTruthy();
    expect(responseTitle).toBeTruthy();
  });

  test('should call the function when called', () => {
    // given
    const onPressMock = jest.fn();
    const rendered = renderWithTheme(
      <MapCard
        address={''}
        city={makeMocks().city}
        distance={makeMocks().distance}
        phone={''}
        state={makeMocks().state}
        title={makeMocks().title}
        onPress={onPressMock}
      />,
    );
    // when
    fireEvent.press(rendered.getByText('get in touch'));
    // then
    expect(onPressMock).toHaveBeenCalled();
  });
});
