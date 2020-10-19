import axios from 'axios';

import { get } from 'config';
import firebase from 'services/Firebase';

const getToken = (): string => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      return idToken;
    })
    .catch(function (error) {
      // Handle error
    });
  return '';
};

export default axios.create({
  baseURL: get('REACT_APP_BACKEND_BASE_PATH'),
  headers: { Authorization: `Bearer ${getToken()}` },
});
