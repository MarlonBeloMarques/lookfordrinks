import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import { getTheme } from '~/utils';
import Icon from '../Icon';
import { ButtonToggle, Input, Wrapper } from './styles';

const largeSpacing = getTheme('largeSpacing');
const mediumRadius = getTheme('mediumRadius');

const inputStyle: StyleProp<TextStyle> = {
  borderWidth: moderateScale(2),
  height: largeSpacing * 2,
  color: getTheme('text'),
  borderRadius: mediumRadius,
};

const iconSecurity: IconProps = {
  fontFamily: 'MaterialIcons',
  color: 'text',
  size: 18,
};

type Props = {
  id?: string;
  placeholder?: string;
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string | boolean;
  value: string | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText:
    | ((text: string, rawText?: string | undefined) => void)
    | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  isSecure?: boolean;
  inputRef?: any;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  iconRight?: IconProps;
};

const TextInput: React.FC<Props> = ({
  id,
  placeholder,
  autoFocus,
  keyboardType,
  error,
  value,
  onChangeText,
  onSubmitEditing,
  isSecure,
  inputRef,
  disabled = true,
  autoCapitalize,
  style = inputStyle,
  iconRight = iconSecurity,
}) => {
  const [isToggleSecure, setIsToggleSecure] = useState(false);

  const toggleSecure = isToggleSecure;
  const secure = toggleSecure ? false : isSecure;

  const getError = (): boolean | undefined => {
    if (typeof error === 'boolean') {
      return error;
    }
    if (typeof error === 'string' && error.length > 0) {
      return true;
    }

    return undefined;
  };

  const renderToggle = (): JSX.Element => {
    if (!isSecure) return <></>;

    return (
      <ButtonToggle onPress={() => setIsToggleSecure(!isToggleSecure)}>
        <Icon
          fontFamily={iconRight.fontFamily}
          name={!isToggleSecure ? 'visibility' : 'visibility-off'}
          color={iconRight.color}
          size={iconRight.size}
        />
      </ButtonToggle>
    );
  };

  return (
    <Wrapper>
      <Input
        placeholderTextColor={getTheme('disabled').dark}
        editable={disabled}
        ref={inputRef}
        testID={id}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        style={[
          style,
          {
            borderColor: getError()
              ? getTheme('failure')
              : getTheme('disabled').dark,
          },
        ]}
        secureTextEntry={secure}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      {renderToggle()}
    </Wrapper>
  );
};

export default React.forwardRef((props: Props, ref) => (
  <TextInput {...props} inputRef={ref} />
));
