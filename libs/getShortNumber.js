export const getShortNumber = (num) => {
  function intlFormat(num) {
    return new Intl.NumberFormat().format(Math.floor(num * 10) / 10);
  }

  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  if (num <= 999) return num;
};
