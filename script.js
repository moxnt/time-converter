import timeZoneAbbreviations from './tza.js';

function change(elmentID, newInnerHtml) {
  document.getElementById(elmentID).innerHTML = newInnerHtml;
}

function dailyToSeconds(dailyTime) {
  return (dailyTime.hours * HOUR_S + dailyTime.minutes * MINUTE_S + dailyTime.seconds)
}

function convertDailyTime(dailyTime) {
  const hours = Math.floor(dailyTime / HOUR_S);
  const minutes = Math.floor((dailyTime - (hours * HOUR_S)) / 60);
  const seconds = Math.floor((dailyTime - (hours * HOUR_S) - (minutes * 60)));
  if (hours >= 24) {
    return {
      hours: hours - 24,
      minutes: minutes,
      seconds: seconds,
    }
  } else if (hours < 0) {
    return {
      hours: hours + 24,
      minutes: minutes,
      seconds: seconds,
    }
  } else {
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }
}

function twoDigitNumber(unknownNumber) {
  if (`${unknownNumber}`.length < 2) {
    return `0${unknownNumber}`;
  }
  return unknownNumber;
}
// Units measured in other units (HOUR_S -> Hour in seconds)
const HOUR_S = 3600
const MINUTE_S = 60
const SECOND_MS = 1000
const MIDNIGHT_S = HOUR_S * 24;

let timeDifferenceSeconds = -2 * -1 * HOUR_S;
let targetTime = convertDailyTime(MIDNIGHT_S);
let targetTimeSeconds = MIDNIGHT_S;

document.getElementById("zoneinput").addEventListener("input", tryUpdateTimezone)
document.getElementById("timeinput").addEventListener("input", tryUpdateTargetTime)

window.setInterval(update, 1000)

function update() {

  const currentUnixTimeSeconds = Math.ceil(Date.now() / SECOND_MS);
  const passedSeconds = currentUnixTimeSeconds % (HOUR_S * 24) + timeDifferenceSeconds;
  const timeNow = convertDailyTime(passedSeconds);

  change("current-time", `${twoDigitNumber(timeNow.hours)}:${twoDigitNumber(timeNow.minutes)}:${twoDigitNumber(timeNow.seconds)}`)
  change("countdown", `${twoDigitNumber(targetTime.hours)}:${twoDigitNumber(targetTime.minutes)}`)


  if (targetTimeSeconds > passedSeconds) {
    const remainingTimeSeconds = targetTimeSeconds - passedSeconds;
    const remainingTime = convertDailyTime(remainingTimeSeconds);
    change("hours", `${remainingTime.hours} hours`);
    change("minutes", `${remainingTime.minutes} minutes`);
    change("seconds", `${remainingTime.seconds} seconds`);
  } else {

    const remainingTimeSeconds = targetTimeSeconds - passedSeconds + (24 * HOUR_S);
    const remainingTime = convertDailyTime(remainingTimeSeconds);
    change("hours", `${remainingTime.hours} hours`);
    change("minutes", `${remainingTime.minutes} minutes`);
    change("seconds", `${remainingTime.seconds} seconds`);
  }
}


function tryUpdateTargetTime() {
  const ti = document.getElementById("timeinput");
  const splitTime = ti.value.split(":");
  targetTime = {
    hours: Number(splitTime[0]),
    minutes: Number(splitTime[1]),
    seconds: 0,
  }
  targetTimeSeconds = dailyToSeconds(targetTime)
}

function tryUpdateTimezone() {
  const zoneID = document.getElementById("zoneinput").value;

  let zone = timeZoneAbbreviations.abberviations[zoneID];

  if (zone !== undefined) {
    change("timezone0", zoneID);
    change("timezone1", zoneID);
  } else {
    zone = "-2:00"
  }

  const part1 = zone.split(':');
  let part2 = (part1[0] === undefined) ? "-2" : part1[0];

  if (part2[0] === "−") {
    part2 = part2.slice(1, part2.length); //removes the first character
    timeDifferenceSeconds = Number(part2) * HOUR_S * -1
  } else {
    timeDifferenceSeconds = Number(part2) * HOUR_S
  }
}
