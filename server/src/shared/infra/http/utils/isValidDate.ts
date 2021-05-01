export default function isValidDate(date: Date) {
  const todayString = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Sao_Paulo',
  });
  const today = new Date(todayString);

  return date.getTime() < today.getTime();
}
