import { tz_difference_s } from "./modules/timezones.ts";

class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(unix_time_seconds: number) {
    const MIN_S = 60;
    const HOUR_S = MIN_S * 60;
    this.seconds = unix_time_seconds % MIN_S;
    this.minutes = Math.floor((unix_time_seconds % HOUR_S) / MIN_S);
    this.hours = Math.floor(unix_time_seconds / HOUR_S) % 24;
  }

  to_uts() {
    const MIN_S = 60;
    const HOUR_S = MIN_S * 60;

    return this.seconds + this.minutes * MIN_S + this.hours * HOUR_S;
  }

  log(what = "Time") {
    console.log(`${what} - ${this.hours} : ${this.minutes} : ${this.seconds}`);
  }

  until(other: Time) {
    const DAY_S = 60 * 60 * 24;
    return (
      DAY_S * (this.to_uts() > other.to_uts() ? 1 : 0) +
      other.to_uts() -
      this.to_uts()
    );
  }
}

class Config {
  timezone: string;
  alarm_time: Time;

  constructor(timezone = "UTC", alarm_time = new Time(0)) {
    this.timezone = timezone;
    this.alarm_time = alarm_time;
  }

  fetch() {
    return new Config(
      localStorage.getItem("timezone") ?? :,
      localStorage.getItem("alarm_time"),
    );
  }
}

function ensureFormat(s: number) {
  switch (s.toString().length) {
    case 1:
      return `0${s}`;
    case 2:
      return s.toString();

    default:
      return "99";
  }
}

function update_clock(time_difference: number) {
  let time = new Time(Math.floor(Date.now() / 1000) + time_difference);

  let element_h = document.getElementById("clock-h");
  let element_m = document.getElementById("clock-m");
  let element_s = document.getElementById("clock-s");
  if (element_h === null || element_m === null || element_s === null) {
    console.error("One or more clock element/s was not present");
    return;
  }
  element_h.innerText = ensureFormat(time.hours);
  element_m.innerText = ensureFormat(time.minutes);
  element_s.innerText = ensureFormat(time.seconds);
}

function update_alarm(time_difference: number) {
  let time = new Time(Math.floor(Date.now() / 1000) + time_difference);

  let element_h = document.getElementById("clock-h");
  let element_m = document.getElementById("clock-m");
  let element_s = document.getElementById("clock-s");
  if (element_h === null || element_m === null || element_s === null) {
    console.error("One or more clock element/s was not present");
    return;
  }
  element_h.innerText = ensureFormat(time.hours);
  element_m.innerText = ensureFormat(time.minutes);
  element_s.innerText = ensureFormat(time.seconds);
}

function update() {
  update_clock(0);
}

document.getElementById("thebutton")?.addEventListener("click", () => {
  let unix_seconds = Math.floor(Date.now() / 1000);
  let adjusted_now = new Time(unix_seconds + tz_difference_s("EEST"));
  let alarm = new Time(0);
  let until_alarm = new Time(adjusted_now.until(alarm));
  adjusted_now.log("In latvia it is");
  until_alarm.log("Until midnight");
});

window.setInterval(update, 1000);
