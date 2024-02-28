import moment from 'moment-timezone';

let cachedTimeZone = null;

export function checkTime() {
  // Get the current hour in the client's timezone
  if (!cachedTimeZone) {
    cachedTimeZone = typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';
  }
  const currentHour = moment().tz(cachedTimeZone).hour();

  // Check if the current hour is between 6 and 16
  const isDay = currentHour >= 6 && currentHour < 16;
  return isDay;
}