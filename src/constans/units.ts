export const units = [
  { name: "°C", value: "metric" },
  { name: "°F", value: "imperial" },
] as const;

export type Unit = (typeof units)[number];
