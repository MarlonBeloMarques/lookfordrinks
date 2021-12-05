import { Env } from '~/utils';

const getLabelVersion = (): string => {
  return `Environment - ${Env.ENV}`;
};

export default getLabelVersion;
