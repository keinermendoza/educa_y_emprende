export function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', options);
}