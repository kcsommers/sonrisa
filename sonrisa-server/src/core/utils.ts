import camelcaseKeys from 'camelcase-keys';

export const getCamelcaseKeys = <T>(data: any): T => {
  try {
    const _res = <T>camelcaseKeys(data, { deep: true });
    return _res;
  } catch (err) {
    return null;
  }
};
