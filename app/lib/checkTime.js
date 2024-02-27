import moment from 'moment-timezone';

export function checkTime() {
  // Check if document is defined
  if (typeof document === 'undefined') {
    return;
  }

  // Get a reference to the root element
  const mainElement = document.querySelector('.timeofday-background-color');
  const overlayElement = document.querySelector('.timeofday-overlay');

  // Get the current hour in the client's timezone
  const clientTimeZone = typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';
  const currentHour = moment().tz(clientTimeZone).hour();

  // Check if the current hour is between 6 and 16
  const isDay = currentHour >= 6 && currentHour < 16;

  // Set the value of the --timeofdayBkg variable based on isDay
  if (mainElement) {
    if (isDay) {
      mainElement.classList.remove('night');
      mainElement.classList.add('day');
    } else {
      mainElement.classList.remove('day');
      mainElement.classList.add('night');
    }
  }
  if (overlayElement) {
    if (isDay) {
      overlayElement.classList.remove('night');
      overlayElement.classList.add('day');
    } else {
      overlayElement.classList.remove('day');
      overlayElement.classList.add('night');
    }
  }

  console.log('isDay', isDay);
  return isDay;
}