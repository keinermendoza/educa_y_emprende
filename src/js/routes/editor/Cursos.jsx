import React from "react";
import {axiosInstance} from "../../services/axios";
import { Form, useLoaderData, redirect } from 'react-router-dom'
import CursoCard from "../../components/CursoCard";
// import { useSubmit } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../chadcn/components/ui/card"


export default function Cursos() {
  // const submit = useSubmit()

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   submit(e.currentTarget)
  //   e.currentTarget?.reset()
  // }
  const {cursos} = useLoaderData()
  console.log(cursos)

  console.log(cursos)
  return (
  <section>
      <h2>Cursos Registrados</h2>
      <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
      <div className="flex flex-col gap-2">

        {cursos?.results?.map(curso => (
            <CursoCard
              key={curso.id}
              id={curso.id} 
              title={curso.title} 
            />
        ))
        }
      </div>

    <Form  method="post">
      <label htmlFor="title">
        <span>Titulo</span>
      <input 
        placeholder="Registra un nuevo curso..."
        type="text"
        id="title"
        name="title" />
      </label>
      <button type="submit">Crear</button>
    </Form>

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
