import axios, { AxiosResponse } from 'axios';
import { environments } from '../../../environments';
import { IOrderableItem } from '../ordering/IOrderableItem';
import { IOrderItem } from '../ordering/IOrderItem';
import { IPaymentInfo } from '../ordering/IPaymentInfo';
const https = require('https');

let myInterceptor;
if (!myInterceptor) {
  myInterceptor = axios.interceptors.request.use(
    (config) => {
      // config.timeout = 0.5 * 60 * 1000;

      config.headers['Content-Type'] = 'application/json';
      // config.headers['Access-Control-Allow-Credentials'] = true;
      // config.headers['Authorization'] = Cookie.get('token')
      //   ? Cookie.get('token')
      // : ''; // Attaching persisted token from the browser cookie

      // const agent = new https.Agent({
      //   rejectUnauthorized: false,
      // });

      // config.httpsAgent = agent;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // axios.interceptors.response.use(
  //   (response) => {
  //     if (response && response.data) {
  //       return response.data;
  //     }
  //     return Promise.reject(response);
  //   },
  //   (error) => {
  //     let response = {
  //       data: {
  //         message: '',
  //       },
  //     };
  //     if (
  //       error.message &&
  //       error.message.toLowerCase().indexOf('timeout') > -1
  //     ) {
  //       response.data.message =
  //         'Unable to connect with server. Please try again later.';
  //     } else if (
  //       error.message &&
  //       error.message.toLowerCase().indexOf('network') > -1
  //     ) {
  //       response.data.message = error.message;
  //     }
  //     if (response.data.message) {
  //       error['response'] = response;
  //     }
  //     return Promise.reject(error);
  //   }
  // );
}
// axios.defaults.withCredentials = true;

const getBaseUrl = () => {
  return environments[process.env.NODE_ENV].API_BASE_URL;
};

export const Api = {
  seed: () => axios.get(`${getBaseUrl()}/seed`),

  updateOrder: (
    orderId: string,
    items: IOrderItem[]
  ): Promise<AxiosResponse> => {
    return axios.post(`${getBaseUrl()}/order/update`, {
      orderId,
      items,
    });
  },

  submitOrder: (
    paymentInfo: IPaymentInfo,
    orderNumber: number
  ): Promise<AxiosResponse> => {
    return axios.post(`${getBaseUrl()}`);
  },

  getMenu: (): Promise<AxiosResponse> => {
    return axios.get(`${getBaseUrl()}/menu`);
  },
};
