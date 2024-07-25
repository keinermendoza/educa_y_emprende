import React from 'react'
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

export default function DialogInputCreate({btnText, title, helpText, value, setValue, handleSave, isBtn=true }) {
    const btnClasses = isBtn ? 'w-fit my-2' : 'w-full justify-start '
    return (
    
    <Dialog>
    <DialogTrigger asChild>
        <Button variant={isBtn ? 'default' : 'outline'} className={btnClasses}>
            {btnText}
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
        <DialogHeader>
        <DialogTitle className='text-lg font-crimson'>{title}</DialogTitle>
            <DialogDescription>{helpText}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
            <Input
                defaultValue={value}
                onInput={(e) => setValue(e.target.value)}
            />
        </div>

        </div>
        <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
            <Button 
                onClick={handleSave}
                type="button" >
                <Save className="mr-2 h-4 w-4"  />
                Guardar
            </Button>
        </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>

  )
}
