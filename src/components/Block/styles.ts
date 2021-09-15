import styled from 'styled-components/native';

type Props = {
  zIndex?: number;
  flex: number | boolean;
  row: boolean;
  column: boolean;
  center: boolean;
  middle: boolean;
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
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

  ${({ flex }) => typeof flex === 'boolean' && flex && `flex: 1`}
  ${({ flex }) => typeof flex === 'number' && `flex: ${flex}`}
  ${({ absolute }) => absolute && `position: absolute`}
  ${({ center }) => center && `align-items: center`}
  ${({ middle }) => middle && `justify-content: center`}
  ${({ left }) => left && `justify-content: flex-start`}
  ${({ right }) => right && `justify-content: flex-end`}
  ${({ top }) => top && `justify-content: flex-start`}
  ${({ bottom }) => bottom && `justify-content: flex-end`}
  ${({ space }) => space && `justify-content: space-${space}`}
  ${({ fullBorder }) => fullBorder && `border-width: 1px`}
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`}
  ${({ width }) => width && ` width: ${width}px`}
  ${({ height }) => height && ` height: ${height}px`}
`;
