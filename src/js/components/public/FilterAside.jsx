import React from 'react'

export default function FilterAside({handleSearch, brands, brandsSelected, categories, categoriesSelected, handleCategorySelect, topics ,topicsSelected, handleTopicSelect}) {

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h3 className="font-lalezar">Motivación</h3>

            <div>
                <label className="flex gap-2 items-center">
                    <input
                        onChange={handleSearch}
                        checked={brandsSelected.includes('per')}
                        name="brand__name" value="per" type="checkbox"/>
                    <span>Desarrollo Personal</span>
                </label>
            </div>
            <div>
                <label className="flex gap-2 items-center" >
                        
                <input
                    onChange={handleSearch}
                    checked={brandsSelected.includes('pro')}
                    name="brand__name" value="pro" type="checkbox"/>
                <span>Crecimiento Profesional</span> 
                </label>
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <h3 className="font-lalezar">Categorías</h3>
            {categories?.map(category => (

            <div key={category}>
                <label className="flex gap-2 items-center" >
                        
                <input
                    value={category}
                    onChange={handleCategorySelect}
                    checked={categoriesSelected.includes(category)}
                    name="categories" type="checkbox" />
                <span>{category}</span> 
                </label>
            </div>
            

            ))}
        </div>
        
    
    

        <div className="flex flex-col gap-2">
            <h3 className="font-lalezar">Temas</h3>
        
            {topics?.map(topic => (

            <div key={topic}>
                <label className="flex gap-2 items-center" >
                        
                <input
                    value={topic}
                    onChange={handleTopicSelect}
                    checked={topicsSelected.includes(topic)}
                    name="topics" type="checkbox" />
                <span>{topic}</span> 
                </label>
            </div>

            ))}
        </div>
        
    </div>
  )
}
