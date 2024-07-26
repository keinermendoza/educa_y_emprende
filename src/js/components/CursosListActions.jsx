import React from 'react'
import { Link, Form, useSubmit } from 'react-router-dom'
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

export function CursosListActionDropdown({id}) {
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, {
            method: "post",
            action: id + '/delete',
          });
    }
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
        <DropdownMenuItem asChild>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className='hover:bg-slate-100 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full flex gap-2 items-center'>
                        <Trash2  className='size-4' /> Eliminar
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className='font-crimson text-lg'>Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no podrá deshacerse. Si confirmas este curso se borrará y se eliminará toda la informacion asociada con él.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                    
                        onClick={handleDelete}
                    >Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
            <Link className=' w-full flex gap-2 items-center' to={id + '/vista-previa'}>
                <Eye className='size-4' />
                Vista Previa
            </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
            <Link className='w-full flex gap-2 items-center' to={id + '/editando'}>
                <SquarePen className='size-4' /> 
                Editar
            </Link>
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export function CursosListActionButtons({id}) {
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, {
            method: "post",
            action: id + '/delete',
          });
    }
    return (
    <div className='hidden md:flex justify-center gap-2'>
        
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className='grid place-content-center rounded-md p-2 border-2 border-solid border-white hover:bg-primary-gradient hover:bg-opacity-15'><Trash2 /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className='font-crimson text-lg'>Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta acción no podrá deshacerse. Si confirmas este curso se borrará y se eliminará toda la informacion asociada con él.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                 
                    onClick={handleDelete}
                >Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        

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
