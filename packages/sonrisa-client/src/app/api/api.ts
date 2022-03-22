import axios, { AxiosResponse } from 'axios';
import {
  CreateOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Customer,
  OrderLineItem,
  RetrieveOrderResponse,
  UpdateOrderResponse,
} from 'square';
import { environments } from '../../environments';
import {
  ICatalog,
  IContactRequest,
  IContactResponse,
  IInstagramResponse,
  IOrderingStatus,
  IPickupEvent,
} from '@sonrisa/core';

let myInterceptor;
if (!myInterceptor) {
  myInterceptor = axios.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

const getBaseUrl = () => {
  return environments[process.env.NODE_ENV].API_BASE_URL;
};

export const Api = {
  seed: () => axios.get(`${getBaseUrl()}/seed`),

  createOrder: (
    lineItems: OrderLineItem[]
  ): Promise<AxiosResponse<CreateOrderResponse>> => {
    return axios.post(`${getBaseUrl()}/order/create`, {
      lineItems,
    });
  },

  updateOrder: (
    orderId: string,
    version: number,
    data: any
  ): Promise<AxiosResponse<UpdateOrderResponse>> => {
    return axios.post(`${getBaseUrl()}/order/update`, {
      orderId,
      version,
      data,
    });
  },

  getOrder: (
    orderId: string
  ): Promise<AxiosResponse<RetrieveOrderResponse>> => {
    return axios.get(`${getBaseUrl()}/order/${orderId}`);
  },

  createPayment: async (
    request: CreatePaymentRequest,
    customer: Customer,
    pickupEvent: IPickupEvent
  ): Promise<AxiosResponse<CreatePaymentResponse>> => {
    return axios.post(`${getBaseUrl()}/order/payments`, {
      request,
      customer,
      pickupEvent,
    });
  },

  getCatalog: (): Promise<AxiosResponse<ICatalog>> => {
    return axios.get(`${getBaseUrl()}/catalog`);
  },

  contact: async (
    request: IContactRequest
  ): Promise<AxiosResponse<IContactResponse>> => {
    return axios.post(`${getBaseUrl()}/contact`, request);
  },

  getInstagramFeed: async (
    _nextUrl?: string
  ): Promise<AxiosResponse<IInstagramResponse>> => {
    let _url: string = `${getBaseUrl()}/instagram`;
    return axios.get(_nextUrl || _url);
  },

  acceptingOrders: async (): Promise<AxiosResponse<IOrderingStatus>> => {
    return axios.get(`${getBaseUrl()}/order/accepting`);
  },
};

// config.timeout = 0.5 * 60 * 1000;
// config.headers['Access-Control-Allow-Credentials'] = true;
// config.headers['Authorization'] = Cookie.get('token')
//   ? Cookie.get('token')
// : ''; // Attaching persisted token from the browser cookie

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// config.httpsAgent = agent;

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

// axios.defaults.withCredentials = true;
