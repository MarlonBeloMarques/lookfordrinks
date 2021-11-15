import React, { Dispatch, FC, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import { getTheme } from '~/utils';
import Icon from '../Icon';
import Block from '../Block';
import Input from '../Input';

const baseSpacing = getTheme('baseSpacing');
const largeSpacing = getTheme('largeSpacing');
const mediumRadius = getTheme('mediumRadius');
const width = Dimensions.get('screen').width;

const inputStyle = {
  height: baseSpacing * 2,
  color: getTheme('text'),
  borderRadius: mediumRadius,
  backgroundColor: getTheme('white'),
  paddingLeft: largeSpacing * 1.5,
};

type Props = {
  value: string;
  disabled?: boolean;
  onChangeText: Dispatch<SetStateAction<string>>;
};

const Search: FC<Props> = ({ value, disabled = false, onChangeText }) => {
  return (
    <Block
      style={{
        backgroundColor: 'transparent',
        width: width / 1.4,
        marginRight: getTheme('baseSpacing'),
      }}
    >
      <Block absolute zIndex={10} style={{ top: 12, paddingLeft: 10 }}>
        <Icon
          fontFamily="MaterialIcons"
          name="search"
          size={20}
          color={'text'}
        />
      </Block>
      <Input
        id="search_id"
        disabled={!disabled}
        placeholder="search for a brewery"
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
      />
    </Block>
  );
};

export default Search;
