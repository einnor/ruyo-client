/* eslint-disable no-throw-literal */
import axios from 'plugins/axios';
import firebase from 'services/Firebase';
import { getToken } from 'helpers';
import Api from './Api';

export default class Order {
  public static async signIn(email: string, password: string) {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (!response) {
        throw {
          status: 400,
          error: 'Bad Request',
          message: 'The request data is invalid.',
          body: {},
        };
      }
      return response.user.uid;
    } catch (error) {
      throw {
        status: 400,
        error: error,
        message: error.message,
        body: error,
      };
    }
  }

  public static async getUser(uid: string) {
    try {
      const token = await getToken();
      const response = await axios.get(`/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }
}
