import axios from '../plugins/axios';
import Api from './Api';

export default class Order {
  public static async fetchAll() {
    try {
      // TODO
      const response = await axios.get('/orders');
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }

  public static async update() {
    try {
      // TODO
      // const response = await axios.put('/orders', order);
      // return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }
}
