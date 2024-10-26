import { Head, useForm } from "@inertiajs/react";
import * as React from "react";
import { differenceInDays, differenceInWeeks } from "date-fns";
import { Badge } from "@/components/ui/badge";
import BreastFeedTrack from "@/Pages/Babies/BreastFeedTrack";
import DiaperChangeTrack from "@/Pages/Babies/DiaperChangeTrack";
import SleepTrack from "@/Pages/Babies/SleepTrack";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import LogCard from "@/Pages/Babies/LogCard";

function ShowBaby(props: any) {
    console.log(props)
    const showBreastFeed = ["awake", "breastfeeding"].includes(props.status);
    const showSleeping = ["awake", "sleeping"].includes(props.status);

    return (
        <div className={" bg-blue-300 min-h-screen text-slate-800"}>
            <Head title="Villogs" />
            <div className={"max-w-screen-sm mx-auto p-2 md:p-10 space-y-2.5"}>
                <h1 className={"text-6xl font-bold"}>
                    {props.baby.name}
                    <span className={"font-bold italic text-xl"}>
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

                {props.logs.slice().sort(
                    (a: any, b: any) =>
                        new Date(b.started_at).getTime() -
                        new Date(a.started_at).getTime(),
                ).map((log: any) => (
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

export default ShowBaby;
