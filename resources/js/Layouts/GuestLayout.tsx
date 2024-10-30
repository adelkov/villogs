import ApplicationLogo from "@/components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-blue-300 dark:bg-gray-900">
            <div>
                <Link href="/" className={"text-white"}>
                    <ApplicationLogo className="size-28 fill-current" />
                </Link>
                <h1 className="mt-2 text-3xl font-bold text-white text-center dark:text-white">
                    Villogs
                </h1>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white/50 px-6 py-4 sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
