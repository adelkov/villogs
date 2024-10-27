import { Head } from "@inertiajs/react";
import * as React from "react";
import {
    differenceInDays,
    differenceInMinutes,
    differenceInWeeks,
    format,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import BreastFeedTrack from "@/Pages/Babies/BreastFeedTrack";
import DiaperChangeTrack from "@/Pages/Babies/DiaperChangeTrack";
import SleepTrack from "@/Pages/Babies/SleepTrack";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import LogCard from "@/Pages/Babies/LogCard";
import Layout from "@/components/Layout";

function ShowBaby(props: any) {
    console.log(props);
    const showBreastFeed = ["awake", "breastfeeding"].includes(props.status);
    const showSleeping = ["awake", "sleeping"].includes(props.status);

    const sortedLogs = props.logs
        .slice()
        .sort(
            (a: any, b: any) =>
                new Date(b.started_at).getTime() -
                new Date(a.started_at).getTime(),
        );

    const hoursSleptToday = props.logs.reduce((acc: number, log: any) => {
        if (log.variant === "sleep") {
            const startedAt = new Date(log.started_at);
            const endedAt = log.ended_at ? new Date(log.ended_at) : new Date();
            const duration = differenceInDays(endedAt, startedAt);
            acc += duration;
        }
        return acc;
    }, 0);

    const lastBreastFeed = sortedLogs.find(
        (log: any) => log.variant === "breastfeed",
    );

    return (
        <div className={" bg-blue-300 min-h-screen text-slate-800"}>
            <Head>
                <title>Villogs</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Log baby events"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.png" />
            </Head>

            <div className={"max-w-screen-sm mx-auto p-2 md:p-10 space-y-2.5"}>
                <h1 className={"text-6xl font-bold"}>
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
                            <td className={"text-slate-600"}>
                                Hours slept today:{" "}
                            </td>
                            <td className={"font-bold text-right"}>
                                {Math.floor(hoursSleptToday)}
                            </td>
                        </tr>
                        <tr>
                            <td className={"text-slate-600"}>
                                Last breast feed:
                            </td>
                            {lastBreastFeed &&
                                <td className={"font-bold text-right"}>
                                    {" "}
                                    {lastBreastFeed?.side} side (
                                    {format(
                                        new Date(lastBreastFeed?.started_at),
                                        "HH:mm",
                                    )}
                                    )
                                </td>
                            }
                        </tr>
                        <tr>
                            <td className={"text-slate-600"}>
                                Diaper changes:
                            </td>
                            <td className={"font-bold text-right"}>
                                {" "}
                                {
                                    props.logs.filter(
                                        (log: any) =>
                                            log.variant === "diaperchange",
                                    ).length
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>

                {sortedLogs.map((log: any) => (
                    <LogCard
                        key={log.id + log.variant}
                        log={log}
                        baby={props.baby}
                    />
                ))}
            </div>
        </div>
    );
}

ShowBaby.layout = (page: any) => <Layout children={page} />;

export default ShowBaby;
