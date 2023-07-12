const calculateEstimatedTime = (time, focusTime, taskData) => {
  const remainingRounds = taskData.totalRounds - taskData.completedRounds;
  if(remainingRounds === 0) {
    return 0;
  }

  const estimatedMinutesForRemainingRounds = focusTime.hours * 60 + focusTime.minutes + Math.round(focusTime.seconds/60);
  const estimatedMinutesForCurrentRounds = time.hours * 60 + time.minutes + Math.round(time.seconds/60);
  const computedValue = (estimatedMinutesForRemainingRounds * (remainingRounds - 1) + estimatedMinutesForCurrentRounds);

  return computedValue;
}

export default calculateEstimatedTime;
