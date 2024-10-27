import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatToLocalTime(isoDate: string) {
    if (!isoDate) {
        return "";
    }
    const date = new Date(isoDate);

    // Get the local date in YYYY-MM-DDTHH:mm format
    const localDateString = date.toLocaleString('sv', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: false,
    });

    return localDateString.slice(0, 16); // Truncate to YYYY-MM-DDTHH:mm
}
