import * as React from "react";
import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import TrackActionButton from "@/Pages/Babies/TrackActionButton";
import { AlarmClock, Bed } from "lucide-react";
import Baby from "@/types/Baby";
import Log, { isSleepLog } from "@/types/Log";
import { displayLongRunningLogDuration } from "@/lib/utils";
import { useInterval } from "usehooks-ts";

type Props = {
    baby: Baby;
    status: string;
};

function SleepTrack({ baby, status }: Props) {
    const { props } = usePage<any>();

    const runningSleepLog = props.logs.find(
        (log: Log) => isSleepLog(log) && !log.ended_at,
    );
    const [duration, setDuration] = useState<string>(
        runningSleepLog ? displayLongRunningLogDuration(runningSleepLog) : "",
    );

    useInterval(
        () => {
            setDuration(displayLongRunningLogDuration(runningSleepLog));
        },
        runningSleepLog ? 1000 : null,
    );

    const { post, reset } = useForm({
        message: "",
    });
    const startSleep = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.sleep.start", {
                baby,
            }),
            { onSuccess: () => reset() },
        );
    };
    const endSleep = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.sleep.end", {
                baby: baby,
            }),
            { onSuccess: () => reset() },
        );
    };
    const isSleeping = status === "sleeping";
    return (
        <>
            {!isSleeping ? (
                <TrackActionButton disabled={isSleeping} onClick={startSleep}>
                    <Bed className={"h-8 w-8"} />
                    <span>Sleep</span>
                </TrackActionButton>
            ) : (
                <TrackActionButton disabled={!isSleeping} onClick={endSleep}>
                    <AlarmClock className={"h-8 w-8 animate-pulse"} />
                    <span className={"animate-pulse"}>
                        {duration ||
                            displayLongRunningLogDuration(runningSleepLog) ||
                            "00:00:00"}
                    </span>
                </TrackActionButton>
            )}
        </>
    );
}

export default SleepTrack;
