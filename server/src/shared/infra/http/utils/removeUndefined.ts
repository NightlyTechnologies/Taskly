export default function removeUndefined(obj: any) {
  const filtered = obj;
  Object.keys(filtered).forEach((key) => {
    if (filtered[key] && typeof filtered[key] === 'object') removeUndefined(filtered[key]);
    else if (filtered[key] === undefined) delete filtered[key];
  });
  return filtered;
}
