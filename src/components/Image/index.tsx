import React, { FC } from 'react';
import {
  ImageStyle,
  ImageURISource,
  LayoutChangeEvent,
  StyleProp,
} from 'react-native';
import { Photo } from './styles';

type Props = {
  id?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  imageRef?: any;
  source: string | ImageURISource;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
};

const Image: FC<Props> = ({
  id,
  width,
  height,
  style = {},
  onLayout,
  source,
  resizeMode,
  ...rest
}) => {
  return (
    <Photo
      {...rest}
      testID={id}
      resizeMode={resizeMode}
      onLayout={onLayout}
      style={[style, { width: width, height: height }]}
      source={typeof source === 'string' ? { uri: source } : source}
    />
  );
};

export default React.forwardRef((props: Props, ref) => (
  <Image {...props} imageRef={ref} />
));
