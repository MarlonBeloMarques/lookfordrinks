import React from 'react';
import { ActivityIndicator } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import Loading from '../Loading';

describe('Components: Loading', () => {
  test('should play loading animation on loading', () => {
    // given
    const rendered = render(<Loading />);
    // when
    const activityIndicatorRendered =
      rendered.UNSAFE_getByType(ActivityIndicator);
    // then
    expect(activityIndicatorRendered).toBeTruthy();
  });

  test('should show retry screen when connected', () => {
    // given
    const { getByText } = render(<Loading isNoConnection />);
    // when
    const response = getByText('try again');
    // then
    expect(response).toBeTruthy();
  });

  test('should call the function when pressed', () => {
    // given
    const onEventMock = jest.fn();
    const { getByText } = render(
      <Loading isNoConnection tryAgain={onEventMock} />,
    );
    // when
    const button = getByText('try again');
    fireEvent.press(button);
    // then
    expect(onEventMock).toHaveBeenCalled();
  });
});
