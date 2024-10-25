import { useForm } from "@inertiajs/react";
import { Bed, Delete, Milk, Shirt } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { format, intervalToDuration } from "date-fns";
import { useInterval } from "usehooks-ts";

type Props = {
    log: any;
    baby: any;
};

const icon: Record<string, ReactNode> = {
    breastfeed: <Milk />,
    diaperchange: <Shirt />,
    sleep: <Bed />,
};

const label: Record<string, string> = {
    breastfeed: "Breastfeed",
    diaperchange: "Diaper change",
    sleep: "Sleep",
};

function LogCard({ log, baby }: Props) {
    const [timing, setTiming] = useState(displayLogTime(log));

    const { reset, delete: deleteItem } = useForm({
        message: "",
    });

    const deleteLog = (e: any, id: string, type: string) => {
        e.preventDefault();
        deleteItem(
            route("babies.logs.delete", {
                baby: baby,
                id,
                type,
            }),
            { onSuccess: () => reset() },
        );
    };

    const details: Record<string, string> = {
        breastfeed: `- on the ${log.side}`,
        diaperchange: `- full of ${log.type}`,
        sleep: "",
    };

    function displayLogTime(log: any) {
        const startedAt = new Date(log.started_at);
        const endedAt = log.ended_at ? new Date(log.ended_at) : new Date();

        const duration = intervalToDuration({ start: startedAt, end: endedAt });
        const hours = duration.hours?.toString().padStart(2, "0") || "00";
        const minutes = duration.minutes?.toString().padStart(2, "0") || "00";
        const seconds = duration.seconds?.toString().padStart(2, "0") || "00";

        return `${format(startedAt, "E. HH:mm")}, ${hours}:${minutes}:${seconds}`;
    }

    useInterval(
        () => {
            setTiming(displayLogTime(log));
        },
        !log.ended_at ? 1000 : null,
    );

    const timingByVariant: Record<string, string> = {
        breastfeed: timing,
        diaperchange: `${format(new Date(log.started_at), "E. HH:mm")}`,
        sleep: timing,
    };

    const isRunning =
        ["breastfeed", "sleep"].includes(log.variant) && !log.ended_at;

    return (
        <div
            className={
                "border bg-gradient-to-br from-white/20 to-white/60 flex items-center gap-4 shadow-2xl p-3 rounded-md"
            }
        >
            {icon[log.variant]}
            <div>
                <h2 className={"font-bold text-md flex items-center gap-2"}>
                    {isRunning && (
                        <div
                            className={
                                "bg-slate-800 size-2 animate-pulse rounded-full"
                            }
                        />
                    )}
                    {label[log.variant]}
                    <span className={"opacity-70 text-sm"}>
                        {details[log.variant]}
                    </span>
                </h2>
                <p className={"text-sm"}>{timingByVariant[log.variant]}</p>
            </div>

            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={(e) => deleteLog(e, log.id, log.variant)}
                className={"ml-auto"}
            >
                <Delete />
            </Button>
        </div>
    );
}

export default LogCard;
