export function formatRelativeTime(timestampInMs: number) {
  const timestampInSeconds = Math.floor(Number(timestampInMs) / 1000); // Convert ms to seconds
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const diffInSeconds = now - timestampInSeconds; // Positive if past, negative if future

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000; // Approx 30 days
  const secondsInYear = 31536000; // Approx 365 days

  // Handle future timestamps (negative difference)
  const isFuture = diffInSeconds < 0;
  const absDiff = Math.abs(diffInSeconds); // Use absolute difference for calculations
  const prefix = isFuture ? "in " : "";
  const suffix = isFuture ? "" : " ago";

  if (absDiff < secondsInMinute) {
    return `${prefix}${absDiff} second${absDiff !== 1 ? "s" : ""}${suffix}`;
  } else if (absDiff < secondsInHour) {
    const minutes = Math.floor(absDiff / secondsInMinute);
    return `${prefix}${minutes} minute${minutes !== 1 ? "s" : ""}${suffix}`;
  } else if (absDiff < secondsInDay) {
    const hours = Math.floor(absDiff / secondsInHour);
    return `${prefix}${hours} hour${hours !== 1 ? "s" : ""}${suffix}`;
  } else if (absDiff < secondsInMonth) {
    const days = Math.floor(absDiff / secondsInDay);
    return `${prefix}${days} day${days !== 1 ? "s" : ""}${suffix}`;
  } else if (absDiff < secondsInYear) {
    const months = Math.floor(absDiff / secondsInMonth);
    return `${prefix}${months} month${months !== 1 ? "s" : ""}${suffix}`;
  } else {
    const years = Math.floor(absDiff / secondsInYear);
    return `${prefix}${years} year${years !== 1 ? "s" : ""}${suffix}`;
  }
}
