import React from 'react'
import CursoCard from './CursoCard'
import CountResults from './CountResults'
import CursoPagination from './CursoPagination'

export default function CursoList({pageRef, cursos, count, search, handleChangePage, nextPage, prevPage}) {
  return (
    <div id="partial-curso-list" 
      className="relative overflow-x-hidden"
      ref={pageRef}
      onAnimationEnd={() => {
        if (pageRef.current) {
          pageRef.current.style.animation = "";
        }
      }}
      >
        <CountResults count={count} search={search}  />
        <div className="grid grid-cols-1 gap-2 xl:gap-4 mdl:grid-cols-2 xl:grid-cols-3">
            {cursos?.map((curso) => (
                <CursoCard 
                key={curso.id}
                title={curso.title}
                summary={curso.summary}
                categories={curso.categories}
                href={curso.href}
                image={curso.image}
                topics={curso.topics}
                />
            
            ))}
    </div>
    <CursoPagination 
    handleChangePage={handleChangePage}
    nextPage={nextPage} 
    prevPage={prevPage}

    />
</div>

  )
}
