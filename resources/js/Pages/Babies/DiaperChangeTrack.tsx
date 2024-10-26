import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";


type Props = {
    baby: any
}

function DiaperChangeTrack({ baby }: Props) {
    const [dischargeType, setDischargeType] = useState<string>();
    const {
        post,
        reset,
        delete: deleteItem,
    } = useForm({
        message: "",
    });
    const addDiaperChange = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.diaperchange", {
                baby: baby,
                type: dischargeType,
            }),
            {
                onSuccess: () => {
                    setDischargeType("");
                    reset();
                },
            },
        );
    };

    const selectDischargeType = () => {
        setDischargeType("select");
    };
    return (
        <>
            {!dischargeType && (
                <Button onClick={selectDischargeType}>Add diaper change</Button>
            )}
            {dischargeType === "select" && (
                <div>
                    <Button
                        variant={"ghost"}
                        onClick={(e: any) => {
                            setDischargeType("pee");
                        }}
                    >
                        Pee
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={(e: any) => {
                            setDischargeType("poo");
                        }}
                    >
                        Poo
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={(e: any) => {
                            setDischargeType("both");
                        }}
                    >
                        Both
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={(e: any) => {
                            setDischargeType("empty");
                        }}
                    >
                        Empty
                    </Button>
                </div>
            )}
            {dischargeType && dischargeType !== "select" && (
                <Button variant={"secondary"} onClick={addDiaperChange}>
                    Add {dischargeType}, diaper change
                </Button>
            )}
        </>
    );
}

export default DiaperChangeTrack;
