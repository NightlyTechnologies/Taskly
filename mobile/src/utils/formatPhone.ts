type FormatPhone = (phone: string) => string;

const formatPhone: FormatPhone = phone => {
  try {
    return phone
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  } catch (err) {
    return '';
  }
};

export default formatPhone;
