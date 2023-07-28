export const trimText = (str: string, maxLength: number = 20) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};
