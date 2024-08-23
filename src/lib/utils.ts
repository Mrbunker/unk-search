import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** vercel 没有 node21，不支持 Object.groupBy */
export function groupBy<T, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T[]>;
export function groupBy<T, K>(
  array: T[],
  key: (item: T) => K
): Record<string, T[]>;
export function groupBy<T, K>(
  array: T[],
  key: keyof T | ((item: T) => K)
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = typeof key === "function" ? key(item) : item[key];
    const groupKeyStr = String(groupKey);

    if (!result[groupKeyStr]) {
      result[groupKeyStr] = [];
    }

    result[groupKeyStr].push(item);
    return result;
  }, {} as Record<string, T[]>);
}
