type BaseLog = {
    id: number;
    baby_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    loggable_id: number;
    started_at: string;
    ended_at: string | null;
};

export type BreastfeedLog = BaseLog & {
    loggable_type: "App\\Models\\BreastFeedLog"
    loggable: {
        side: "left" | "right";
    }
};

export function isBreastfeedLog(log: Log): log is BreastfeedLog {
    if (!log) return false
    return log.loggable_type.includes("BreastFeedLog");
}

export type DiaperChangeLog = BaseLog & {
    loggable_type: "App\\Models\\DiaperChangeLog";
    loggable: {
        type: "pee" | "poop" | "both" | "empty";
    }
};

export function isDiaperChangeLog(log: Log): log is DiaperChangeLog {
    if (!log) return false
    return log.loggable_type.includes("DiaperChangeLog");
}

export type SleepLog = BaseLog & {
    loggable_type: "App\\Models\\SleepLog"
    loggable: {

    }
};

export function isSleepLog(log: Log): log is SleepLog {
    if (!log) return false
    return log.loggable_type.includes("SleepLog");
}

export function isLongRunningLog(log: Log): log is SleepLog {
    if (!log) return false
    return isSleepLog(log) || isBreastfeedLog(log);
}

type Log = BreastfeedLog | DiaperChangeLog | SleepLog;
export default Log;
