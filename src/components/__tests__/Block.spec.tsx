import React from 'react';
import Text from '../Text';
import Block from '../Block';
import { renderWithTheme } from './helpers/renderWithTheme';

describe('Components: Block', () => {
  test('must find no element the value passed as child', () => {
    // given
    const children = <Text>Children</Text>;
    const rendered = renderWithTheme(<Block>{children}</Block>);
    // when
    const response = rendered.getByText('Children');
    // then
    expect(response).toBeTruthy();
  });
});
