export interface IAcceptingOrdersResponse {
  acceptingOrders: boolean;

  reason: string;

  errors: Error[];
}
