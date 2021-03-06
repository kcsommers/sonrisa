export interface ILocation {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  _id?: string;
}
