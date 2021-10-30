import React, { FC } from 'react';
import Text from '../Text';
import { NotFound, Wrapper } from './styles';

const NotFoundCard: FC = () => {
  return (
    <Wrapper>
      <NotFound loop={false} />
      <Text color="secondary" weight="bold" variant="title2">
        Not found breweries
      </Text>
    </Wrapper>
  );
};

export default NotFoundCard;
