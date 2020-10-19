import axios from 'plugins/axios';
import firebase from 'services/Firebase';
import Api from './Api';

export default class Order {
  public static async signIn(email: string, password: string) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          return user;
        })
        .catch((error) => {
          console.log(error);
          return Api.handleResponseData(error);
        });
    } catch (error) {
      console.log(error);
      return Api.handleResponseData(error);
    }
  }

  public static async getUser(uid: string) {
    try {
      const response = await axios.get(`/users/${uid}`);
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }
}
