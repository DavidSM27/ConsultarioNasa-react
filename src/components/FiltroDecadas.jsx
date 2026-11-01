// Cambia el texto de estadisticas de la anterior entrega, ahora cada decada es un boton que filtra las fotos

export function FiltroDecadas({ conteo, total, activa, onElegir}){
    const decadas = Object.entries(conteo).sort(([a], [b]) => a.localeCompare(b));

    if(decadas.length === 0) return null;

    return (
        <div className="decadas">
            <button type="button" className={activa === null ? "activo" : ""} onClick={() => onElegir(null)}>
                Todas ({total})
            </button>
            {decadas.map(([decada, n]) => (
                <button 
                    key={decada}
                    type="button"
                    className={activa === decada ? "activo" : ""}
                    onClick={() => onElegir(decada)}
                >
                    {decada} ({n})
                </button>
            ))}
        </div>
    );
}