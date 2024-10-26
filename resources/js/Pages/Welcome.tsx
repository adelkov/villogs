import { PageProps } from "@/types";
import {Head, useForm} from "@inertiajs/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Home, Inbox, Settings } from "lucide-react";
import { router } from '@inertiajs/react'
import { useState } from 'react'
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function Welcome({ ...props }: PageProps<any>) {

    const [values, setValues] = useState<{
        name: string
        date_of_birth: Date | undefined
    }>({
        name: "",
        date_of_birth: undefined,
    })

    const {
        post,
        reset,
        delete: deleteItem,
    } = useForm({
        message: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        post(
            route("babies.store", {
                name: values.name,
                date_of_birth: values.date_of_birth,
            }),
        );
    }

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

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" value={values.name} onChange={handleChange}/>
                    <label htmlFor="date_of_birth">Date of birth:</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !values.date_of_birth && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {values.date_of_birth ? format(values.date_of_birth, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={values.date_of_birth}
                                onSelect={(date) => {
                                    setValues((values) => ({ ...values, date_of_birth: date }))
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <button type="submit">Submit</button>
                </form>

            </main>
        </SidebarProvider>
    );
}
