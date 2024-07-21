import React from 'react'

export default function CursoPagination({handleChangePage, nextPage, prevPage}) {
  return (
    <nav>
        <ul>
            {prevPage &&
            <li>
                <button
                onClick={() => handleChangePage(prevPage)}
                
                >Anterior</button>
            </li>
            }
            {nextPage &&
            <li>
                <button
                onClick={() => handleChangePage(nextPage)}
                >Siguiente</button>
            </li>
            }

        </ul>
    </nav>
  )
}
