import { Order as IOrder } from 'containers/Orders/store/orders.types';
import axios from 'plugins/axios';
import { getToken } from 'helpers';
import Api from './Api';

export default class Order {
  public static async fetchAll() {
    try {
      const token = await getToken();
      const response = await axios.get('/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }

  public static async fetchById(id: string) {
    try {
      const token = await getToken();
      const response = await axios.get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }

  public static async update(id: string, order: IOrder) {
    try {
      const token = await getToken();
      const { title, bookingDate } = order;
      const response = await axios.put(
        `/orders/${id}`,
        { title, bookingDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return Api.handleResponseData(response);
    } catch (error) {
      return Api.handleResponseData(error.response);
    }
  }
}
