import axios, { AxiosResponse } from 'axios';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  Customer,
  Order,
  OrderLineItem,
} from 'square';
import { environments } from '../../../environments';
import { IGetCatalogResponse } from './interfaces/IGetCatalogResponse';

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

  createOrder: (lineItems: OrderLineItem[]): Promise<AxiosResponse<Order>> => {
    return axios.post(`${getBaseUrl()}/order/create`, {
      lineItems,
    });
  },

  updateOrder: (
    orderId: string,
    version: number,
    items: OrderLineItem[]
  ): Promise<AxiosResponse<Order>> => {
    return axios.post(`${getBaseUrl()}/order/update`, {
      orderId,
      items,
      version,
    });
  },

  getOrder: (orderId: string): Promise<AxiosResponse<Order>> => {
    return axios.get(`${getBaseUrl()}/order/${orderId}`);
  },

  createPayment: async (
    request: CreatePaymentRequest,
    customer: Customer
  ): Promise<AxiosResponse<CreatePaymentResponse>> => {
    return axios.post(`${getBaseUrl()}/order/payments`, { request, customer });
  },

  getCatalog: (): Promise<AxiosResponse<IGetCatalogResponse>> => {
    return axios.get(`${getBaseUrl()}/catalog`);
  },
};
