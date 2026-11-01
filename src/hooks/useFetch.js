import { useEffect, useState } from "react";
import { leerCache, guardarCache } from "../logic/cache.js";

// Hook personalizado: pide una url, y devuelve los datos, si esta cargando y si hubo error.
// Si se le pasa cacheKey, guarda y lee el resultado de localStorage (cache de 10 min).
export function useFetch(url, { transformar, cacheKey }){
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [intento, setIntento] = useState(0); // al subirlo, el efecto se vuelve a ejecutar (reintentar)

    useEffect(() => {
        if(!url) return;

        // Si la url cambia mientras esperamos, esta peticion queda obsoleta
        // y su resultado se ignora (asi una respuesta lenta no pisa a una mas nueva)
        let cancelado = false;

        async function cargar(){
            setCargando(true);
            setError(null);
            setDatos(null);

            try{
                let resultado = cacheKey ? leerCache(cacheKey) : null;

                if(!resultado){
                    const respuesta = await fetch(url);
                    if(!respuesta.ok){
                        throw new Error(`Error en la llamada a la API: ${respuesta.status}`);
                    }
                    resultado = transformar(await respuesta.json());
                    if(cacheKey) guardarCache(cacheKey, resultado);
                }

                if(!cancelado) setDatos(resultado);
            }catch(error){
                if(!cancelado) setError(error);
            }finally{
                if(!cancelado) setCargando(false);
            }
        }

        cargar();

        // Limpieza: se ejecuta antes de la siguiente peticion o al desmontar
        return () => {
            cancelado = true;
        };
    }, [url, cacheKey, transformar, intento]);

    return {
        datos,
        cargando,
        error,
        reintentar: () => setIntento((n) => n + 1),
    };
}
