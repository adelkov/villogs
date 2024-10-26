import * as React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
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

type Props = {
    baby: any;
    status: string;
};

function BreastFeedTrack({ baby, status }: Props) {
    const {
        post,
        reset,
        delete: endLog,
    } = useForm({
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

    const addBreastFeed = (e: any, side: string) => {
        e.preventDefault();
        post(
            route("babies.logs.add.breastfeed", {
                baby: baby,
                side,
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <TrackActionButton>
                            <Milk className={"h-8 w-8"} />
                            Breastfeed
                        </TrackActionButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Which breast?</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={(e) => addBreastFeed(e, "right")}
                        >
                            Right
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => addBreastFeed(e, "left")}
                        >
                            Left
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <TrackActionButton
                    className={"animate-pulse"}
                    onClick={endBreastFeeding}
                >
                    <MilkOff className={"h-8 w-8"} />
                    End breastfeeding
                </TrackActionButton>
            )}
        </>
    );
}

export default BreastFeedTrack;
