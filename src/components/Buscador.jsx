import { useState } from "react";

const PRESETS = [
    {q: "apollo", etiqueta: "Apollo"},
    {q: "mars", etiqueta: "Marte"},
    {q: "hubble", etiqueta: "Hubble"},
    {q: "artemis", etiqueta: "Artemis"},
];

export function Buscador({ consulta, onBuscar}){
    const [borrador, setBorrador] = useState(consulta);

    function enviar(evento){
        evento.preventDefault();
        onBuscar(borrador);
    }

    function elegirPreset(preset){
        setBorrador(preset);
        onBuscar(preset);
    }

    return (
        <>
            <form className="buscador" onSubmit={enviar}>
                <label htmlFor="query">Buscar en el archivo de la NASA</label>
                <input
                    id="query"
                    type="search"
                    value={borrador}
                    onChange={evento => setBorrador(evento.target.value)}
                    placeholder="Apollo, Marte, Hubble..."
                />
                <button type="submit">Buscar</button>
            </form>

            <div className="presets">
                {PRESETS.map(({q, etiqueta}) => (
                    <button
                        key={q}
                    type="button"
                    onClick={() => elegirPreset(q)}
                    >
                        {etiqueta}
                    </button>
                ))}
            </div>
        </>
    );
}