import Layout from "@/components/Layout";
import * as React from "react";
import LogCard from "@/Pages/Babies/LogCard";
import {SleepLog} from "@/types/Log";

function Sleep(props: any) {
    return (
        <div className={"flex flex-col gap-2 max-w-screen-sm mx-auto p-10"}>
            <h1 className={"text-4xl mb-3"}>Sleep Logs</h1>
            {props.logs.map((log: SleepLog) => (
                <LogCard
                    key={log.id}
                    log={{ ...log, variant: "sleep" }}
                    baby={props.baby}
                />
            ))}
        </div>
    );
}

Sleep.layout = (page: any) => <Layout children={page} />;
export default Sleep;
