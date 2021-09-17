import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
  zIndex?: number;
  isFlex: number | boolean;
  row: boolean;
  column: boolean;
  center: boolean;
  middle: boolean;
  isLeft: boolean;
  isRight: boolean;
  isTop: boolean;
  isBottom: boolean;
  width?: number;
  height?: number;
  color?: string;
  space?: 'between' | 'around';
  absolute: boolean;
  fullBorder: boolean;
};

const getFlexDirection = (row: boolean, column: boolean): string => {
  if (column) {
    return 'column';
  } else if (row) {
    return 'row';
  }

  return 'column';
};

export const View = styled.View<Props>`
  flex-direction: ${({ row, column }) => getFlexDirection(row, column)};
  background-color: ${({ color }) => (color ? color : 'transparent')};

  ${({ isFlex }) => typeof isFlex === 'boolean' && isFlex && `flex: 1`}
  ${({ isFlex }) => typeof isFlex === 'number' && `flex: ${isFlex}`}
  ${({ absolute }) => absolute && `position: absolute`}
  ${({ center }) => center && `align-items: center`}
  ${({ middle }) => middle && `justify-content: center`}
  ${({ isLeft }) => isLeft && `justify-content: flex-start`}
  ${({ isRight }) => isRight && `justify-content: flex-end`}
  ${({ isTop }) => isTop && `justify-content: flex-start`}
  ${({ isBottom }) => isBottom && `justify-content: flex-end`}
  ${({ space }) => space && `justify-content: space-${space}`}
  ${({ fullBorder }) => fullBorder && `border-width: 1px`}
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`}
  ${({ width }) => width && ` width: ${width}px`}
  ${({ height }) => height && ` height: ${height}px`}
`;

export const ViewAnimated = styled(Animated.View)<Props>`
  flex-direction: ${({ row, column }) => getFlexDirection(row, column)};
  background-color: ${({ color }) => (color ? color : 'transparent')};

  ${({ isFlex }) => typeof isFlex === 'boolean' && isFlex && `flex: 1`}
  ${({ isFlex }) => typeof isFlex === 'number' && `flex: ${isFlex}`}
  ${({ absolute }) => absolute && `position: absolute`}
  ${({ center }) => center && `align-items: center`}
  ${({ middle }) => middle && `justify-content: center`}
  ${({ isLeft }) => isLeft && `justify-content: flex-start`}
  ${({ isRight }) => isRight && `justify-content: flex-end`}
  ${({ isTop }) => isTop && `justify-content: flex-start`}
  ${({ isBottom }) => isBottom && `justify-content: flex-end`}
  ${({ space }) => space && `justify-content: space-${space}`}
  ${({ fullBorder }) => fullBorder && `border-width: 1px`}
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`}
  ${({ width }) => width && ` width: ${width}px`}
  ${({ height }) => height && ` height: ${height}px`}
`;
