export default function removeEmptyObjects(obj: any): object {
  const cleanObj = obj;
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      if (Object.keys(obj[key]).length === 0 && !(obj[key] instanceof Date)) {
        delete cleanObj[key];
      }
    }
  });

  return cleanObj;
}
