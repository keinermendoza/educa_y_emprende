// src/axiosConfig.js
import axios from 'axios';

// Obtener el token CSRF desde el meta tag
// const getCsrfToken = () => {
//     const token = document.querySelector('meta[name="csrf-token"]');
//     return token && token.content;
// };

// // Crear una instancia de axios
 const axiosInstance = axios.create({
    baseURL: process.env.REACT_API_ENDPOINT, // Ajusta esto según tu configuración
    withCredentials: true, // Esto asegura que se envíen las cookies con cada solicitud
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: "X-CSRFTOKEN"
});



const clientAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Ajusta esto según tu configuración
    withCredentials: true, // Esto asegura que se envíen las cookies con cada solicitud
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: "X-CSRFTOKEN"
});

export {axiosInstance, clientAxios};