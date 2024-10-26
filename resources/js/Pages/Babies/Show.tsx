import {Head, useForm} from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import * as React from "react";

function ShowBaby(props: any) {
    console.log(props);
    const [breastSide, setBreastSide] = useState<string>();
    const [dischargeType, setDischargeType] = useState<string>();
    const {
        post,
        reset,
        delete: deleteItem,
    } = useForm({
        message: "",
    });

    const startSleep = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.sleep.start", {
                baby: props.baby,
            }),
            { onSuccess: () => reset() },
        );
    };

    const endSleep = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.sleep.end", {
                baby: props.baby,
            }),
            { onSuccess: () => reset() },
        );
    };

    const addBreastFeed = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.breastfeed", {
                baby: props.baby,
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

    const addDiaperChange = (e: any) => {
        e.preventDefault();
        post(
            route("babies.logs.add.diaperchange", {
                baby: props.baby,
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

    const deleteLog = (e: any, id: string, type: string) => {
        e.preventDefault();
        deleteItem(
            route("babies.logs.delete", {
                baby: props.baby,
                id,
                type,
            }),
            { onSuccess: () => reset() },
        );
    };

    const onSettingBreastSide = () => {
        setBreastSide("select");
    };

    const selectDischargeType = () => {
        setDischargeType("select");
    };

    return (
        <div className={" bg-blue-300 min-h-screen text-slate-800"}>
            <Head title="Villogs" />
            <div className={"max-w-screen-sm mx-auto p-2 md:p-10 space-y-2.5"}>
                <h1 className={"text-6xl font-bold"}>{props.baby.name}</h1>
                <h2 className={"text-1xl"}>
                    Born on {format(new Date(props.baby.date_of_birth), "E, d MMMM yyyy")}
                </h2>
                <h2 className={"text-4xl"}>
                    Baby is {props.isSleeping ? "Sleeping" : "Awake"}
                </h2>
                <div className={"gap-2 grid md:rid-cols-2"}>
                    {!props.isSleeping ? (
                        <Button
                            disabled={props.isSleeping}
                            onClick={startSleep}
                        >
                            Start sleep
                        </Button>
                    ) : (
                        <Button
                            className={'animate-pulse'}
                            disabled={!props.isSleeping} onClick={endSleep}>
                            End sleep
                        </Button>
                    )}
                    {!breastSide && (
                        <Button onClick={onSettingBreastSide}>
                            Add breastfeed
                        </Button>
                    )}
                    {breastSide === "select" && (
                        <div>
                            <Button
                                variant={'ghost'}
                                onClick={(e: any) => {
                                    setBreastSide("left");
                                }}
                            >
                                Left
                            </Button>
                            <Button
                                variant={'ghost'}
                                onClick={(e: any) => {
                                    setBreastSide("right");
                                }}
                            >
                                Right
                            </Button>
                        </div>
                    )}
                    {breastSide && breastSide !== "select" && (
                        <Button variant={'secondary'} onClick={addBreastFeed}>
                            Add {breastSide} breastfeed
                        </Button>
                    )}
                    {!dischargeType && (
                        <Button onClick={selectDischargeType}>
                            Add diaper change
                        </Button>
                    )}
                    {dischargeType === "select" && (
                        <div>
                            <Button
                                variant={'ghost'}
                                onClick={(e: any) => {
                                    setDischargeType("pee");
                                }}
                            >
                                Pee
                            </Button>
                            <Button
                                variant={'ghost'}
                                onClick={(e: any) => {
                                    setDischargeType("poo");
                                }}
                            >
                                Poo
                            </Button>
                            <Button
                                variant={'ghost'}
                                onClick={(e: any) => {
                                    setDischargeType("both");
                                }}
                            >
                                Both
                            </Button>
                            <Button
                                variant={'ghost'}
                                onClick={(e: any) => {
                                    setDischargeType("empty");
                                }}
                            >
                                Empty
                            </Button>
                        </div>
                    )}
                    {dischargeType && dischargeType !== "select" && (
                        <Button variant={'secondary'} onClick={addDiaperChange}>
                            Add {dischargeType}, diaper change
                        </Button>
                    )}
                </div>

                <Table>
                    <TableCaption>Log of baby events</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Started At</TableHead>
                            <TableHead>Ended at</TableHead>
                            <TableHead className="text-right"></TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.logs.map((log: any) => (
                            <TableRow key={log.id + log.variant}>
                                <TableCell className="font-medium">
                                    {log.variant}
                                </TableCell>
                                <TableCell>
                                    {format(
                                        new Date(log.started_at ?? ""),
                                        "E. HH:mm",
                                    )}
                                </TableCell>
                                <TableCell>{log.ended_at ? format(
                                    new Date(log.ended_at ?? ""),
                                    " HH:mm",
                                    ): ''}</TableCell>
                                <TableCell className="text-right">
                                    {log.side || log.type}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant={'destructive'}
                                        onClick={(e: any) =>
                                            deleteLog(e, log.id, log.variant)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ShowBaby;
