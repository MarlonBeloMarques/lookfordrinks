import React, { FC, memo } from 'react';
import { ActivityIndicator, Button as B } from 'react-native';
import { colors, typography } from '~/themes';
import { fontWeights, getTheme } from '~/utils';
import { Text, Touchable } from './styles';

type Props = {
  color?: keyof typeof colors;
  styleText?: {
    color?: keyof typeof colors;
    variant?: keyof typeof typography;
    weight?: keyof typeof fontWeights;
  };
  id?: string;
  onPress: () => void;
  submiting?: boolean;
  children?: React.ReactNode;
};

const Button: FC<Props> = ({
  id,
  onPress,
  styleText = {
    color: 'white',
    weight: 'bold',
    variant: 'body',
  },
  color = 'primary',
  children,
  submiting = false,
  ...rest
}) => {
  return (
    <Touchable testID={id} color={color} onPress={onPress} {...rest}>
      {submiting ? (
        <ActivityIndicator size="small" color={getTheme('white')} />
      ) : (
        <Text
          color={styleText?.color}
          variant={styleText?.variant}
          weight={styleText?.weight}
        >
          {children}
        </Text>
      )}
    </Touchable>
  );
};

export default memo(Button);
