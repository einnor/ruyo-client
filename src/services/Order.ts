import { IOrder } from 'types';
import axios from '../plugins/axios';
import Api from './Api';

export default class Order {
  public static async fetchAll() {
    try {
      const response = await axios.get('/orders');
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }

  public static async fetchById(id: string) {
    try {
      const response = await axios.get(`/orders/${id}`);
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }

  public static async update(id: string, order: IOrder) {
    try {
      const response = await axios.put(`/orders/${id}`, order);
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }
}
