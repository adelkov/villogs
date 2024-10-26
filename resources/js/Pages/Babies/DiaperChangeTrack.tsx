import * as React from "react";
import { useForm } from "@inertiajs/react";
import TrackActionButton from "@/Pages/Babies/TrackActionButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shirt } from "lucide-react";

type Props = {
    baby: any;
};

function DiaperChangeTrack({ baby }: Props) {
    const { post, reset } = useForm();
    const addDiaperChange = (e: any, dischargeType: string) => {
        post(
            route("babies.logs.add.diaperchange", {
                baby: baby,
                type: dischargeType,
            }),
            {
                onSuccess: () => {
                    reset();
                },
            },
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <TrackActionButton>
                    <Shirt />
                    Diaper
                </TrackActionButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {["pee", "poop", "both", "empty"].map((type) => (
                    <DropdownMenuItem
                        key={type}
                        className={"capitalize"}
                        onClick={(e) => addDiaperChange(e, type)}
                    >
                        {type}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DiaperChangeTrack;
