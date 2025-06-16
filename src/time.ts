export class Time {
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
