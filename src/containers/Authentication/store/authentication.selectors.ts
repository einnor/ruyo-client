import IGlobalState from 'types';

export const getIsFetching = ({ authentication }: IGlobalState) =>
  authentication.isFetching;

export const getData = ({ authentication }: IGlobalState) =>
  authentication.data;

export const getUID = ({ authentication }: IGlobalState) => authentication.uid;

export const getError = ({ authentication }: IGlobalState) =>
  authentication.error;
