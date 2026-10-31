// Cambia el texto de estadisticas de la anterior entrega, ahora cada decada es un boton que filtra las fotos

export function FiltroDecadas({ conteo, total, activa, onElegir}){
    const decadas = Object.entries(conteo).sort(([a], [b]) => a.localeCompare(b));

    if(decadas.length === 0) return null;

    return (
        <div className="decadas" role="group" aria-label="Filtrar por decada">
            <button type="button" aria-pressed={activa === null} onClick={() => onElegir(null)}>
                Todas ({total})
            </button>
            {decadas.map(([decada, n]) => (
                <button 
                    key={decada}
                    type="button"
                    aria-pressed={activa === decada}
                    onClick={() => onElegir(decada)}
                >
                    {decada} ({n})
                </button>
            ))}
        </div>
    );
}