import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateType } from "rndtpkr";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDate(d: DateType): Date {
  if (!d) return new Date();
  if (d instanceof Date) return d;
  if (typeof d === "string" || typeof d === "number") return new Date(d);
  if ("toDate" in d) return d.toDate();
  return new Date();
}

export function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
