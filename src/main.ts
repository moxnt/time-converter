import { tz_difference_s, type valid_tz } from "./modules/timezones.ts";
import { Time } from "./time.ts";
import { config } from "./tabs.ts";

// TODOS: Bypass TS map key checking
// Split the classes into different files?
// Fix the css for dark/light

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

function update_alarm(time_difference: number, alarm_time: number) {
  let time = new Time(
    new Time(Math.floor(Date.now() / 1000) + time_difference).until(
      new Time(alarm_time),
    ),
  );

  let element_h = document.getElementById("alarm-h");
  let element_m = document.getElementById("alarm-m");
  let element_s = document.getElementById("alarm-s");
  if (element_h === null || element_m === null || element_s === null) {
    console.error("One or more clock element/s was not present");
    return;
  }
  element_h.innerText = ensureFormat(time.hours);
  element_m.innerText = ensureFormat(time.minutes);
  element_s.innerText = ensureFormat(time.seconds);
}

function update() {
  update_clock(tz_difference_s(config.timezone as keyof valid_tz));
  update_alarm(
    tz_difference_s(config.timezone as keyof valid_tz),
    config.alarm_time,
  );
}

window.setInterval(update, 1000);
