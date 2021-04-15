type UpperCaseFirstLetter = (text: string) => string;

const upperCaseFirstLetter: UpperCaseFirstLetter = text => {
  return text.toLowerCase().replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};

export default upperCaseFirstLetter;
