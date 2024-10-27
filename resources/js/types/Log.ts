type BaseLog = {
    id: number;
    baby_id: number;
    created_at: string;
    updated_at: string;
};

export type BreastfeedLog = BaseLog & {
    variant: "breastfeed";
    type: "breastfeed";
    side: "left" | "right";
    started_at: string;
    ended_at: string;
};

export function isBreastfeedLog(log: Log): log is BreastfeedLog {
    return log.variant === "breastfeed";
}

export type DiaperChangeLog = BaseLog & {
    variant: "diaperchange";
    type: "pee" | "poop" | "both" | "empty";
    started_at: string;
};

export function isDiaperChangeLog(log: Log): log is DiaperChangeLog {
    return log.variant === "diaperchange";
}

export type SleepLog = BaseLog & {
    variant: "sleep";
    started_at: string;
    ended_at: string;
};

export function isSleepLog(log: Log): log is SleepLog {
    return log.variant === "sleep";
}

export function isLongRunningLog(log: Log): log is SleepLog {
    return isSleepLog(log) || isBreastfeedLog(log);
}

type Log = BreastfeedLog | DiaperChangeLog | SleepLog;
export default Log;
