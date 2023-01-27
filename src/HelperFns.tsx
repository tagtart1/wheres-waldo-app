// Helper functions for where's waldo app project

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

export { getSecondsFromTime };
