import React, { FC } from 'react';
import Block from '../Block';
import Icon from '../Icon';
import {
  Address,
  Button,
  City,
  DetailContainer,
  Distance,
  DistanceContainer,
  Phone,
  State,
  Title,
  Wrapper,
} from './styles';

type Props = {
  title: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  distance: string;
  onPress: () => void;
};

const MapCard: FC<Props> = ({
  title = 'MadTree Brewing',
  state = 'United States',
  city = 'Ohio, Cincinnati',
  address = '3301 Madison Rd',
  phone = '5138368733',
  distance = '9 KM',
  onPress,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <State>{state}</State>
      <Block row space="between" style={{ paddingTop: 10 }}>
        <DetailContainer>
          <Block flex={false} row>
            <Block center middle width={30} flex={false}>
              <Icon
                name="location-on"
                fontFamily="MaterialIcons"
                color="text"
                size={24}
              />
            </Block>
            <Block flex={false}>
              <City>{city},</City>
              <Address>{address}</Address>
            </Block>
          </Block>
          <Block flex={false} row>
            <Block center middle width={30} flex={false}>
              <Icon
                name="local-phone"
                fontFamily="MaterialIcons"
                color="text"
                size={14}
              />
            </Block>
            <Phone>{phone}</Phone>
          </Block>
        </DetailContainer>
        <DistanceContainer>
          <Distance>TO</Distance>
          <Distance color="primary">{distance}</Distance>
        </DistanceContainer>
      </Block>
      <Button onPress={onPress}>get in touch</Button>
    </Wrapper>
  );
};

export default MapCard;
