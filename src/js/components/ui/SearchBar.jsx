import React from 'react'

export default function SearchBar({handleSearch}) {
  return (
    <div  class="max-w-md mx-auto text-lg">

     <form onSubmit={handleSearch}>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative overflow-hidden rounded-2xl">
        <div class="bg-c-black absolute rounded-b-3xl py-2 px-5 ps-6 text-white inset-y-0 -start-1 flex items-center pointer-events-none">
            Busqueda
        </div>

        <input type="search" name="title" id="default-search" class="block w-full p-2 ps-32  border-solid border-2 border-c-black rounded-2xl" placeholder="Qué quieres aprender hoy?" required />
        <button 
        type="button" class="h-[calc(100%-8px)] text-white absolute right-1 bottom-1 bg-primary-gradient hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2 ">
            <svg class="w-4 h-4 text-white rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </button>
    </div>
</form> 

</div>
  )
}
