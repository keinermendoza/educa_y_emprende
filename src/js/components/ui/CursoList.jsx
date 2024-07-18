import React from 'react'
import CursoCard from './CursoCard'
import CountResults from './CountResults'

export default function CursoList({cursos, count, search}) {
  return (
    <div id="partial-curso-list" class="">
        <CountResults count={count} search={search}  />
        <div class="grid grid-cols-1 gap-2 xl:gap-4 mdl:grid-cols-2 xl:grid-cols-3">
            {cursos.map((curso) => (
                <CursoCard 
                key={curso.id}
                title={curso.title}
                summary={curso.summary}
                categories={curso.categories}
                href={curso.href}
                image={curso.image}
                />
            
            ))}
    </div>
</div>

  )
}
