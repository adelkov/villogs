import Layout from "@/components/Layout";
import * as React from "react";
import { DiaperChangeLog } from "@/types/Log";
import LogCard from "@/Pages/Babies/LogCard";

function DiaperChange(props: any) {
    return (
        <div className={"flex flex-col gap-2 max-w-screen-sm mx-auto p-2"}>
            <h1 className={"text-4xl mb-3"}>Diaper change Logs</h1>
            {props.logs.map((log: DiaperChangeLog) => (
                <LogCard
                    key={log.id}
                    log={{ ...log, variant: "diaperchange" }}
                    baby={props.baby}
                />
            ))}
        </div>
    );
}

DiaperChange.layout = (page: any) => <Layout children={page} />;
export default DiaperChange;
