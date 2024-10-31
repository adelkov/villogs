import { usePage } from "@inertiajs/react";
import { Props } from "@/Pages/Babies/Show";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function Timeline() {
    const { props } = usePage<Props>();
    const timeline = props.timeline;

    return (
        <div className={"relative p-1"}>
            <div className={"absolute w-full h-full"}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((line) => (
                    <div
                        style={{
                            left: (line / 24) * 100 + "%",
                            top: 0,
                            bottom: 0,
                            width: 0,
                            borderRight: "1px dashed #9ca3af99",
                            position: "absolute",
                        }}
                    />
                ))}
            </div>
            {Object.keys(timeline).map((key) => {
                return (
                    <div key={key} className={"relative"}>
                        <h2>{format(key, "iii-io")}</h2>
                        <div
                            className={
                                "h-5 relative bg-gray-400/60 rounded-md overflow-hidden outline-2 outline outline-gray-400/60"
                            }
                        >
                            {timeline[key].map((log, index) => {
                                return (
                                    <div
                                        style={{
                                            left: log.fromStartOfDay + "%",
                                            width: log.fromStartOfLog
                                                ? log.fromStartOfLog + "%"
                                                : 2,
                                            zIndex: index,
                                        }}
                                        key={index}
                                        className={cn(
                                            "absolute h-5 rounded-md",
                                            {
                                                "bg-pink-500":
                                                    log.loggable_type.includes(
                                                        "BreastFeed",
                                                    ),
                                                "bg-slate-500 rounded-full":
                                                    log.loggable_type.includes(
                                                        "DiaperChange",
                                                    ),
                                                "bg-slate-800":
                                                    log.loggable_type.includes(
                                                        "Sleep",
                                                    ),
                                            },
                                        )}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Timeline;
