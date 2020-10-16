import decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token') || '';

  try {
    decode(token);
  } catch (err) {
    return false;
  }

  return true;
};
