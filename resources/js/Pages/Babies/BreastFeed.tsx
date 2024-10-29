import Layout from "@/components/Layout";
import * as React from "react";
import {BreastfeedLog} from "@/types/Log";
import LogCard from "@/Pages/Babies/LogCard";
import Baby from "@/types/Baby";

function BreastFeed(props: { logs: BreastfeedLog[], baby: Baby }) {
    return (
        <div className={"flex flex-col gap-2 max-w-screen-sm mx-auto p-2"}>
            <h1 className={'text-4xl mb-3'}>
                Breastfeed Logs
            </h1>
            {props.logs.map((log: BreastfeedLog) => (
                <LogCard
                    key={log.id}
                    log={log}
                    baby={props.baby}
                />
            ))}
        </div>
    );
}

BreastFeed.layout = (page: any) => <Layout children={page} />;
export default BreastFeed;
