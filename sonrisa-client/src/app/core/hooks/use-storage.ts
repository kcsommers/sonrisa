const STORAGE_PREFIX = '__son__';

const storageKeys = {
  ORDER_NUMBER: STORAGE_PREFIX + 'order_number',
};

export interface IStorageHook {
  setSessionItem: (key: string, value: any) => void;

  getSessionItem: (key: string) => string | null;

  storageKeys: typeof storageKeys;
}

export const useStorage = (): IStorageHook => {
  const setSessionItem = (key: string, value: any): void => {
    sessionStorage.setItem(key, value);
  };

  const getSessionItem = (key: string): string | null => {
    return sessionStorage.getItem(key);
  };

  return { setSessionItem, getSessionItem, storageKeys };
};
