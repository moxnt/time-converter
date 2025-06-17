import zones from "./zones.json";

const MINUTE_S = 60;
const HOUR_S = MINUTE_S * 60;

export type valid_tz = typeof zones;

export function tz_difference_s(timezone: keyof valid_tz = "UTC") {
  let raw = zones[timezone];
  if (raw == null) {
    return -1;
  }
  let multiplier = raw[0] === "+" ? 1 : -1;
  let parts = raw.split(" ")[0].slice(1).split(":");
  let hours: number = +parts[0];
  let minutes: number = +parts[1];
  return multiplier * (hours * HOUR_S + minutes * MINUTE_S);
}
