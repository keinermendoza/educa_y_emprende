import React, { useEffect, useRef, useContext, useState } from 'react'

import { EditorContext } from '../../contexts/EditorContext';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import {axiosInstance} from '../../services/axios';
import ReactFileReader from "react-file-reader";
import { Link } from 'react-router-dom';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@components/breadcrumb"

import { Input } from "@components/input"
import { Label } from "@components/label"
import { Switch } from "@components/switch"
import { Button } from '@components/button';
import { Save } from 'lucide-react' 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@components/select"

  import { Textarea } from "@components/textarea"
import DialogInputCreate from '../../components/editor/DialogInputCreate';
import DropdownEditDelete from '../../components/editor/DropdownEditDelete';

import { Alert, AlertDescription, AlertTitle } from "@components/alert"

export default function CursoEditando() {
    const {id} = useParams()
    const {curso} = useLoaderData()
    const navigate = useNavigate()

    const [title, setTilte] = useState(curso?.title)
    const [link, setLink] = useState(curso?.link || '')
    const [price, setPrice] = useState(curso?.price || '')
    const [summary, setSummary] = useState(curso?.summary || '')



    const [isPublic, setIsPublic] = useState(curso?.is_public || false)

    // image preview and file
    const [imagePreview, setImagePreview] = useState(curso?.image)
    const [imageFile, setImageFile] = useState(null)
    const [brand, setBrand] = useState(curso?.brand)
    const [categories, setCategories] = useState(curso?.categories?.map(cat => cat.id) || [])
    const [topics, setTopics] = useState(curso?.topics?.map(top => top.id) || [])


    const [availableCategories, setAvailableCategories] = useState(null)
    const [availableTopics, setAvailableTopics] = useState(null)


    // create categories and topics
    const [newCategory, setNewCategory] = useState(null)
    const [newTopic, setNewTopic] = useState(null)

    // edit existing categories and topics
    const [editCategory, setEditCategory] = useState(null)
    const [editTopic, setEditTopic] = useState(null)
    
    // init editorjs
    const editorRef = useRef(null)
    const {initEditor, editorInstanceRef} = useContext(EditorContext)
    const initialDescription = useRef(curso?.description || {})

    useEffect(() => {
        if (!editorRef.current) {
            initEditor({id:id, data:initialDescription.current})
            editorRef.current = true
        }
        const getData = async () => {
            try {
                const catResp = await axiosInstance.get('categories')
                const topicsResp = await axiosInstance.get('topics')
                setAvailableCategories(catResp.data)
                setAvailableTopics(topicsResp.data)
            } catch(err) {
                console.error(err)
            }
        }
        getData()
    },[])

    const handleTopicCreate = async () => {
        try {
            const resp = await axiosInstance.post('topics', {name:newTopic})
            setAvailableTopics(prev => [...prev, resp.data])
        } catch(err) {
            console.error(err)
        }
    }

    const handleCategoryCreate = async () => {
        try {
            const resp = await axiosInstance.post('categories', {name:newCategory})
            setAvailableCategories(prev => [...prev, resp.data])
        } catch(err) {
            console.error(err)
        }
    }

    const handleBrandChange = (value) => {
        setBrand(value)
    }
    const handleCategorySelect = (e) => {
        const value = parseInt(e.target.value);
        setCategories(prev =>
          prev.includes(value)
            ? prev.filter(cat => cat !== value)
            : [...prev, value])
      }

    const handleTopicSelect = (e) => {
        const value = parseInt(e.target.value);
        setTopics(prev =>
          prev.includes(value)
            ? prev.filter(top => top !== value)
            : [...prev, value])
      }

    const handleUploadImage = (files) => {
        // get file
        const file = files[0]
        setImageFile(file)

        // handle image preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSummaryChange = (e) => {
        const value = e.target.value 
        if (value.length > 152) return;
        setSummary(value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        // getting editorJs data
        let description
        try {
            description = await editorInstanceRef.current.save()
            editorInstanceRef.current.destroy()
        } catch(err) {
            console.error(err)
        }
     
        // putting all data together
        const formData = new FormData()
        formData.append('is_public', isPublic)
        formData.append('title', title)
        formData.append('brand', brand)
        formData.append('link', link)
        formData.append('price', price)
        formData.append('summary', summary)


        categories.forEach(category => formData.append('categories', category));
        topics.forEach(topic => formData.append('topics', topic));

        formData.append('description', JSON.stringify(description))
        if(imageFile) {
            formData.append('image', imageFile)
        }
    
        try {
            const resp = await axiosInstance.put(`cursos/update/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            navigate('../vista-previa', { replace: true })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>

        <Breadcrumb className="mt-1 mb-2 w-fit mx-auto">
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
                    <BreadcrumbLink asChild>
                    <Link to='../vista-previa'>
                        {curso.title}
                    </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>editando...</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        
            <h1 className='text-2xl w-fit mx-auto'>Editando curso: <span className='text-orange-500'>{title}</span></h1>
            
            <form className='mx-auto w-full max-w-3xl flex flex-col gap-4' method='post' onSubmit={handleSubmit} >
                <Alert className='flex flex-col gap-2'>
                    <div className="flex flex-col space-y-1.5">
                    <Label className='text-lg' htmlFor="title">Nombre</Label>
                    <Input 
                        value={title}
                        onInput={(e) => setTilte(e.target.value)}
                        required
                        name="title"
                        id="title"
                        placeholder="Nombre del curso" />
                    </div>

                    <div className='relative w-[clamp(100%,350px,20vw)] h-[350px] rounded-md '>
                        <figure className='w-full h-full overflow-hidden bg-gray-300'>
                            {imagePreview && <img className='object-cover h-full w-full' src={imagePreview} alt="introduzca su imagen aqui" />}
                        </figure>

                        <ReactFileReader
                            fileTypes={[".png", ".jpg", ".jpeg", ".webp"]}
                            handleFiles={handleUploadImage} >
                            <button
                                type='button'
                                className='absolute bottom-0 right-0 rounded-full grid place-content-center p-1  border-solid 
                                bg-gray-300 border-2 border-black transition-transform hover:scale-110'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><path fill="currentColor" d="m9.6 40.4l2.5-9.9L27 15.6l7.4 7.4l-14.9 14.9zm4.3-8.9l-1.5 6.1l6.1-1.5L31.6 23L27 18.4z"/><path fill="currentColor" d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5z"/><path fill="currentColor" d="m29.298 19.287l1.414 1.414l-13.01 13.02l-1.414-1.41zM11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2zm24-16.6L27.6 15l3-3l.5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5zM30.4 15l4.6 4.6l.9-.9c-.5-2.3-2.3-4.1-4.6-4.6z"/></svg>
                            </button>
                    </ ReactFileReader >
                    </div>
                </Alert>


                <Alert>

                 <div className="flex items-center space-x-2">
                     <Switch
                         checked={isPublic}
                         onCheckedChange={() => setIsPublic((prev) => !prev)}
                         name="is_public"
                     />
                     <Label 
                        className='text-lg'
                        onClick={() => setIsPublic((prev) => !prev)}
                        htmlFor="is_public">
                            Hacer Curso Público
                    </Label>
                 </div>
                 </Alert>

                <Alert>
                    <Label className='text-lg mb-2'>Motivación</Label>
                    <Select
                        defaultValue={brand} 
                        onValueChange={(value) => handleBrandChange(value)} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Motivación del Curso" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="per">Desarrollo Personal</SelectItem>
                            <SelectItem value="pro">Crecimiento Profesional</SelectItem>
                        </SelectContent>
                    </Select>
                </Alert>

                <Alert>
                <div className="flex flex-col space-y-1.5">
                    <Label className='text-lg' htmlFor="link">Link de Referido</Label>
                    <Input 
                        value={link}
                        onInput={(e) => setLink(e.target.value)}
                        name="link"
                        id="link"
                        placeholder="link proporcionado por hotmart" />
                    </div>
                </Alert>

                <Alert>
                <div className="flex flex-col space-y-1.5">
                    <Label className='text-lg' htmlFor="price">Precio</Label>
                    <Input 
                        type='number'
                        value={price}
                        onInput={(e) => setPrice(e.target.value)}
                        name="price"
                        id="price"
                        placeholder="99.99" />
                    </div>
                </Alert>

                <Alert>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor='summary' className='text-lg' >Resumen</Label>
                        <p>Lo que escribas aquí aparecera en la tarjeta del curso</p>
                        <Textarea
                            value={summary}
                            onInput={handleSummaryChange}
                            name="summary"
                            id="summary"
                            placeholder="Escribe lo más interesante de este curso" />
                        <p className='ms-auto text-gray-600'>Espacios usados {summary?.length}/152</p>

                    </div>
                </Alert>


                

                <Alert className='flex flex-col gap-2'>
                    <h4 className='text-lg'>Categorías</h4>
                    <p>Selecciona todas las categorías que tienen relacion con el Curso. Tambien puedes agregar una nueva categoría usando el siguiente botón.</p>

                    <DialogInputCreate 
                        btnText='Crear Nueva Categoría'
                        title='Nueva Categoría'
                        helpText='Escribe el nombre de la nueva categoría'
                        setValue={setNewCategory}
                        value={newCategory}

                        handleSave={handleCategoryCreate}
                    />

                    {availableCategories?.map((category) => (
                        <div 
                            key={category.id}
                            className="flex justify-between">
                            <Label
                                className='w-fit flex gap-2 items-center'
                            >
                                <input
                                    type='checkbox'
                                    value={category.id}
                                    checked={categories.includes(category.id)}
                                    onChange={handleCategorySelect} 
                                    />
                                <span>{category.name}</span>
                            </Label>

                            <DropdownEditDelete
                                title='Categoría'
                                initialValue={category}
                                setListState={setAvailableCategories}
                                endpoint={`categories/${category.id}/`}
                            />

                        </div>

                    ))}
                </Alert>



                <Alert className='flex flex-col gap-2'>
                    <h4 className='text-lg'>Temas</h4>
                    <p>Selecciona todos los temas que tienen relacion con el Curso. Tambien puedes agregar un nuevo tema usando el siguiente botón.</p>
                    
                    <DialogInputCreate
                        btnText='Crear Nuevo Tema'
                        title='Nuevo Tema'
                        helpText='Escribe el nombre del nuevo tema'
                        setValue={setNewTopic}
                        value={newTopic}
                        handleSave={handleTopicCreate}
                    />

                    {availableTopics?.map((topic) => (
                    <div 
                        key={topic.id}
                        className="flex justify-between">
                        <Label className='w-fit flex gap-2 items-center'>
                            <input
                                type='checkbox'
                                value={topic.id}
                                checked={topics.includes(topic.id)}
                                onChange={handleTopicSelect} 
                                />
                            <span>{topic.name}</span>
                        </Label>

                        <DropdownEditDelete
                            title='Tema'
                            titleIsFem={false}
                            initialValue={topic}
                            setListState={setAvailableTopics}
                            endpoint={`topics/${topic.id}/`}
                        />
                    </div>
                    ))}
                </Alert>

                <Alert>
                  <AlertTitle>Descripción del Curso</AlertTitle>
                    <AlertDescription>
                        <div className="editorjs" id="editorjs"></div>
                    </AlertDescription>
                    <h4></h4>
                </Alert>
   
             
                <Button >
                    <Save className="mr-2 h-4 w-4"  />
                    Guardar
                </Button>
                
            </form>
        </>
    )
}
