export const FIELD_NAMES = [
  "minute",
  "hour",
  "dayOfMonth",
  "month",
  "dayOfWeek",
];

export const FIELD_LABELS = {
  minute: "분 (Minute)",
  hour: "시 (Hour)",
  dayOfMonth: "일 (Day Of Month)",
  month: "월 (Month)",
  dayOfWeek: "요일 (Day Of Week)",
};

export const FIELD_RANGES = {
  minute: { min: 0, max: 59, label: "분" },
  hour: { min: 0, max: 23, label: "시" },
  dayOfMonth: { min: 1, max: 31, label: "일" },
  month: { min: 1, max: 12, label: "월" },
  dayOfWeek: { min: 0, max: 6, label: "요일" },
};

export const MONTH_NAMES = [
  "",
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export const FIELD_TYPES = {
  EVERY: "every", // *
  SPECIFIC: "specific", // 1,3,5
  RANGE: "range", // 1-5
  STEP: "step", // */5 또는 1-10/2
};

export const DEFAULT_CRON = {
  minute: "*",
  hour: "*",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "*",
};
