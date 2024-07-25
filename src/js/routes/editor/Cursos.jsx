import React, { useRef } from "react";
import {axiosInstance} from "../../services/axios";
import { Form, useLoaderData, redirect } from 'react-router-dom'
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/card"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/breadcrumb"


import { Button } from "@components/button"

import { Input } from "@components/input"
import { Label } from "@components/label"

// import { DataTable } from "../../components/CursoTable";
import {CursosListActionDropdown, CursosListActionButtons} from "../../components/CursosListActions";

import { formatearFecha } from "../../utils/utils";

export default function Cursos() {
  // const submit = useSubmit()

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   submit(e.currentTarget)
  //   e.currentTarget?.reset()
  // }
  const createFormRef = useRef()
  const titleInputRef = useRef()
  const {cursos} = useLoaderData()
  console.log(cursos)

  console.log(cursos)
  return (
  <section >

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
                <BreadcrumbPage>Cursos</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  

    <div className="flex flex-col lg:flex-row gap-5 relative"> 
      <div className="">
      <Card className="w-[350px] sticky top-20">
          <CardHeader>
            <CardTitle className="text-2xl font-crimson">Registrar Curso</CardTitle>
            <CardDescription>Registra un nuevo Curso en tu sitio</CardDescription>
          </CardHeader>
          <CardContent>
            <Form id="create-curso" ref={createFormRef} method="post">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Nombre</Label>
                  <Input ref={titleInputRef} required name="title"  id="title" placeholder="Nombre del curso" />
                </div>
              
              </div>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => titleInputRef.current.value = ""} variant="outline">Limpiar</Button>
            <Button 
            type="submit"
            form="create-curso" 
            >Registrar</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grow">


        <h2 className="text-3xl">Cursos Registrados</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {cursos?.results?.map(curso => (
            <TableRow key={curso.id}>

              <TableCell 
                className="font-medium">{curso.is_public ? 'Público' : 'Editando'}</TableCell>
              <TableCell className="font-medium">{curso.title}</TableCell>
              <TableCell className="font-medium">{formatearFecha(curso.created)}</TableCell>
              
              <TableCell className="font-medium">
                <CursosListActionButtons id={curso.id} />
                <CursosListActionDropdown id={curso.id} />
              </TableCell>

            </TableRow>
            
          ))
          }
          </TableBody>
        </Table>

      </div>

    </div>
  </section>
  );
}

export async function CursosLoader() {
    const resp = await axiosInstance.get("cursos");
    return {cursos: resp.data};
  }
  

export async function CursosCreateAction({ request, params }) {
  const formData = await request.formData();
  
  switch (request.method) {
    case "POST": {

    const resp = await axiosInstance.post(
      "cursos",
      formData,
    );
    return redirect(`/editor/cursos/${resp.data.id}`);
    }
    case "DELETE": {
      const resp = await axiosInstance.delete(`cursos/${formData.id}/`);
      return redirect('/editor/cursos/', { replace: true })
    }
  }
}
