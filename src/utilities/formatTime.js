const formatTime = ({ hours, minutes, seconds }) => {
  let formatedTime = '';
  if(hours) {
    formatedTime += hours < 10  ? ('0' + hours) : hours;
    formatedTime += ':'
  }

  formatedTime = `
    ${formatedTime}${minutes < 10 ? ('0' + minutes) : minutes}:${seconds < 10 ? ('0' + seconds) : seconds}
  `;

  return formatedTime;
}

export default formatTime;
