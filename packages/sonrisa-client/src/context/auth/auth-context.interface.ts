import { IAdmin, ILoginCredentials } from '@sonrisa/core';

export interface IAuthContext {
  admin: IAdmin;
  isLoggedIn: boolean;
  logUserIn: (credentials: ILoginCredentials) => Promise<boolean>;
  logUserOut: () => Promise<boolean>;
  verifyUserToken: (user: IAdmin) => Promise<boolean>;
}
