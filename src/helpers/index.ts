import firebase from 'services/Firebase';

export const isAuthenticated = () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return true;
  }
  return false;
};

export const getToken = async () => {
  if (!firebase.auth().currentUser) {
    return '';
  }
  const token = await firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true);
  if (!token) {
    return '';
  }
  return token;
};
