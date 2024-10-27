import { BreastfeedLog } from "@/types/Log";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import * as React from "react";

type Props = {
    log: BreastfeedLog;
    onClose: () => void;
};

function BreastFeedLogEditor({ log, onClose }: Props) {
    const { put, setData, data, processing } = useForm(log);

    const onSubmitBreastFeedLog = (e: any) => {
        e.preventDefault();
        put(
            route("breastFeedLogs.update", {
                breastFeedLog: log,
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
                        side: e === "left" ? "left" : "right",
                    });
                }}
                defaultValue={data?.side}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="option-one" />
                    <Label htmlFor="option-one">Left</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="option-two" />
                    <Label htmlFor="option-two">Right</Label>
                </div>
            </RadioGroup>

            <input
                type="datetime-local"
                placeholder={"Started at"}
                value={data.started_at.slice(0, 16)}
                onChange={(event) => {
                    setData({
                        ...data,
                        started_at: event.target.value + ":00.000000Z",
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

export default BreastFeedLogEditor;
