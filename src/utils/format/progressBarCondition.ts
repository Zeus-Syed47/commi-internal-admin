export function checkTimeAndProgress(pastTimeString) {
  // Convert the past time string to a Date object
  const pastTime = new Date(pastTimeString);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference: any = currentTime - pastTime;

  // Convert the difference from milliseconds to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  // Check if the current date is 24 hours after the given date
  const is24HoursPassed = hoursDifference >= 24;

  // Calculate the progress (100% at 0 hours, 0% at 24 hours)
  const progress = Math.max(0, Math.min(100, (1 - hoursDifference / 24) * 100));

  return {
    is24HoursPassed,
    hoursDifference: hoursDifference.toFixed(2),
    progress: progress.toFixed(2),
    hoursFormat: Math.ceil(24 - hoursDifference.toFixed(2)),
  };
}
