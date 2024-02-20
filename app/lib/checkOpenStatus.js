export function checkOpenStatus(post) {
  const currentTime = new Date();
  const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const openTime = new Date(`1970-01-01T${post.acf[`${currentDay}_open`]}`);
  const closeTime = new Date(`1970-01-01T${post.acf[`${currentDay}_close`]}`);

  if (currentTime >= openTime && currentTime <= closeTime) {
    return {
      isOpen: true,
      currentOpenTime: post.acf[`${currentDay}_open`],
      currentCloseTime: post.acf[`${currentDay}_close`],
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
      nextOpenTime: post.acf[`${daysOfWeek[nextDayIndex]}_open`],
    };
  }
}