// Esta la parte logica: se transforman los datos usando el map, el filter y el reduce

function decadaDe(anio){
    return `${Math.floor(anio / 10) * 10}s`;
}

//Vamos a convertir los items crudos de la API en objetos sencillos faciles de manejar
export function normalizar(items){
    const imagenes = items
        .map((item) => ({
            id: item.data?.[0]?.nasa_id,
            titulo: item.data?.[0]?.title,
            anio: Number(item.data?.[0]?.date_created?.slice(0, 4)) || null,
            imagen: item.links?.[0]?.href,
        }))
        .filter((img) => img.id && img.titulo && img.imagen);
    
    return [...new Map(imagenes.map((img) => [img.id, img])).values()]; // descartamos todo aquello que no se puede pintar
}

export function normalizarRespuesta(json){
    return normalizar(json?.collection?.items ?? []);
}

// Contamos las imagenes por decada
export function contarPorDecada(imagenes){
    return imagenes.reduce((contador, img) => {
        if(!img.anio) return contador;
        const decada = decadaDe(img.anio);
        contador[decada] = (contador[decada] ?? 0) + 1;
        return contador;
    }, {})
}

// decada == null son todas las decadas
export function filtrarPorDecada(imagenes, decada){
    if(!decada) return imagenes;
    return imagenes.filter((img) => img.anio && decadaDe(img.anio) === decada);
}