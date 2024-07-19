import React from 'react'
import axiosInstance from '../services/axios';
import FilterAside from '../components/ui/FilterAside';
import CursoList from '../components/ui/CursoList';
import SearchBar from '../components/ui/SearchBar';
import { useSearchParams } from 'react-router-dom';
// import { useLoaderData } from 'react-router-dom';

import { useState, useEffect, useRef } from 'react';
export default function Cursos() {

  const [searchParams, setSearchParams] = useSearchParams();
  
  // Inicialización de los estados con valores de parámetros de búsqueda
  const initialBrands = searchParams.getAll('brand') || [];
  const initialTitle = searchParams.get('title') || '';

  const [brands, setBrands] = useState(initialBrands);
  const [title, setTitle] = useState(initialTitle);
  const [cursos, setCursos] = useState(null);
  const [count, setCount] = useState(null)
  const [categories, setCategories] = useState([])
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [categoriesSelected, setCategoriesSelected] = useState(searchParams.getAll('categories') || [])

  const handleCategorySelect = (e) => {
    const value = e.target.value;
    setCategoriesSelected(prev =>
      prev.includes(value)
        ? prev.filter(cat => cat !== value)
        : [...prev, value])

  }

  const updateCategories = async () => {
    const params = new URLSearchParams();
    brands.forEach(brand => params.append('brand', brand));
    const response =  await axiosInstance.get("filter/categories" + "?" + params.toString());
    setCategories(response.data)
    return response.data
  }

  

  useEffect(() => {
    // Actualizar los parámetros de búsqueda en la URL
    // updateCategories()
    const getCursos = async (params) => {
      try {
        // setLoading(true);
        const response = await axiosInstance.get("filter/cursos" + "?" + params.toString());
        // if (!response.ok) {
        //   throw new Error('Error en la solicitud');
        // }
        setCursos(response.data.results);
        setCount(response.data.count)
      } catch (error) {
        console.error(error)
        // setError(error.message);
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    const updateParams = async () => {
      const params = new URLSearchParams();
      brands.forEach(brand => params.append('brand', brand));

      if (title) params.append('title', title);

      const new_categories = await updateCategories()
      if (categoriesSelected) {
        categoriesSelected.forEach((cat) => {
        if( new_categories.includes(cat)) {
          params.append('categories', cat)
        }
      } 
    )}

    getCursos(params)
    setSearchParams(params);
    }


    // Realizar la solicitud GET
    
    updateParams()
    
  }, 
  [title, brands, categoriesSelected]);

  const handleBrandsChange = (e) => {
    const value = e.target.value;
    setBrands(prevBrands =>
      prevBrands.includes(value)
        ? prevBrands.filter(brand => brand !== value)
        : [...prevBrands, value]
    );
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const [filterMobileOpen, setFilterMobileOpen] = useState(false)

 
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <>
    <div onClick={() => {setFilterMobileOpen(true)}}
      className="block xs:hidden fixed z-30 text-white w-12 h-12 top-20 left-0 p-2 rounded-e-full bg-secondary-gradient
      transition-transform
      before:-translate-x-8 before:top-0 before:left-0 before:bg-secondary-gradient before:absolute  before:w-12  before:h-12
      hover:translate-x-4 ">
      <svg className="w-full h-full" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/></svg>
  </div>

  <div className={`block xs:hidden z-40 -translate-x-[100%] transition-all fixed
    w-[calc(100%-2rem)] p-4 rounded-lg left-0 top-16 bg-white bg-opacity-70 backdrop-blur ${filterMobileOpen && 'translate-x-0' }`}>

    <div
      onClick={() => {setFilterMobileOpen(false)}}
        className="transition-all absolute top-1 right-1 w-8 h-8 text-red-500 hover:text-red-700 hover:scale-110">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94z" clip-rule="evenodd"/></svg>
    </div>
  <FilterAside
  brands={brands}
  handleSearch={handleBrandsChange}
  categories={categories}
  handleCategorySelect={handleCategorySelect}
  categoriesSelected={categoriesSelected}
   />
  </div>

    <div class="flex gap-2 xl:gap-4">
        <aside class="hidden xs:flex  rounded-md  flex-col text-lg xl:text-xl p-4 w-full max-w-56 xl:max-w-72">
          <FilterAside 
          brands={brands}
          handleSearch={handleBrandsChange}
          categories={categories}
          handleCategorySelect={handleCategorySelect}
          categoriesSelected={categoriesSelected}

          />
        </aside>
        <main class=" to-blue-600">
            <h4 class="text-center text-4xl mb-6">Bienvenido a Nuestro Panel de Busqueda</h4>
            <SearchBar handleSearch={handleTitleChange} />
            <CursoList
              count={count}
              cursos={cursos}
              search={title}
              
            />
        </main>
    </div>
  </>

  )
}

// export async function CursosLoader() {
//     const resp = await axiosInstance.get("filter/cursos");
//     return {cursos: resp.data};
//   }

