import { format, parseISO } from "date-fns";

const BG_DATE_FORMAT = "dd.MM.yyyy";
const BG_DATETIME_FORMAT = "dd.MM.yyyy HH:mm";
const BG_DATETIME_SUFFIX_FORMAT = "dd.MM.yyyy г. HH:mm ч.";
const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

export const isIsoDateString = (value: any): boolean => {
  return value && typeof value === "string" && ISO_DATE_FORMAT.test(value);
};

export const isDate = (date: any) => {
  if (date === null || date === undefined || typeof date !== "string") return false;

  const parsed = new Date(date);
  return parsed.toString() !== "Invalid Date" && !isNaN(parsed as unknown as number);
};

export const handleDates = (body: any) => {
  if (body === null || body === undefined || typeof body !== "object") return body;

  for (const key of Object.keys(body)) {
    const value = body[key];

    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === "object") handleDates(value);
  }
};

export const stringifyToIsoDate = (body: any): any => {
  const newBody = { ...body };

  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) return body;

  for (const key of Object.keys(newBody)) {
    const value = newBody[key];

    if (value instanceof Date) newBody[key] = (value as Date).toISOString();
    else if (typeof value === "object") newBody[key] = stringifyToIsoDate(value);
  }

  return newBody;
};

export const fixParsedDates = (body: any) => {
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) return body;

  for (const key of Object.keys(body)) {
    const value = body[key];

    if (isDate(value)) body[key] = new Date(Date.parse(value.toString()));
    else if (typeof value === "object") fixParsedDates(value);
  }
};

export const dateToStringShort = (date?: Date): string => {
  return date ? format(date, BG_DATE_FORMAT) : "";
};

export const dateToStringLong = (date?: Date): string => {
  return date ? format(date, BG_DATETIME_FORMAT) : "";
};

export const dateToStringLongSuffix = (date?: Date): string => {
  return date ? format(date, BG_DATETIME_SUFFIX_FORMAT) : "";
};
