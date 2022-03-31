import { IAdmin, ILoginCredentials } from '@sonrisa/core';

export interface IAuthContext {
  admin: IAdmin;
  logUserIn: (credentials: ILoginCredentials) => Promise<boolean>;
  logUserOut: () => Promise<boolean>;
  verifyUserToken: (user: IAdmin) => Promise<boolean>;
}
