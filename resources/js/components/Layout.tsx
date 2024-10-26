import { AppSidebar } from "@/components/AppSidebar";
import { Bed, Milk, Shirt, CircleDashed } from "lucide-react";
import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Head } from "@inertiajs/react";

type Props = {
    children: React.ReactNode;
};

function Layout({ children }: Props) {
    return (
        <SidebarProvider className={"w-full bg-blue-300"}>
            <AppSidebar
                items={[
                    {
                        title: "Dashboard",
                        url: "/",
                        icon: CircleDashed,
                    },
                    {
                        title: "Breastfeeding",
                        url: "/brestfeeding",
                        icon: Milk,
                    },
                    {
                        title: "Sleeping",
                        url: "/sleeping",
                        icon: Bed,
                    },
                    {
                        title: "Diaper changes",
                        url: "/diaperchanges",
                        icon: Shirt,
                    },
                ]}
            />
            <main className={"w-full"}>
                <div className={"fixed right-2 top-2"}>
                    {/*<SidebarTrigger />*/}
                </div>
                <Head title="Villogs" />
                {children}
            </main>
        </SidebarProvider>
    );
}

export default Layout;
