import { tz_difference_s, type valid_tz } from "./modules/timezones";

export class Config {
  timezone: string;
  alarm_time: number;

  constructor(timezone = "UTC", alarm_time = 0) {
    this.timezone = timezone;
    this.alarm_time = alarm_time;
  }

  static store_alarm_time(time_uts: number) {
    localStorage.setItem("alarm_time", time_uts.toString());
  }

  static store_timezone(timezone: string) {
    localStorage.setItem("timezone", timezone);
  }

  store() {
    localStorage.setItem("alarm_time", this.alarm_time.toString());
    localStorage.setItem("timezone", this.timezone);
  }

  fetch() {
    let alarm_time = localStorage.getItem("alarm_time");
    if (alarm_time !== null) {
      this.alarm_time = +alarm_time;
    }
    this.timezone = localStorage.getItem("timezone") ?? "UTC";
  }
}

export let config = new Config();

let controls = document.querySelectorAll("[data-controls-id]");
controls.forEach((element) => {
  element.addEventListener("click", () => {
    config.fetch();

    document.querySelectorAll("#timezone-field").forEach((element) => {
      element.innerHTML = config.timezone;
    });

    let previous = document.getElementsByClassName("active");
    let previousControl = document.getElementsByClassName("selected");
    let next = document.getElementById(
      element.getAttribute("data-controls-id") ?? "tab1",
    );

    previous.item(0)?.classList.remove("active");
    previousControl.item(0)?.classList.remove("selected");

    next?.classList.add("active");
    element.classList.add("selected");
  });
});

document.getElementById("input-alarm")?.addEventListener("change", (event) => {
  let e = event.target as HTMLInputElement;
  let split = e.value.split(":");
  let parsed_time = 0;
  parsed_time += +split[0] * 3600;
  parsed_time += +split[1] * 60;
  parsed_time += +(split[2] ?? 0);
  Config.store_alarm_time(parsed_time);
});

document
  .getElementById("input-timezone")
  ?.addEventListener("input", (event) => {
    let e = event.target as HTMLInputElement;
    if (tz_difference_s(e.value as keyof valid_tz) !== -1) {
      Config.store_timezone(e.value);
    }
  });
