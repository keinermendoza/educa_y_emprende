import React from 'react'
import ReactDOM  from 'react-dom/client'
// import App from './App'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// routes
import Cursos from './routes/editor/Cursos';
import CursoVistaPrevia from './routes/editor/CursoVistaPrevia'
import CursoEditando from './routes/editor/CursoEditando';
// layouts
// import AppLayout from './layout/AppLayout';
import AppLayout from './layouts/AppLayout';
import EditorContextProvider from './contexts/EditorContext';
// // loader

import { CursosLoader } from './routes/editor/Cursos';
import { CursoIdLoader } from './routes/editor/CursoId';
// import { TestimonialLoader } from './routes/Testimonials';
// import { ProjectsLoader } from './routes/Projects';

// // actions
import { CursosCreateAction } from './routes/editor/Cursos';
import { CursoIdDelete } from './routes/editor/CursoId';

// import { TestimonialCreateAction } from './routes/Testimonials';
// import { ProjectsCreateAction } from './routes/Projects';
const Outro = () => {
  return (
    <p>Outro</p>
  )
}
const router = createBrowserRouter([
  {
    path: "/editor",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to={'cursos'} />,
      },
      {
        path: "cursos",
        children: [
          {
            index: true,
            element: <Cursos />,
            loader: CursosLoader,
            action: CursosCreateAction,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <Navigate replace to={'editando'} />,
              },
              {
                path: "vista-previa",
                element: <CursoVistaPrevia />,
                loader: CursoIdLoader,

              },
              {
                path: "editando",
                element: <CursoEditando />,
                loader: CursoIdLoader,

              },
              {
                path: "delete",
                action: CursoIdDelete,
              }
            ]

          },
        ]
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('editor-root'))
  root.render(
    <React.StrictMode>
      <EditorContextProvider>
        <RouterProvider router={router}/>
      </EditorContextProvider>
    </React.StrictMode>
  )