// import { IGlobalState } from 'types';

import IGlobalState from 'types';

export const getIsFetching = ({ orders }: IGlobalState) => orders.isFetching;

export const getData = ({ orders }: IGlobalState) => orders.data;

export const getError = ({ orders }: IGlobalState) => orders.error;
