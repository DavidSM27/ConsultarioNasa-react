import { useState } from "react";

export function Tarjeta({titulo, anio, imagen}) {
    const [fallida, setFallida] = useState(false);

    if (fallida) return null;

    return (
        <figure>
            <img src={imagen} alt={titulo} loding="lazy" onError={() => setFallida(true)} />
            <figcaption>{anio ? `${titulo} (${anio})` : titulo}</figcaption>
        </figure>
    )
}