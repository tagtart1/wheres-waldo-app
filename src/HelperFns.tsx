// Helper functions for where's waldo app project

// Takes a '00:00:00' formatted string and returns it as a number of time in seconds
const getSecondsFromTime = (formattedTime: string) => {
  const timeArray = formattedTime.split(":");
  const timeArrayNumbers: Array<number> = [];
  timeArray.forEach((time) => {
    timeArrayNumbers.push(Number(time));
  });

  const totalSeconds =
    timeArrayNumbers[2] +
    timeArrayNumbers[1] * 60 +
    timeArrayNumbers[0] * 60 * 60;

  return totalSeconds;
};
// Returns a string with hyphens and lowercases
const getLinkFriendlyString = (rawString: string) => {
  return rawString.replaceAll(" ", "-").toLocaleLowerCase();
};

export { getSecondsFromTime, getLinkFriendlyString };
