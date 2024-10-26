import { Button, ButtonProps } from "@/components/ui/button";
import * as React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const TrackActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const id = useId();
        return (
            <Button
                {...props}
                className={cn(props.className, "p-10 whitespace-pre-wrap md:text-1xl flex flex-col gap-2 font-bold")}
                key={id}
                ref={ref}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
            />
        );
    }
);

TrackActionButton.displayName = "TrackActionButton";

export default TrackActionButton;
