import React, {useEffect, useRef} from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import edjsHTML from "editorjs-html"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/breadcrumb"
import { MoreHorizontal, Trash2, SquarePen, Eye } from "lucide-react"

import { Badge } from "@components/badge"
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options);
}

export default function CursoVistaPrevia() {
    const {curso} = useLoaderData()
    const isEdited = curso.created === curso.updated
    const descriptionRef = useRef(null)

    useEffect(() => {
      if (curso?.description) {
        const edjsParser = edjsHTML();
        let description = edjsParser.parse(curso?.description);
        descriptionRef.current.innerHTML = description.join(' ')
      }
      
    },[])

    return (
    <section className='w-full mx-auto max-w-screen-lg'>

      <Breadcrumb className="mt-1 mb-2">
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to='/editor'>
                        Sitio del Editor
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to='/editor/cursos'>
                    Cursos
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{curso.title}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
    
    <div className='my-2'>
      <p >Este curso {!curso.is_public && 'NO'} es público</p>
      {isEdited
          ? (<p className=''>Actualizado el {formatearFecha(curso.updated)}</p>)
          : (<p className=''>Creado el {formatearFecha(curso.created)}</p>)
      }
    </div>

    <Link className='my-2 flex gap-2 text-white w-fit p-2 rounded-md bg-secondary-gradient' to='../editando'>
      <SquarePen />
      <span>Editar Curso</span>
    </Link>

    
    <div className='flex gap-4 justify-between relative items-start'>

      <div className='max-w-3xl'>

        <h2 className='text-4xl'>{curso.title}</h2>

          <figure className=''>
            <img 
              className=''
              src={curso?.image} 
              alt={curso.title} />
          </figure>
          
          {curso?.categories && 
            <div className='my-2 flex flex-wrap gap-2 items-end'>
              <h3 className='leading-none' >Categorías</h3>
              {curso?.categories.map((category) => (
                <Badge key={category.id}>{category.name}</Badge>
              ))}
            </div>
          }

          {curso?.topics && 
            <div className='my-2 flex flex-wrap gap-2 items-end'>
              <h3 className='leading-none'>Temas</h3>
              {curso?.topics.map((topic) => (
                <Badge key={topic.id}>{topic.name}</Badge>
              ))}
            </div>
          }
          
          <BuyButton
            link={curso?.link}
            extraClass='block md:hidden'
          />  

          <div ref={descriptionRef} className="editorjs my-4 flex flex-col gap-3">
          </div>
          
          <BuyButton
            link={curso?.link}
            extraClass='block md:hidden'
          /> 
      </div>

          <CardBuy
            title={curso.title}
            price={curso?.price}
            link={curso?.link}
            extraClass='hidden md:flex'
          />  
      </div>
        

        
    </section>
  )
}


function CardBuy({title, price, link, extraClass}) {
  return (
    <article className={`shrink-0 sticky mt-10 top-20 bg-white w-full max-w-[300px] shadow-xl rounded-lg flex flex-col ${extraClass}`}>
       
        
        <div className="flex flex-col gap-1 p-4">
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="font-medium font-lalezar text-lg">$ {price}</p>
            
            <BuyButton link={link} />
        </div>
        
    </article>
  )
}

function BuyButton({link, extraClass}) {
  return (
    <a className={`
    relative cursor-pointer text-center
    rounded text-white 
    w-full text-lg px-6 py-2 sm:text-xl 
    ${!link ? 'pointer-events-none bg-gray-500' : 'bg-primary-gradient' } ${extraClass}`}
    target='_blank' href={link}
  >Comprar Curso</a>
  )
}