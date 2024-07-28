import React from 'react'
import ReactDOM  from 'react-dom/client'

// import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cursos from './routes/public/Cursos';
// import { CursosLoader } from './routes/Cursos';

const Outro = () => {
  return (
    <p>Outro</p>
  )
}
const router = createBrowserRouter([
  {
    path: "/cursos",
    element: <Cursos />,
    // loader: CursosLoader,
    }
]);


const root = ReactDOM.createRoot(document.getElementById('cursos-root'))
  root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
  )