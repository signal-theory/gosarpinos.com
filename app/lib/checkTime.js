export function checkTime() {
  // Get the current hour
  const currentHour = new Date().getHours();
  // Check if the current hour is between 7 and 16
  const isDay = currentHour >= 6 && currentHour < 16;
  console.log('isDay:', isDay, ' currentHour:', currentHour);
  return isDay;
}
