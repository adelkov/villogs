import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Log, { isLongRunningLog, SleepLog } from "@/types/Log";
import {
    differenceInMinutes,
    format,
    intervalToDuration,
    max,
    startOfToday,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatToLocalTime(isoDate: string) {
    if (!isoDate) {
        return "";
    }
    const date = new Date(isoDate);

    // Get the local date in YYYY-MM-DDTHH:mm format
    const localDateString = date.toLocaleString("sv", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: false,
    });

    return localDateString.slice(0, 16); // Truncate to YYYY-MM-DDTHH:mm
}

export function displayLogTime(log: Log) {
    console.log(log)
    if (!log) return "";
    if (!isLongRunningLog(log)) {
        return format(new Date(log.loggable.started_at), "E. HH:mm");
    }
    const startedAt = new Date(log.loggable.started_at);
    const endedAt = log.loggable.ended_at
        ? new Date(log.loggable.ended_at)
        : new Date();

    const duration = intervalToDuration({ start: startedAt, end: endedAt });
    const hours = duration.hours?.toString().padStart(2, "0") || "00";
    const minutes = duration.minutes?.toString().padStart(2, "0") || "00";
    const seconds = duration.seconds?.toString().padStart(2, "0") || "00";

    return `${format(startedAt, "E. HH:mm")}, ${hours}:${minutes}:${seconds}`;
}

export function displayLongRunningLogDuration(log: Log) {
    if (!isLongRunningLog(log)) {
        return "";
    }
    const startedAt = new Date(log.loggable.started_at);
    const endedAt = log.loggable.ended_at
        ? new Date(log.loggable.ended_at)
        : new Date();

    const duration = intervalToDuration({ start: startedAt, end: endedAt });
    const hours = duration.hours?.toString().padStart(2, "0") || "00";
    const minutes = duration.minutes?.toString().padStart(2, "0") || "00";
    const seconds = duration.seconds?.toString().padStart(2, "0") || "00";

    return `${hours}:${minutes}:${seconds}`;
}

export function getMinutesSlept(logs: SleepLog[]) {
    return logs.reduce((acc: number, log: SleepLog) => {
        const start = max([startOfToday(), new Date(log.loggable.started_at)]);
        const end = log.loggable.ended_at
            ? new Date(log.loggable.ended_at)
            : new Date();
        acc += differenceInMinutes(end, start);
        return acc;
    }, 0);
}
