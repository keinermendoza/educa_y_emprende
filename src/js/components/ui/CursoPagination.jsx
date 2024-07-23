import React from 'react'
import SecondaryButton from './SecondaryButton'

export default function CursoPagination({handleChangePage, nextPage, prevPage}) {
  return (
    <nav className='mt-5 grid place-content-center'>
        <ul className='flex justify-between items-center w-full gap-2'>
            {prevPage &&
            <li>
                <SecondaryButton
                handleOnClick={() => handleChangePage(prevPage)}
                >Anterior</SecondaryButton>
            </li>
            }
            {nextPage &&
            <li>
                <SecondaryButton
                handleOnClick={() => handleChangePage(nextPage)}
                >Siguiente</SecondaryButton>
            </li>
            }

        </ul>
    </nav>
  )
}
