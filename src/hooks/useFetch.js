import { useEffect, useState } from "react";
import { leerCache, guardarCache } from "../logic/cache.js";

const IDENTIDAD = (valor) => valor;

export function useFetch(url, { transformar = IDENTIDAD, cacheKey = null } = {}){
    const [intento, setIntento] = useState(0);
    const [resultado, setResultado] = useState({ peticion: null, datos: null, error: null});

    const peticion = url === null ? null : `${url}#${intento}`;

    useEffect(() => {
    if (peticion === null) return;

    const controlador = new AbortController();

    async function cargar() {
      try {
        const cacheado = cacheKey ? leerCache(cacheKey) : null;
        if (cacheado) {
          setResultado({ peticion, datos: cacheado, error: null });
          return;
        }

        const respuesta = await fetch(url, { signal: controlador.signal });
        if (!respuesta.ok) {
          throw new Error(`Error en la llamada a la API: ${respuesta.status}`);
        }

        const datos = transformar(await respuesta.json());
        if (cacheKey) guardarCache(cacheKey, datos);
        setResultado({ peticion, datos, error: null });
      } catch (error) {
        if (error.name === "AbortError") return; // peticion obsoleta: se ignora
        setResultado({ peticion, datos: null, error });
      }
    }

    cargar();
    return () => controlador.abort();
  }, [peticion, url, transformar, cacheKey]);

  const esActual = resultado.peticion === peticion;

  return {
    datos: esActual ? resultado.datos : null,
    error: esActual ? resultado.error : null,
    cargando: peticion !== null && !esActual,
    reintentar: () => setIntento((n) => n + 1),
  };
}


