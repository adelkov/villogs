import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <div className={'bg-blue-500 min-h-screen'}>
        <div className={"max-w-screen-lg mx-auto p-10"}>
            <Head title="Villogs" />
            <Button>VIllogs</Button>
        </div>
        </div>
    );
}
