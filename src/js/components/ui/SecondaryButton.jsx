import React from 'react'

export default function SecondaryButton({children, handleOnClick, extra_class, rounded=null}) {
  return (
    <button  
        type='button'
        className={`
        relative overflow-hidden rounded text-white bg-secondary-gradient
        hover:after:opacity-10 after:transition-all after:duration-200 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-0
        transition-all duration-200
        w-fit text-lg  flex items-center sm:text-xl
        ${rounded ? (rounded + ' rounded-full') : 'px-6 py-2'}
        ${extra_class}`}
        onClick={handleOnClick}
    >{children}
</button>
  )
}
