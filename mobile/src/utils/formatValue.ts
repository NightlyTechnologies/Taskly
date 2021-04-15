type FormatValue = (value: string) => string;

const formatValue: FormatValue = value => {
  try {
    return Number(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/\d(?=(\d{3})+,)/g, '$&.');
  } catch (err) {
    return '';
  }
};

export default formatValue;
