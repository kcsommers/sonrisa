const STORAGE_PREFIX = '__son__';

const storageKeys = {
  ORDER_NUMBER: STORAGE_PREFIX + 'order_number',
  ADMIN: STORAGE_PREFIX + 'admin',
};

export interface IStorageHook {
  setSessionItem: (key: string, value: any) => void;
  getSessionItem: (key: string) => string | null;
  storageKeys: typeof storageKeys;
  setStorageItem: (key: string, value: any) => void;
  getStorageItem: (key: string) => string | null;
}

export const useStorage = (): IStorageHook => {
  const setSessionItem = (key: string, value: any): void => {
    sessionStorage.setItem(key, value);
  };

  const getSessionItem = (key: string): string | null => {
    return sessionStorage.getItem(key);
  };

  const setStorageItem = (key: string, value: any): void => {
    localStorage.setItem(key, value);
  };

  const getStorageItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  return {
    setSessionItem,
    getSessionItem,
    storageKeys,
    getStorageItem,
    setStorageItem,
  };
};
