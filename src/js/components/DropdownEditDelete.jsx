import React, { useState } from 'react'
import { axiosInstance } from '../services/axios'
import { MoreHorizontal, Trash2, SquarePen, Eye } from "lucide-react"
 
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

  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@components/dialog"
import { Button } from '@components/button';
import { Input } from "@components/input"
import { Save } from 'lucide-react' 
// copied from  https://stackoverflow.com/questions/77787392/shadcn-ui-alert-dialog-closes-automatically-when-clicking-the-trigger-from-dropd


export default function DropdownEditDelete({title, titleIsFem, endpoint, setListState, initialValue}) {
    
    const [localValue, setLocalValue] = useState(initialValue)

    const handleDelete = async () => {
        try {
            const resp = await axiosInstance.delete(endpoint)
            setListState(prev => prev.filter(value => value.id !== localValue.id))
        } catch(err) {
            console.error(err)
        }
    }

    const handleUpdate = async () => {
        try {
            const resp = await axiosInstance.put(endpoint, {pk: localValue.id, name:localValue.name})
            setListState(prev => prev.map(value => value.id !== localValue.id ? value : ({...value, name:localValue.name})))
        } catch(err) {
            console.error(err)
        }
    }

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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className='justify-start w-full' variant="outline">Eliminar {title}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle className='font-crimson text-lg'>Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no podrá deshacerse. Si confirmas {titleIsFem ? 'la' : 'el'} {title} <strong className='fotn-semibold'>{localValue.name}</strong> se borrará de todos los cursos en los que pudiera estar presente.
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline' className='w-full justify-start'>
                            Editar {title}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                            <DialogTitle className='text-lg font-crimson'>{title}</DialogTitle>
                                <DialogDescription>
                                    Use el siguiente campo para cambiar el nombre de {titleIsFem ? 'la' : 'el'} {title}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Input
                                        defaultValue={localValue.name}
                                        onInput={(e) => setLocalValue((prev) => ({ ...prev, name:e.target.value}))}
                                    />
                                </div>

                            </div>
                            <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button 
                                    onClick={handleUpdate}
                                    type="button" >
                                    <Save className="mr-2 h-4 w-4"  />
                                    Guardar
                                </Button>
                            </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )

    
}
