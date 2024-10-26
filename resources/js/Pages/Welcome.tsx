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
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

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

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
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


                <form onSubmit={handleSubmit} className={'space-y-2.5 p-4 '}>
                    <h1 className="text-2xl font-semibold">Add your baby!</h1>
                    <Input placeholder={'Baby name'} id="name" value={values.name} onChange={handleChange}/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "text-left font-normal w-full",
                                    !values.date_of_birth && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {values.date_of_birth ? format(values.date_of_birth, "PPP") :
                                    <span>Date of birth</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={values.date_of_birth}
                                onSelect={(date) => {
                                    setValues((values) => ({...values, date_of_birth: date}))
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <Button type="submit" className={'w-full'}>Submit</Button>
                </form>
            </main>
        </SidebarProvider>
    );
}
