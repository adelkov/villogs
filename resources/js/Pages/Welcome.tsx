import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Home, Inbox, Settings } from "lucide-react";

export default function Welcome({ ...props }: PageProps<any>) {
    console.log(props);
    return (
        <SidebarProvider>
            <AppSidebar
                items={props.babies.map((b: any) => ({
                    title: b.name,
                    url: `/babies/${b.id}`,
                    icon: Home,
                }))}
            />
            <main>
                <SidebarTrigger />
                <Head title="Villogs" />

                content
            </main>
        </SidebarProvider>
    );
}
