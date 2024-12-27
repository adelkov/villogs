import { Head, usePoll } from "@inertiajs/react";
import * as React from "react";
import { differenceInDays, differenceInWeeks, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import BreastFeedTrack from "@/Pages/Babies/BreastFeedTrack";
import DiaperChangeTrack from "@/Pages/Babies/DiaperChangeTrack";
import SleepTrack from "@/Pages/Babies/SleepTrack";
import { AnimatePresence } from "framer-motion";
import { cn, displayTimeSinceEnded, getMinutesSlept } from "@/lib/utils";
import LogCard from "@/Pages/Babies/LogCard";
import Layout from "@/components/Layout";
import Log, {
    isBreastfeedLog,
    isDiaperChangeLog,
    isSleepLog,
} from "@/types/Log";
import Baby from "@/types/Baby";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

export type Props = {
    baby: Baby;
    status: string;
    auth: any;
    logs: Log[];
    timeline: Record<
        string,
        (Log & {
            fromStartOfDay: number;
            fromStartOfLog: number | null;
        })[]
    >;
};

function ShowBaby(props: Props) {
    const showBreastFeed = ["awake", "breastfeeding"].includes(props.status);
    const showSleeping = ["awake", "sleeping"].includes(props.status);

    usePoll(5000);

    const sortedLogs = props.logs
        .slice()
        .sort(
            (a: any, b: any) =>
                new Date(b.started_at).getTime() -
                new Date(a.started_at).getTime(),
        );
    const lastSleep = sortedLogs.find(isSleepLog);
    const [lastSleepSinceDuration, setLastSleepSinceDuration] =
        useState<string>("");

    useInterval(
        () => {
            if (!lastSleep?.ended_at) {
                return;
            }
            setLastSleepSinceDuration(displayTimeSinceEnded(lastSleep));
        },
        lastSleep?.ended_at ? 1000 : null,
    );

    const minutesSlept = getMinutesSlept(props.logs.filter(isSleepLog));

    const lastBreastFeed = sortedLogs.find(isBreastfeedLog);

    return (
        <div className={" bg-slate-800 min-h-screen text-slate-50"}>
            <Head>
                <title>Villogs</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Log baby events"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.png" />
            </Head>

            <div className={"max-w-screen-sm mx-auto p-2 md:p-10 space-y-3"}>
                <h1 className={"text-5xl font-bold"}>
                    {props.baby.name}
                    <span className={"font-bold text-xl"}>
                        {" "}
                        is {props.status}
                    </span>
                </h1>
                <div className={"text-1xl space-x-1"}>
                    <Badge variant="secondary">
                        {differenceInDays(
                            new Date(),
                            new Date(props.baby.date_of_birth),
                        )}{" "}
                        days
                    </Badge>

                    <Badge variant="default">
                        {differenceInWeeks(
                            new Date(),
                            new Date(props.baby.date_of_birth),
                        )}{" "}
                        weeks
                    </Badge>
                </div>

                <AnimatePresence mode={"popLayout"}>
                    <div
                        className={cn("gap-2 grid", {
                            "grid grid-cols-3": props.status === "awake",
                        })}
                    >
                        {showSleeping && (
                            <SleepTrack
                                baby={props.baby}
                                status={props.status}
                            />
                        )}

                        {showBreastFeed && (
                            <BreastFeedTrack
                                status={props.status}
                                baby={props.baby}
                            />
                        )}

                        {props.status === "awake" && (
                            <DiaperChangeTrack baby={props.baby} />
                        )}
                    </div>
                </AnimatePresence>

                <table className={"w-full [&>tr>td]:p-4"}>
                    <tbody>
                        <tr>
                            <td className={"text-slate-400"}>Awake for</td>
                            <td className={"font-bold text-right"}>
                                {lastSleep?.ended_at
                                    ? lastSleepSinceDuration
                                    : "-"}
                            </td>
                        </tr>
                        <tr>
                            <td className={"text-slate-400"}>
                                Hours slept today:{" "}
                            </td>
                            <td className={"font-bold text-right"}>
                                {Math.floor(minutesSlept / 60)} hours{" "}
                                {minutesSlept % 60} minutes
                            </td>
                        </tr>
                        <tr>
                            <td className={"text-slate-400"}>
                                Last breast feed:
                            </td>
                            {lastBreastFeed && (
                                <td className={"font-bold text-right"}>
                                    {" "}
                                    {lastBreastFeed?.loggable.side} side (
                                    {format(
                                        new Date(lastBreastFeed?.started_at),
                                        "HH:mm",
                                    )}
                                    )
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td className={"text-slate-400"}>
                                Diaper changes:
                            </td>
                            <td className={"font-bold text-right"}>
                                {" "}
                                {props.logs.filter(isDiaperChangeLog).length}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {sortedLogs.map((log: any) => (
                    <LogCard key={log.id} log={log} baby={props.baby} />
                ))}
            </div>
        </div>
    );
}

ShowBaby.layout = (page: any) => <Layout children={page} />;

export default ShowBaby;
