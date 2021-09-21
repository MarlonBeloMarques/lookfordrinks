import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, render } from '@testing-library/react-native';
import theme from '~/themes';

export const renderWithTheme = (children: React.ReactNode): RenderAPI => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
