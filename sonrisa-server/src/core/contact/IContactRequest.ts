import { Customer } from 'square';

export interface IContactRequest {
  customer: Customer;

  message: string;
}
