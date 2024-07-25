import React from 'react'

import { MoreHorizontal, Trash2, SquarePen, Eye } from "lucide-react"
 
import { Button } from "@components/button"
import { Label } from '@components/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@components/alert-dialog"


import DialogInputCreate from './DialogInputCreate'
// copied from  https://stackoverflow.com/questions/77787392/shadcn-ui-alert-dialog-closes-automatically-when-clicking-the-trigger-from-dropd

function DeleteDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='justify-start w-full' variant="outline">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function DropdownEditDelete() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className='ms-1'>Acciones</DropdownMenuLabel>
                <DropdownMenuItem asChild >
                    <DeleteDialog />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <DialogInputCreate
                        isBtn={false}
                        btnText='Editar'
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    
}
