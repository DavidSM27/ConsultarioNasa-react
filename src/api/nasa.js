import { PREFIJO_CACEHE } from '../logic/cache.js';

const URL_BASE = "https://images-api.nasa.gov/search";

export function urlBusqueda(consulta){
    if(!consulta) return null;
    return `${URL_BASE}?q=${encodeURIComponent(consulta)}&media_type=image`;
}

export function claveBusqueda(consulta){
    return consulta ? `${PREFIJO_CACEHE}v2:${consulta}` : null;
}