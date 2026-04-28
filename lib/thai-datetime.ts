const THAI_LOCALE = "th-TH";
const THAI_TIME_ZONE = "Asia/Bangkok";

type DateInput = string | number | Date;

const thaiDateKeyFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: THAI_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const thaiDateTimeInputFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: THAI_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const toDate = (value: DateInput) => (value instanceof Date ? value : new Date(value));

export const formatThaiDateTime = (
  value: DateInput,
  options: Intl.DateTimeFormatOptions = {},
) =>
  new Intl.DateTimeFormat(THAI_LOCALE, {
    timeZone: THAI_TIME_ZONE,
    ...options,
  }).format(toDate(value));

export const getThaiDateKey = (value: DateInput) => {
  const parts = thaiDateKeyFormatter.formatToParts(toDate(value));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
};

export const isSameThaiDay = (left: DateInput, right: DateInput) => getThaiDateKey(left) === getThaiDateKey(right);

export const toThaiDateTimeLocalValue = (value: DateInput) => {
  const parts = thaiDateTimeInputFormatter.formatToParts(toDate(value));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;

  return `${year}-${month}-${day}T${hour}:${minute}`;
};
