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
      const edjsParser = edjsHTML();
      let description = edjsParser.parse(curso?.description);
      descriptionRef.current.innerHTML = description.join(' ')
    },[])

    return (
    <section>

      <Breadcrumb className="mt-1 mb-2">
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink>
                    <Link to='/editor'>
                        Sitio del Editor
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink>
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

    <Link className='flex gap-2 text-white w-fit p-2 rounded-md bg-secondary-gradient' to='../editando'>
      <SquarePen />
      <span>Editar</span>
    </Link>

      <div className="flex flex-col gap-2 md:flex-row justify-between items-center ">
        <p>Este curso {!curso.is_public && 'NO'} es público</p>
      </div>

      <h2 className='text-4xl'>{curso.title}</h2>

        <figure className=''>
          <img 
            className=''
            src={curso?.image} 
            alt={curso.title} />
        </figure>
        
        {curso?.categories && 
        <div>
          <h4>Categorías</h4>
          <div className='flex gap-2'>
            {curso?.categories.map((category) => (
              <Badge key={category.id}>{category.name}</Badge>
            ))}
          </div>
        </div>
        }

        {curso?.topics && 
        <div>
          <h4>Temas</h4>
          <div className='flex gap-2'>
            {curso?.topics.map((topic) => (
              <Badge key={topic.id}>{topic.name}</Badge>
            ))}
          </div>
        </div>
        }

        {isEdited
          ? (<p className=''>Actualizado el {formatearFecha(curso.updated)}</p>)
          : (<p className=''>Creado el {formatearFecha(curso.created)}</p>)
        }
        
        <div ref={descriptionRef} class="editorjs flex flex-col gap-3">
        </div>
        
    </section>
  )
}
