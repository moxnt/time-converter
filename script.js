function change(elmentID, newInnerHtml) {
  document.getElementById(elmentID).innerHTML = newInnerHtml;
}

function convertDailyTime(dailyTime) {
  console.log(dailyTime)

  const hours = Math.floor(dailyTime / HOUR_S);
  const minutes = Math.floor((dailyTime - (hours * HOUR_S)) / 60);
  const seconds = Math.floor((dailyTime - (hours * HOUR_S) - (minutes * 60)));

  return {
    hours: (hours >= 24) ? hours - 24 : hours,
    minutes: minutes,
    seconds: seconds,
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

let timeDifferenceSeconds = -2 * -1 * HOUR_S;

document.getElementById("zoneinput").addEventListener("input", tryUpdateTimezone)

window.setInterval(update, 1000)

function update() {
  const currentUnixTimeSeconds = Math.ceil(Date.now() / SECOND_MS);


  const passedSeconds = currentUnixTimeSeconds % (HOUR_S * 24) + timeDifferenceSeconds;
  console.log(`TD seconds -> ${timeDifferenceSeconds}`)
  console.log(`Passed seconds -> ${passedSeconds}`)
  const timeNow = convertDailyTime(passedSeconds);

  change("current-time", `${twoDigitNumber(timeNow.hours)}:${twoDigitNumber(timeNow.minutes)}:${twoDigitNumber(timeNow.seconds)}`)

  const targetTimeSeconds = HOUR_S * 24;
  const targetTime = convertDailyTime(targetTimeSeconds);
  if (targetTime.seconds === 0) {
    change("countdown", `${twoDigitNumber(targetTime.hours)}:${twoDigitNumber(targetTime.minutes)}`)
  } else {
    change("countdown", `${twoDigitNumber(targetTime.hours)}:${twoDigitNumber(targetTime.minutes)}:${twoDigitNumber(targetTime.seconds)}`)
  }

  if (targetTimeSeconds > passedSeconds) {
    const remainingTimeSeconds = targetTimeSeconds - passedSeconds;
    const remainingTime = convertDailyTime(remainingTimeSeconds);
    change("hours", `${remainingTime.hours} hours`);
    change("minutes", `${remainingTime.minutes} minutes`);
    change("seconds", `${remainingTime.seconds} seconds`);
  }
}

function tryUpdateTimezone() {
  const zones = {
    "ACDT": "+10:30",
    "ACST": "+09:30",
    "ACT": "-5:00",
    "ACWST": "+08:45",
    "ADT": "−03:00",
    "AEDT": "+11:00",
    "AEST": "+10:00",
    "AET (AEST/AEDT)": "+10:00 / UTC+11:00",
    "AFT": "+04:30",
    "AKDT": "−08:00",
    "AKST": "−09:00",
    "ALMT": "+06:00",
    "AMST": "−03:00",
    "AMT": "−04:00",
    "ANAT": "+12:00",
    "AQTT": "+05:00",
    "ART": "−03:00",
    "AST": "+03:00",
    "AWST": "+08:00",
    "AZOST": "+00:00",
    "AZOT": "−01:00",
    "AZT": "+04:00",
    "BNT": "+08:00",
    "BIOT": "+06:00",
    "BIT": "−12:00",
    "BOT": "−04:00",
    "BRST": "−02:00",
    "BRT": "−03:00",
    "BST": "+06:00",
    "BTT": "+06:00",
    "CAT": "+02:00",
    "CCT": "+06:30",
    "CDT": "−05:00",
    "CEST": "+02:00",
    "CET": "+01:00",
    "CHADT": "+13:45",
    "CHAST": "+12:45",
    "CHOT": "+08:00",
    "CHOST": "+09:00",
    "CHST": "+10:00",
    "CHUT": "+10:00",
    "CIST": "−08:00",
    "CKT": "−10:00",
    "CLST": "−03:00",
    "CLT": "−04:00",
    "COST": "−04:00",
    "COT": "−05:00",
    "CST": "−06:00",
    "CT (CST/CDT)": "−06:00 / UTC−05:00",
    "CVT": "−01:00",
    "CWST": "+08:45",
    "CXT": "+07:00",
    "DAVT": "+07:00",
    "DDUT": "+10:00",
    "DFT": "+01:00",
    "EASST": "−05:00",
    "EAST": "−06:00",
    "EAT": "+03:00",
    "ECT": "−04:00",
    "EDT": "−04:00",
    "EEST": "+03:00",
    "EET": "+02:00",
    "EGST": "+00:00",
    "EGT": "−01:00",
    "EST": "−05:00",
    "ET (EST/EDT)": "−05:00 / UTC−04:00",
    "FET": "+03:00",
    "FJT": "+12:00",
    "FKST": "−03:00",
    "FKT": "−04:00",
    "FNT": "−02:00",
    "GALT": "−06:00",
    "GAMT": "−09:00",
    "GET": "+04:00",
    "GFT": "−03:00",
    "GILT": "+12:00",
    "GIT": "−09:00",
    "GMT": "+00:00",
    "GST": "−02:00",
    "GYT": "−04:00",
    "HDT": "−09:00",
    "HAEC": "+02:00",
    "HST": "−10:00",
    "HKT": "+08:00",
    "HMT": "+05:00",
    "HOVST": "+08:00",
    "HOVT": "+07:00",
    "ICT": "+07:00",
    "IDLW": "−12:00",
    "IDT": "+03:00",
    "IOT": "+06:00",
    "IRDT": "+04:30",
    "IRKT": "+08:00",
    "IRST": "+03:30",
    "IST": "+05:30",
    "JST": "+09:00",
    "KALT": "+02:00",
    "KGT": "+06:00",
    "KOST": "+11:00",
    "KRAT": "+07:00",
    "KST": "+09:00",
    "LHST": "+10:30",
    "LINT": "+14:00",
    "MAGT": "+12:00",
    "MART": "−09:30",
    "MAWT": "+05:00",
    "MDT": "−06:00",
    "MET": "+01:00",
    "MEST": "+02:00",
    "MHT": "+12:00",
    "MIST": "+11:00",
    "MIT": "−09:30",
    "MMT": "+06:30",
    "MSK": "+03:00",
    "MST": "+08:00",
    "MT (MST/MDT)": "−07:00 / UTC−06:00",
    "MUT": "+04:00",
    "MVT": "+05:00",
    "MYT": "+08:00",
    "NCT": "+11:00",
    "NDT": "−02:30",
    "NFT": "+11:00",
    "NOVT": "+07:00",
    "NPT": "+05:45",
    "NST": "−03:30",
    "NT": "−03:30",
    "NUT": "−11:00",
    "NZDT": "+13:00",
    "NZDST[10]": "+13:00",
    "NZST": "+12:00",
    "OMST": "+06:00",
    "ORAT": "+05:00",
    "PDT": "−07:00",
    "PET": "−05:00",
    "PETT": "+12:00",
    "PGT": "+10:00",
    "PHOT": "+13:00",
    "PHT": "+08:00",
    "PHST": "+08:00",
    "PKT": "+05:00",
    "PMDT": "−02:00",
    "PMST": "−03:00",
    "PONT": "+11:00",
    "PST": "−08:00",
    "PT (PST/PDT)": "−08:00 / UTC−07:00",
    "PWT": "+09:00",
    "PYST": "−03:00",
    "PYT": "−04:00",
    "RET": "+04:00",
    "ROTT": "−03:00",
    "SAKT": "+11:00",
    "SAMT": "+04:00",
    "SAST": "+02:00",
    "SBT": "+11:00",
    "SCT": "+04:00",
    "SDT": "−10:00",
    "SGT": "+08:00",
    "SLST": "+05:30",
    "SRET": "+11:00",
    "SRT": "−03:00",
    "SST": "−11:00",
    "SYOT": "+03:00",
    "TAHT": "−10:00",
    "THA": "+07:00",
    "TFT": "+05:00",
    "TJT": "+05:00",
    "TKT": "+13:00",
    "TLT": "+09:00",
    "TMT": "+05:00",
    "TRT": "+03:00",
    "TOT": "+13:00",
    "TST": "+08:00",
    "TVT": "+12:00",
    "ULAST": "+09:00",
    "ULAT": "+08:00",
    "UTC": "+00:00",
    "UYST": "−02:00",
    "UYT": "−03:00",
    "UZT": "+05:00",
    "VET": "−04:00",
    "VLAT": "+10:00",
    "VOLT": "+03:00",
    "VOST": "+06:00",
    "VUT": "+11:00",
    "WAKT": "+12:00",
    "WAST": "+02:00",
    "WAT": "+01:00",
    "WEST": "+01:00",
    "WET": "+00:00",
    "WIB": "+07:00",
    "WIT": "+09:00",
    "WITA": "+08:00",
    "WGST": "−02:00",
    "WGT": "−03:00",
    "WST": "+08:00",
    "YAKT": "+09:00",
    "YEKT": "+05:00"
  }

  const zoneID = document.getElementById("zoneinput").value;

  let zone = zones[zoneID];

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
    timeDifferenceSeconds = Number(part2) * HOUR_S
  } else {
    timeDifferenceSeconds = Number(part2) * -1 * HOUR_S
  }
}
