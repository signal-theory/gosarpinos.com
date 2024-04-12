
import moment from 'moment-timezone';

export function checkTime() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentHour = moment().tz(timeZone).hour();
  // console.log('timeZone', timeZone);

  const serverTimezone = moment.tz.guess();
  // console.log('Server timezone:', serverTimezone);

  const isDay = currentHour >= 6 && currentHour < 16;
  // console.log('currentHour', currentHour);
  // console.log('isDay', isDay);

  return isDay;
}