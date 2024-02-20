export function convertTo12Hour(time) {
  const [hour, minute] = time.split(':');
  let newHour = hour % 12 || 12;
  const period = hour >= 12 ? 'PM' : 'AM';
  return `${newHour}:${minute} ${period}`;
}

export function convertTo24Hour(time) {
  const [hourMinute, period] = time.split(' ');
  const [hour, minute] = hourMinute.split(':');
  let newHour = hour;
  if (period.toLowerCase() === 'pm' && hour !== '12') {
    newHour = parseInt(hour, 10) + 12;
  } else if (period.toLowerCase() === 'am' && hour === '12') {
    newHour = '00';
  }
  return `${newHour}:${minute}:00`;
}


export function checkOpenStatus(post) {
  const currentTime = new Date();
  const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const openTime = new Date(`${currentTime.toDateString()} ${convertTo24Hour(post.acf[`${currentDay}_open`])}`);
  let closeTime = new Date(`${currentTime.toDateString()} ${convertTo24Hour(post.acf[`${currentDay}_close`])}`);

  // If closeTime is before openTime, add a day to closeTime
  if (closeTime.getTime() < openTime.getTime()) {
    closeTime = new Date(closeTime.getTime() + 24 * 60 * 60 * 1000);
  }

  if (currentTime >= openTime && currentTime <= closeTime) {
    return {
      isOpen: true,
      currentOpenTime: convertTo12Hour(post.acf[`${currentDay}_open`]),
      currentCloseTime: convertTo12Hour(post.acf[`${currentDay}_close`]),
    };
  } else {
    // Calculate the next open day and time
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let nextDayIndex = (currentTime.getDay() + 1) % 7;
    while (post.acf[`${daysOfWeek[nextDayIndex]}_open`] === undefined) {
      nextDayIndex = (nextDayIndex + 1) % 7;
    }
    return {
      isOpen: false,
      nextOpenTime: convertTo12Hour(post.acf[`${daysOfWeek[nextDayIndex]}_open`]),
    };
  }
}


export function checkMarkerStatus(location) {
  const currentTime = new Date();
  const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const openTime = new Date(`${currentTime.toDateString()} ${convertTo24Hour(location.acf[`${currentDay}_open`])}`);
  let closeTime = new Date(`${currentTime.toDateString()} ${convertTo24Hour(location.acf[`${currentDay}_close`])}`);

  // If closeTime is before openTime, add a day to closeTime
  if (closeTime.getTime() < openTime.getTime()) {
    closeTime = new Date(closeTime.getTime() + 24 * 60 * 60 * 1000);
  }

  if (currentTime >= openTime && currentTime <= closeTime) {
    return {
      isOpen: true,
      currentOpenTime: convertTo12Hour(location.acf[`${currentDay}_open`]),
      currentCloseTime: convertTo12Hour(location.acf[`${currentDay}_close`]),
    };
  } else {
    // Calculate the next open day and time
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let nextDayIndex = (currentTime.getDay() + 1) % 7;
    while (location.acf[`${daysOfWeek[nextDayIndex]}_open`] === undefined) {
      nextDayIndex = (nextDayIndex + 1) % 7;
    }
    return {
      isOpen: false,
      nextOpenTime: convertTo12Hour(location.acf[`${daysOfWeek[nextDayIndex]}_open`]),
    };
  }
}