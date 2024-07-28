import React from 'react'
import SecondaryButton from './SecondaryButton'
import { CircleArrowLeft, CircleArrowRight  } from "lucide-react"

export default function CursoPagination({handleChangePage, nextPage, prevPage}) {
  return (
    <nav className='mt-5 grid place-content-center'>
        <ul className='flex justify-between items-center w-full gap-2'>
            {prevPage &&
            <li>
                <SecondaryButton rounded='p-2'
                handleOnClick={() => handleChangePage(prevPage)}
                ><CircleArrowLeft /></SecondaryButton>
            </li>
            }
            {nextPage &&
            <li>
                <SecondaryButton rounded='p-2'
                handleOnClick={() => handleChangePage(nextPage)}
                ><CircleArrowRight /></SecondaryButton>
            </li>
            }

        </ul>
    </nav>
  )
}
