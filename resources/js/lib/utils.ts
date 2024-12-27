import { type ClassValue, clsx } from "clsx";
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
    if (!log) return "";
    if (!isLongRunningLog(log)) {
        return format(new Date(log.started_at), "E. HH:mm");
    }

    return `${format(log.started_at, "E. HH:mm")} ${log.ended_at ? format(log.ended_at, "- HH:mm") : ""}`;
}

export function displayLongRunningLogDuration(log: Log) {
    if (!isLongRunningLog(log)) {
        return "";
    }
    const startedAt = new Date(log.started_at);
    const endedAt = log.ended_at ? new Date(log.ended_at) : new Date();

    const duration = intervalToDuration({ start: startedAt, end: endedAt });
    const hours = duration.hours?.toString().padStart(2, "0") || "00";
    const minutes = duration.minutes?.toString().padStart(2, "0") || "00";
    const seconds = duration.seconds?.toString().padStart(2, "0") || "00";

    return `${hours}:${minutes}:${seconds}`;
}

export function displayTimeSinceEnded(log: Log) {
    if (!log) return "";
    const endedAt = log.ended_at ? new Date(log.ended_at) : new Date();

    const duration = intervalToDuration({ start: endedAt, end: new Date() });
    const hours = duration.hours?.toString().padStart(2, "0") || "00";
    const minutes = duration.minutes?.toString().padStart(2, "0") || "00";
    const seconds = duration.seconds?.toString().padStart(2, "0") || "00";

    return `${hours}:${minutes}:${seconds}`;
}

export function getMinutesSlept(logs: SleepLog[]) {
    return logs.reduce((acc: number, log: SleepLog) => {
        const start = max([startOfToday(), new Date(log.started_at)]);
        const end = log.ended_at ? new Date(log.ended_at) : new Date();
        acc += differenceInMinutes(end, start);
        return acc;
    }, 0);
}
