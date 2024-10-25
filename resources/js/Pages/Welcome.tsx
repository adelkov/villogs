import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/AppSidebar";
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
