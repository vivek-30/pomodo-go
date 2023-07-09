const calculateEstimatedTime = (time, focusTime, taskData) => {
  const roundsLeft = taskData.totalRounds - taskData.completedRounds;
  const estimatedMinutesForLeftRounds = focusTime.hours * 60 + focusTime.minutes + Math.round(focusTime.seconds/60);
  const estimatedMinutesForCurrentRounds = time.hours * 60 + time.minutes + Math.round(time.seconds/60);
  const computedValue = (estimatedMinutesForLeftRounds * (roundsLeft - 1) + estimatedMinutesForCurrentRounds);

  return computedValue;
}

export default calculateEstimatedTime;
