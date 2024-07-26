import React from 'react'

export default function CountResults({count, search}) {
    const noResults = count === 0 
    const resultsWithoutSearch = count !== 0 && !search
    const resultsForSearch = count !== 0 && search
    return (
        <div class="text-2xl mt-10 mb-2">
            {resultsForSearch &&  <p>{count} Resultado{count === 1 ? '' : 's'} para: <span class="font-lalezar">{search}</span></p>}
            {resultsWithoutSearch && <p>{ count } Resultado{count === 1 ? '' : 's'} para su Busqueda</p>}
            {noResults && <p>No conseguimos resultados para su busqueda</p>} 
        </div>
    )
    
}

