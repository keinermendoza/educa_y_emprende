import React from 'react'

export default function FilterAside({handleSearch, brands, categories, categoriesSelected, handleCategorySelect}) {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h3 className="font-lalezar">Motivación</h3>

            <div>
                <label className="flex gap-2 items-center">
                    <input
                        onChange={handleSearch}
                        checked={brands.includes('per')}
                        name="brand__name" value="per" type="checkbox"/>
                    <span>Desarrollo Personal</span>
                </label>
            </div>
            <div>
                <label className="flex gap-2 items-center" >
                        
                <input
                    onChange={handleSearch}
                    checked={brands.includes('pro')}
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
        
            <div className="flex  gap-2 items-center">
                <input id="guitarra" name="guitarra" type="checkbox"/>
                <label for="guitarra">Guitarra</label>
            </div>
            <div>
                <input id="germinado-de-plantas" name="germinado-de-plantas" type="checkbox"/>
                <label for="germinado-de-plantas">Germinado de Plantas</label>
            </div>
            <div>
                <input id="muebles-de-roble" name="muebles-de-roble" type="checkbox"/>
                <label for="muebles-de-roble">Muebles de Roble</label>
            </div>
        </div>
        
    </div>
  )
}
