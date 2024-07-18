import React from 'react'

export default function CountResults({count, search}) {
    const noResults = count === 0 && search
         
    return (
        <div class="text-2xl mt-10 mb-2">
            {count && search &&  <p>{count} Resultado{count === 0 ? '' : 's'} para: <span class="font-lalezar">{search}</span></p>}
            {!search && count && <p>{ count } Resultado{count === 1 ? '' : 's'} para su Busqueda</p>}
            {noResults && <p>No conseguimos resultados para su busqueda</p>} 
            
        </div>
    )
    
}

