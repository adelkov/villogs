import { DiaperChangeLog } from "@/types/Log";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { formatToLocalTime } from "@/lib/utils";

type Props = {
    log: DiaperChangeLog;
    onClose: () => void;
};

function DiaperChangeLogEditor({ log, onClose }: Props) {
    const {
        put,
        setData,
        data,
        processing,
        delete: deleteItem,
        reset,
    } = useForm({
        started_at: log.started_at,
        type: log.loggable.type,
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
    const onSubmitBreastFeedLog = (e: any) => {
        e.preventDefault();
        put(
            route("diaperChangeLogs.update", {
                diaperChangeLog: log.loggable,
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
                onSubmitBreastFeedLog(e);
            }}
        >
            <RadioGroup
                onValueChange={(e) => {
                    setData({
                        ...data,
                        type: e as any,
                    });
                }}
                defaultValue={data?.type}
            >
                {["pee", "poop", "both", "empty"].map((type) => (
                    <div className="flex items-center space-x-2" key={type}>
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className={"capitalize"}>
                            {type}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

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

export default DiaperChangeLogEditor;
