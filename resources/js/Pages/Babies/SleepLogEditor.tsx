import { SleepLog } from "@/types/Log";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import * as React from "react";

type Props = {
    log: SleepLog;
    onClose: () => void;
};

function SleepLogEditor({ log, onClose }: Props) {
    const { put, setData, data, processing } = useForm(log);

    const onSubmitLog = (e: any) => {
        e.preventDefault();
        put(
            route("sleepLogs.update", {
                sleepLog: log,
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
                value={data.started_at.slice(0, 16)}
                onChange={(event) => {
                    setData({
                        ...data,
                        started_at: event.target.value  + ":00.000000Z",
                    });
                }}
            />
            <input
                min={
                    data.started_at.slice(0, 16)
                }
                type="datetime-local"
                placeholder={"Started at"}
                value={data.ended_at?.slice(0, 16)}
                onChange={(event) => {
                    setData({
                        ...data,
                        ended_at: event.target.value + ":00.000000Z",
                    });
                }}
            />

            <Button disabled={processing} type="submit">
                Save
            </Button>
        </form>
    );
}

export default SleepLogEditor;
