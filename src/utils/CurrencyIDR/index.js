export const CurrencyIDR = (value) => {
  let number = Number(value);
  return number?.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};
