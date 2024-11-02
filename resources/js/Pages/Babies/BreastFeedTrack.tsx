import * as React from "react";
import { useForm, usePage } from "@inertiajs/react";
import TrackActionButton from "@/Pages/Babies/TrackActionButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Milk, MilkOff } from "lucide-react";
import Log, { isBreastfeedLog } from "@/types/Log";
import { useState } from "react";
import { displayLongRunningLogDuration } from "@/lib/utils";
import { useInterval } from "usehooks-ts";
import Baby from "@/types/Baby";

type Props = {
    baby: Baby;
    status: string;
};

function BreastFeedTrack({ baby, status }: Props) {
    const { props } = usePage<any>();

    const runningBreastFeedLog = props.logs.find(
        (log: Log) => isBreastfeedLog(log) && !log.ended_at,
    );
    const [duration, setDuration] = useState<string>(
        runningBreastFeedLog
            ? displayLongRunningLogDuration(runningBreastFeedLog)
            : "",
    );

    useInterval(
        () => {
            setDuration(displayLongRunningLogDuration(runningBreastFeedLog));
        },
        runningBreastFeedLog ? 1000 : null,
    );
    const {
        post,
        reset,
        delete: endLog,
        processing
    } = useForm({
        message: "",
    });

    const endBreastFeeding = (e: any) => {
        e.preventDefault();
        endLog(
            route("babies.logs.add.breastfeed.end", {
                baby: baby,
            }),
            {
                onSuccess: () => {
                    reset();
                },
            },
        );
    };

    const addBreastFeed = (e: any, side: string) => {
        e.preventDefault();
        post(
            route("babies.logs.add.breastfeed", {
                baby: baby,
                side,
            }),
            {
                onSuccess: () => {
                    reset();
                },
            },
        );
    };
    return (
        <>
            {status !== "breastfeeding" ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <TrackActionButton variant={'pink'}>
                            <Milk className={"h-8 w-8"} />
                            Breastfeed
                        </TrackActionButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Which breast?</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            disabled={processing}
                            onClick={(e) => addBreastFeed(e, "right")}
                        >
                            Right
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={processing}
                            onClick={(e) => addBreastFeed(e, "left")}
                        >
                            Left
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <TrackActionButton
                    variant={"pink"}
                    disabled={processing}
                    onClick={endBreastFeeding}>
                    <MilkOff className={"animate-pulse h-8 w-8"} />
                    <span className={"animate-pulse font-mono"}>
                        {duration ||
                            displayLongRunningLogDuration(runningBreastFeedLog)}
                    </span>
                </TrackActionButton>
            )}
        </>
    );
}

export default BreastFeedTrack;
