import { useForm } from "@inertiajs/react";
import {Bed, Delete, Droplet, Ghost, Milk, Moon, Package, Shirt} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useInterval } from "usehooks-ts";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Log, {
    isBreastfeedLog,
    isDiaperChangeLog,
    isLongRunningLog,
    isSleepLog,
} from "@/types/Log";
import BreastFeedLogEditor from "@/Pages/Babies/BreastFeedLogEditor";
import SleepLogEditor from "@/Pages/Babies/SleepLogEditor";
import DiaperChangeLogEditor from "@/Pages/Babies/DiaperChangeLogEditor";
import { cn, displayLogTime, displayLongRunningLogDuration } from "@/lib/utils";
import Baby from "@/types/Baby";
import { Badge } from "@/components/ui/badge";

type Props = {
    log: Log;
    baby: Baby;
};

const icon: Record<string, ReactNode> = {
    "App\\Models\\BreastFeedLog": <Milk />,
    "App\\Models\\DiaperChangeLog": <Shirt />,
    "App\\Models\\SleepLog": <Bed />,
};

const label: Record<string, string> = {
    "App\\Models\\BreastFeedLog": "Breastfeed",
    "App\\Models\\DiaperChangeLog": "Diaper change",
    "App\\Models\\SleepLog": "Sleep",
};

function LogCard({ log, baby }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [timing, setTiming] = useState(displayLogTime(log));
    const [duration, setDuration] = useState(
        displayLongRunningLogDuration(log),
    );

    useEffect(() => {
        setTiming(displayLogTime(log));
    }, [log]);

    const { reset, delete: deleteItem } = useForm({
        message: "",
    });

    const details: Record<string, string> = {
        "App\\Models\\BreastFeedLog": isBreastfeedLog(log)
            ? `- on the ${log.loggable.side}`
            : "",
        "App\\Models\\DiaperChangeLog": isDiaperChangeLog(log)
            ? `- full of ${log.loggable.type}`
            : "",
        "App\\Models\\SleepLog": "",
    };

    useInterval(
        () => {
            setTiming(displayLogTime(log));
            setDuration(displayLongRunningLogDuration(log));
        },
        isLongRunningLog(log) && !log.ended_at ? 1000 : null,
    );

    const timingByVariant: Record<string, string> = {
        "App\\Models\\BreastFeedLog": timing,
        "App\\Models\\DiaperChangeLog": `${format(new Date(log.started_at), "E. HH:mm")}`,
        "App\\Models\\SleepLog": timing,
    };

    const isRunning = isLongRunningLog(log) && !log.ended_at;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                setIsOpen(isOpen);
            }}
        >
            <DialogTrigger asChild>
                <div
                    className={cn(
                        "text-slate-800 bg-gradient-to-br from-white/20 to-white/60 flex items-center gap-4 shadow-2xl p-3 rounded-3xl",
                        {
                            "bg-pink-300": isBreastfeedLog(log),
                            "bg-yellow-300": isDiaperChangeLog(log),
                            "bg-blue-300": isSleepLog(log),
                        },
                    )}
                >
                    <div
                        className={cn("", {
                            "text-pink-600": isBreastfeedLog(log),
                            "text-yellow-600": isDiaperChangeLog(log),
                            "text-blue-600": isSleepLog(log),
                        })}
                    >
                        {icon[log.loggable_type]}
                    </div>
                    <div>
                        <h2
                            className={
                                "font-bold text-md flex items-center gap-2"
                            }
                        >
                            {isRunning && (
                                <div
                                    className={
                                        "bg-slate-800 size-2 animate-pulse rounded-full"
                                    }
                                />
                            )}
                            {label[log.loggable_type]}
                            <span className={"opacity-70 text-sm"}>
                                {details[log.loggable_type]}
                            </span>
                        </h2>
                        <p className={"text-sm"}>
                            {timingByVariant[log.loggable_type]}
                        </p>
                    </div>

                    <div className={"ml-auto self-start"}>
                        <Badge
                            variant={
                                isSleepLog(log)
                                    ? "default"
                                    : isDiaperChangeLog(log)
                                      ? "yellow"
                                      : "pink"
                            }
                            className={"flex flex-row gap-1 font-mono"}
                        >
                            {isSleepLog(log) && <Moon className={"w-3 h-3"} />}
                            {isBreastfeedLog(log) && (
                                <Milk className={"w-3 h-3"} />
                            )}
                            {isDiaperChangeLog(log) && (
                                <>
                                    {log.loggable.type === "pee" && (
                                        <Droplet className={"w-3 h-3"} />
                                    )}
                                    {log.loggable.type === "poop" && (
                                        <Package className={"w-3 h-3"} />
                                    )}
                                    {log.loggable.type === "both" && (
                                        <>
                                            <Droplet className={"w-3 h-3"} />
                                            <Package className={"w-3 h-3"} />
                                        </>
                                    )}
                                    {
                                        log.loggable.type === 'empty' && (
                                            <Ghost className={"w-3 h-3"} />
                                        )
                                    }
                                </>
                            )}

                            {duration}
                        </Badge>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit {log.loggable_type} log</DialogTitle>
                    {isBreastfeedLog(log) && (
                        <BreastFeedLogEditor
                            onClose={() => {
                                reset();
                                setIsOpen(false);
                            }}
                            log={log}
                        />
                    )}
                    {isSleepLog(log) && (
                        <SleepLogEditor
                            onClose={() => {
                                reset();
                                setIsOpen(false);
                            }}
                            log={log}
                        />
                    )}

                    {isDiaperChangeLog(log) && (
                        <DiaperChangeLogEditor
                            log={log}
                            onClose={() => {
                                reset();
                                setIsOpen(false);
                            }}
                        />
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default LogCard;
