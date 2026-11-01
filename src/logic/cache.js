// apartado del bonus de la cache almacenada en localStorage durante 10 min

const CADUCIDAD = 10 * 60 * 1000; // 10 minutos en milisegundos

export function leerCache(clave){
    try{
        const guardado = JSON.parse(localStorage.getItem(clave)); // es null si la clave no existe
        if(!guardado) return null;
        if(Date.now() - guardado.guardoEn > CADUCIDAD) return null; // si ha pasado mas de 10 min desde que se guardo, se considera caducado
        return guardado.datos;
    }catch(error){
        return null;
    }
}

export function guardarCache(clave, datos){
    try{
        localStorage.setItem(clave, JSON.stringify({guardadoEn: Date.now(), datos}));
    }catch(error){
        console.warn("No se pudo guardar en cache", error);
    }
}

export function vaciarCache(){
    for(const clave of Object.keys(localStorage)){
        if(clave.startsWith("nasa:")){
            localStorage.removeItem(clave);
        }
    }
}