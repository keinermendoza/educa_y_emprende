import React from 'react'

export default function FilterAside() {
  return (
    <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
        <h3 className="font-lalezar">Motivación</h3>

        <div>
            <label className="flex gap-2 items-center"
            >
                <input
                    name="brand_name" value="per" x-ref="per" type="checkbox"/>
                <span>Desarrollo Personal</span>
            </label>
        </div>
        <div>
            <label className="flex gap-2 items-center" 
            >
                    
            <input
                name="brand_name" value="pro" type="checkbox"/>
               <span>Crecimiento Profesional</span> 
            </label>
        </div>
    </div>

    <div className="flex flex-col gap-2">
        <h3 className="font-lalezar">Categorías</h3>
    
        <div className="flex  gap-2 items-center">
            <input x-model="categories" id="musica" name="musica" type="checkbox"/>
            <label for="musica">Música</label>
        </div>
        <div>
            <input id="jardineria" name="jardineria" type="checkbox"/>
            <label for="jardineria">Jardinería</label>
        </div>
        <div>
            <input id="carpinteria" name="carpinteria" type="checkbox"/>
            <label for="carpinteria">Carpinteria</label>
        </div>
    </div>

    <div className="flex flex-col gap-2">
        <h3 className="font-lalezar">Subcategoría</h3>
    
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
