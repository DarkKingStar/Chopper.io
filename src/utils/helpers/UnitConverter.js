export function SecondstoTime(totalSeconds){
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = parseInt(totalSeconds % 60);
  minutes = minutes<10 ? "0"+minutes : minutes;
  hours = hours<10 ? "0"+hours : hours;
  seconds = seconds<10? "0"+seconds : seconds;
  if(hours!=0){
    return `${hours}:${minutes}:${seconds}`;
  }else{
    return `${minutes}:${seconds}`;
  }
}
