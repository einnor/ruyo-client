import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
  size?: 'large' | 'medium' | 'small';
}

const LoadingIndicator = ({ size = 'medium' }: IProps) => (
  <CircularProgress
    size={size === 'large' ? 60 : size === 'medium' ? 40 : 30}
  />
);

export default LoadingIndicator;
