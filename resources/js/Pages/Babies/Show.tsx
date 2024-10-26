import { Head, useForm } from "@inertiajs/react";
import * as React from "react";
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
import { differenceInDays, differenceInWeeks, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import BreastFeedTrack from "@/Pages/Babies/BreastFeedTrack";
import DiaperChangeTrack from "@/Pages/Babies/DiaperChangeTrack";

function ShowBaby(props: any) {
    const {
        post,
        reset,
        delete: deleteItem,
    } = useForm({
        message: "",
    });
    console.log(props);

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

    const isSleeping = props.status === "sleeping";
    const showBreastFeed = ["awake", "breastfeeding"].includes(props.status);
    const showSleeping = ["awake", "sleeping"].includes(props.status);

    return (
        <div className={" bg-blue-300 min-h-screen text-slate-800"}>
            <Head title="Villogs" />
            <div className={"max-w-screen-sm mx-auto p-2 md:p-10 space-y-2.5"}>
                <h1 className={"text-6xl font-bold"}>{props.baby.name}</h1>
                <div className={"text-1xl space-x-1"}>
                    <Badge variant="secondary">
                        {differenceInDays(
                            new Date(),
                            new Date(props.baby.date_of_birth),
                        )}{" "}
                        days
                    </Badge>

                    <Badge variant="default">
                        {differenceInWeeks(
                            new Date(),
                            new Date(props.baby.date_of_birth),
                        )}{" "}
                        weeks
                    </Badge>
                </div>

                <h2 className={"text-4xl"}>Baby is {props.status}</h2>
                <div className={"gap-2 grid md:rid-cols-2"}>
                    {showSleeping && (
                        <>
                            {!isSleeping ? (
                                <Button
                                    disabled={isSleeping}
                                    onClick={startSleep}
                                >
                                    Start sleep
                                </Button>
                            ) : (
                                <Button
                                    className={"animate-pulse"}
                                    disabled={!isSleeping}
                                    onClick={endSleep}
                                >
                                    End sleep
                                </Button>
                            )}
                        </>
                    )}

                    {showBreastFeed && (
                        <BreastFeedTrack
                            status={props.status}
                            baby={props.baby}
                        />
                    )}

                    {props.status === "awake" && (
                        <DiaperChangeTrack baby={props.baby} />
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
                                <TableCell>
                                    {log.ended_at
                                        ? format(
                                              new Date(log.ended_at ?? ""),
                                              " HH:mm",
                                          )
                                        : ""}
                                </TableCell>
                                <TableCell className="text-right">
                                    {log.side || log.type}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant={"destructive"}
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
