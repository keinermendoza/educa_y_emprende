import React from 'react'
import PrimaryButton from './PrimaryButton'

export default function CursoCard({title, summary, categories, sub_categories, href, image}) {
  const lastCategory = categories?.length
  const lastSubCategory = sub_categories?.length
  console.log(lastCategory)
  return (
    <article className="bg-white h-full overflow-hidden shadow-xl rounded-lg flex flex-col">
        <figure className="h-56 w-full bg-gray-500">
            {image && <img className="transition-transform duration-300 hover:scale-110 object-cover h-full w-full" src={image} alt={title} />}
        </figure> 
        
        <div className="flex-1 flex flex-col gap-3 md:gap-4 p-4">
            <h4 className="font-medium text-xl sm:text-[1.65rem]">{title}</h4>
            <p className="flex-grow leading-tight text-base">{summary}</p>
            <p className="leading-tight text-base sm:text-lg">
              <>
              {categories?.map((category, index) => (
                <span
                className="font-semibold" 
                key={index}
                >{category} {index+1 === lastCategory ? ':' : '|'}</span>))}

                {sub_categories?.map((sub_category, index) => (
                  <span 
                  key={index}
                  > {sub_category.name} {index+1 !== lastSubCategory && '|'}</span>
                ))}
              </>

            </p>
            <PrimaryButton 
                href={href}
                extra_class="ml-auto"
            >Ver Más</PrimaryButton>
        </div>
        
    </article>
  )
}
