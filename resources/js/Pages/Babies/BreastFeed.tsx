import Layout from "@/components/Layout";
import * as React from "react";
import Sleep from "@/Pages/Babies/Sleep";
import {BreastfeedLog, DiaperChangeLog} from "@/types/Log";
import LogCard from "@/Pages/Babies/LogCard";

function BreastFeed(props: any) {
    return (
        <div className={"flex flex-col gap-2 max-w-screen-sm mx-auto p-10"}>
            <h1 className={'text-4xl mb-3'}>
                Breastfeed Logs
            </h1>
            {props.logs.map((log: BreastfeedLog) => (
                <LogCard
                    key={log.id}
                    log={{ ...log, variant: "breastfeed" }}
                    baby={props.baby}
                />
            ))}
        </div>
    );
}

BreastFeed.layout = (page: any) => <Layout children={page} />;
export default BreastFeed;
