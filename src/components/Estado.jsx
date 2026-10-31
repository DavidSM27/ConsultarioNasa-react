// Se encarga del estado de la busqueda para que los lectores anuncien los cambios.

export function Estado({ consulta, cargando, error, mostrados, onReintentar}){
    let contenido;

    if(cargando){
        contenido = "Cargando...";
    }else if(error){
        contenido = (
            <>
                No se pudo completar la busqueda{" "}
                <button type="button" onClick={onReintentar}>
                    Reintentar
                </button>
            </>
        );
    }else if(!consulta){
        contenido = "Escribe tu busqueda";
    }else if(mostrados === 0){
        contenido = `Sin resultados para «${consulta}».`;
    }else{
        contenido = `Mostrando ${mostrados} resultados.`;
    }

    return (
        <p className="estado" role="status">
            {contenido}
        </p>
    )
}