import React from 'react'
import { Search } from "lucide-react"

export default function SearchBar({handleSearch}) {
  return (
    <div  className="max-w-md mx-auto text-lg">

     <form>   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative overflow-hidden rounded-2xl">
       

        <input 
        onInput={(e) => handleSearch(e)}
        type="search" name="title" id="default-search" className="block w-full p-2 ps-3 border-solid border-2 border-c-black rounded-2xl"
         placeholder="Qué quieres aprender hoy?" required />
        <span 
        className="block h-[calc(100%-8px)] text-white absolute right-1 bottom-1 bg-gray-300 font-medium rounded-xl text-sm px-3 py-2 ">
           <Search className='size-5 rotate-90' />
        </span>
    </div>
</form> 

</div>
  )
}
