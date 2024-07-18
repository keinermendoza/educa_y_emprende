import React from 'react'

export default function PrimaryButton({children, href, extra_class}) {
  return (
    <a className={`transition-all duration-200 [&_svg]:transition-all [&_svg]:opacity-0
        relative hover:px-7 hover:translate-x-1 [&_svg]:-translate-x-3 [&_svg]:hover:opacity-100 [&_svg]:hover:-translate-x-1
        overflow-hidden rounded text-white bg-primary-gradient
        w-fit text-lg px-6 py-2 flex items-center sm:text-xl
        sm:hover:px-9 sm:px-8
        ${extra_class}`}
        href={href}
    >{children}
    <div class="h-full grid place-content-center absolute inset-y-0 right-0">
        <svg class="translate-y-[2px]" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
    </div>
</a>
  )
}
