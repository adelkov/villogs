import { SleepLog } from "@/types/Log";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { formatToLocalTime } from "@/lib/utils";

type Props = {
    log: SleepLog;
    onClose: () => void;
};

function SleepLogEditor({ log, onClose }: Props) {
    const {
        put,
        setData,
        data,
        processing,
        reset,
        delete: deleteItem,
    } = useForm({
        started_at: log.started_at,
        ended_at: log.ended_at,
    });

    const deleteLog = (e: any, id: number) => {
        e.preventDefault();
        deleteItem(
            route("logs.delete", {
                id,
            }),
            { onSuccess: () => reset() },
        );
    };

    const onSubmitLog = (e: any) => {
        e.preventDefault();
        put(
            route("sleepLogs.update", {
                sleepLog: log.loggable,
            }),
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <form
            className={"space-y-2.5 flex flex-col"}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitLog(e);
            }}
        >
            <input
                type="datetime-local"
                placeholder={"Started at"}
                value={
                    data.started_at ? formatToLocalTime(data.started_at) : ""
                }
                onChange={(event) => {
                    setData({
                        ...data,
                        started_at: new Date(event.target.value).toISOString(),
                    });
                }}
            />
            <input
                min={data.started_at && formatToLocalTime(data.started_at)}
                type="datetime-local"
                placeholder={"Started at"}
                value={data.ended_at ? formatToLocalTime(data.ended_at) : ""}
                onChange={(event) => {
                    setData({
                        ...data,
                        ended_at: new Date(event.target.value).toISOString(),
                    });
                }}
            />

            <Button disabled={processing} type="submit">
                Save
            </Button>
            <Button
                onClick={(e) => deleteLog(e, log.id)}
                variant={"destructive"}
                disabled={processing}
                type="button"
            >
                Delete
            </Button>
        </form>
    );
}

export default SleepLogEditor;
