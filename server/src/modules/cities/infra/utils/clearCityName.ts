export default function clearCityName(name: string): string {
  const clearName = name
    .trim()
    .toLowerCase()
    .replace(/  */g, ' ')
    .replace(/--*/g, '-')
    .replace(/ ?- ?/g, '-')
    .replace(/[^A-ZÀ-Ú0-9 -]+/gi, '');

  return clearName;
}
