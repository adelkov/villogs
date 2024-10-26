import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

type Props = {
    baby: any;
    status: string;
};

function BreastFeedTrack({ baby, status }: Props) {
    const { post, reset, delete: endLog } = useForm({
        message: "",
    });
    const [breastSide, setBreastSide] = useState<string>();

    const onSettingBreastSide = () => {
        setBreastSide("select");
    };

    const endBreastFeeding = (e: any) => {
        e.preventDefault();
        endLog(
            route("babies.logs.add.breastfeed.end", {
                baby: baby,
            }),
            {
                onSuccess: () => {
                    setBreastSide("");
                    reset();
                },
            },
        );
    };

    const addBreastFeed = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.breastfeed", {
                baby: baby,
                side: breastSide,
            }),
            {
                onSuccess: () => {
                    setBreastSide("");
                    reset();
                },
            },
        );
    };
    return (
        <>
            {status !== "breastfeeding" ? (
                <>
                    {!breastSide && (
                        <Button onClick={onSettingBreastSide}>
                            Add breastfeed
                        </Button>
                    )}
                    {breastSide === "select" && (
                        <div>
                            <Button
                                variant={"ghost"}
                                onClick={(e: any) => {
                                    setBreastSide("left");
                                }}
                            >
                                Left
                            </Button>
                            <Button
                                variant={"ghost"}
                                onClick={(e: any) => {
                                    setBreastSide("right");
                                }}
                            >
                                Right
                            </Button>
                        </div>
                    )}
                    {breastSide && breastSide !== "select" && (
                        <Button variant={"secondary"} onClick={addBreastFeed}>
                            Add {breastSide} breastfeed
                        </Button>
                    )}
                </>
            ) : (
                <Button
                    variant={"secondary"}
                    className={"animate-pulse"}
                    onClick={endBreastFeeding}
                >
                    End breastfeeding
                </Button>
            )}
        </>
    );
}

export default BreastFeedTrack;
