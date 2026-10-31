import { Tarjeta } from "./Tarjeta.jsx";

export function Galeria({ imagenes }){
    return(
        <section className="galeria" aria-label="Resultados">
            {imagenes.map((img) => (
                <Tarjeta key={img.id} titulo={img.titulo} anio={img.anio} imagen={img.imagen} />
            ))}
        </section>
    );
}