import React from 'react'
import { Link, Form } from 'react-router-dom'
import { MoreHorizontal, Trash2, SquarePen, Eye } from "lucide-react"
 
import { Button } from "@components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/dropdown-menu"

export function CursosListActionDropdown({id}) {
  return (
    <div className="md:hidden">
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
            className="hover:bg-red-500"
            onClick={() => navigator.clipboard.writeText(payment.id)}
        >
            <Form 
            method='post' 
            action={id + '/delete'}
            className='flex items-center gap-2'
            >
                <button
                    className="text-red-500" 
                    type='submit'>
                        <Trash2 />
                    
                </button>
            <span>Borrar</span>
            </Form>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export function CursosListActionButtons({id}) {
  return (
    <div className='hidden md:flex justify-center gap-2'>
        <Form method='post' action={id + '/delete'}
            className=" grid place-content-center rounded-md p-2 border-2 border-solid  border-white hover:bg-primary-gradient hover:bg-opacity-15"
        >

        <button type='submit'>
            <Trash2 />
        </button>
        </Form>

        <Link 
            to={id + '/editando'}
            className="grid place-content-center rounded-md p-2 border-2 border-solid border-white hover:bg-primary-gradient hover:bg-opacity-15"
            >
            <SquarePen />
        </Link>

        <Link
            to={id + '/vista-previa'}
            className="grid place-content-center rounded-md p-2 border-2 border-solid border-white hover:bg-primary-gradient hover:bg-opacity-15"
        >
            <Eye />
        </Link>
    </div>
  )
}
