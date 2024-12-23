// eslint-disable-next-line import/prefer-default-export
export const getObjectByKey = (array: Array<{ key: string }>, key: string) => {
  return array.find((setting) => setting.key === key) ?? null;
};
