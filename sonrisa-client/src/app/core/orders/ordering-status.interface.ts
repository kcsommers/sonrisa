export interface IOrderingStatus {
  acceptingOrders: boolean;
  message?: string;
  errors?: Error[];
}
