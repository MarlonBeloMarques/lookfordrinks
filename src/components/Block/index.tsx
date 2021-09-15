import React, { FC } from 'react';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { colors } from '~/themes';
import { getColors } from '~/utils';
import { View, ViewAnimated } from './styles';

type Props = {
  id?: string;
  flex?: number | boolean;
  zIndex?: number;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  width?: number;
  height?: number;
  color?: keyof typeof colors;
  space?: 'between' | 'around';
  style?: StyleProp<ViewStyle>;
  absolute?: boolean;
  fullBorder?: boolean;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  animated?: boolean;
};

const Block: FC<Props> = ({
  id,
  flex = 1,
  zIndex,
  row = false,
  column = false,
  center = false,
  middle = false,
  left = false,
  right = false,
  top = false,
  bottom = false,
  width,
  height,
  color = 'white',
  space,
  style = {},
  absolute = false,
  fullBorder = false,
  onLayout,
  children,
  animated = false,
  ...rest
}) => {
  if (animated) {
    return (
      <ViewAnimated
        {...rest}
        zIndex={zIndex}
        testID={id}
        flex={flex}
        row={row}
        column={column}
        style={style}
        center={center}
        middle={middle}
        left={left}
        right={right}
        top={top}
        bottom={bottom}
        width={width}
        height={height}
        color={getColors(color)}
        space={space}
        absolute={absolute}
        fullBorder={fullBorder}
        onLayout={onLayout}
      >
        {children}
      </ViewAnimated>
    );
  }

  return (
    <View
      {...rest}
      zIndex={zIndex}
      testID={id}
      flex={flex}
      row={row}
      column={column}
      style={style}
      center={center}
      middle={middle}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      width={width}
      height={height}
      color={getColors(color)}
      space={space}
      absolute={absolute}
      fullBorder={fullBorder}
      onLayout={onLayout}
    >
      {children}
    </View>
  );
};

export default Block;
