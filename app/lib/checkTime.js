export function checkTime() {
  const isDay = new Date().getHours() < 18;
  return isDay;
}
