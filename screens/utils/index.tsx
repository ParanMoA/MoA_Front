export const DateAutoFormat = (Date: string): string => {
  const date = Date.trim().replace(/[^0-9]/g, '');

  if (date.length < 4) return date;
  if (date.length < 7) return date.replace(/(\d{4})(\d{1})/, '$1-$2');
  if (date.length < 11)
    return date.replace(/(\d{4})(\d{2})(\d{1})/, '$1-$2-$3');
  return date.replace(/(\d{4})(\da{2})(\d{2})/, '$1-$2-$3');
};
