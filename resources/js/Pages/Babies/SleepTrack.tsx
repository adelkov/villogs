import * as React from "react";
import { useForm } from "@inertiajs/react";
import TrackActionButton from "@/Pages/Babies/TrackActionButton";
import { Bed, PersonStanding } from 'lucide-react'

type Props = {
    baby: any;
    status: string;
};

function SleepTrack({ baby, status }: Props) {
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
                <TrackActionButton
                    disabled={isSleeping}
                    onClick={startSleep}
                >
                    <Bed className={'h-8 w-8'} />
                    <span>Sleep</span>
                </TrackActionButton>
            ) : (
                <TrackActionButton
                    className={"animate-pulse"}
                    disabled={!isSleeping}
                    onClick={endSleep}
                >
                    <PersonStanding className={'h-8 w-8'} />
                    <span>End sleep</span>
                </TrackActionButton>
            )}
        </>
    );
}

export default SleepTrack;
