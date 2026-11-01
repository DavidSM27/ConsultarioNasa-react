import { useEffect, useState } from "react";
import { urlBusqueda, claveBusqueda } from "./api/nasa.js";
import { normalizarRespuesta, contarPorDecada, filtrarPorDecada } from "./logic/datos.js";
import { vaciarCache } from "./logic/cache.js";
import { useFetch } from "./hooks/useFetch.js";
import { Buscador } from "./components/Buscador.jsx";
import { Estado } from "./components/Estado.jsx";
import { FiltroDecadas } from "./components/FiltroDecadas.jsx";
import { Galeria } from "./components/Galeria.jsx";

const MAX_TARJETAS = 24;

export default function App(){
  //Estado minimo
  const [consulta, setConsulta] = useState("apollo");
  const [decada, setDecada] = useState(null); // null = todas las decadas

  const { datos, cargando, error, reintentar } = useFetch(urlBusqueda(consulta), {
    transformar: normalizarRespuesta,
    cacheKey: claveBusqueda(consulta),
  });

  const imagenes = (consulta && datos) || [];
  const conteo = contarPorDecada(imagenes);
  const visibles = filtrarPorDecada(imagenes, decada).slice(0, MAX_TARJETAS);

  //Efecto para sincronizar el titulo de la pagina con la busqueda
  useEffect(() => {
    document.title = consulta ? `NASA: ${consulta}` : "NASA";
  }, [consulta]);

  function buscar(texto){
    setConsulta(texto.trim().toLowerCase());
    setDecada(null);
  }

  function vaciar(){
    vaciarCache();
    reintentar();
  }

  return (
    <>
      <header>
        <h1>NASA</h1>
        <Buscador consulta={consulta} onBuscar={buscar} />
      </header>

      <main>
        <Estado
          consulta={consulta}
          cargando={cargando}
          error={error}
          mostrados={visibles.length}
          onReintentar={reintentar}
        />
        <FiltroDecadas conteo={conteo} total={imagenes.length} activa={decada} onElegir={setDecada} />
        <Galeria imagenes={visibles} />
      </main>

      <footer>
        <span>Imagenes del archivo publico de la NASA</span>
        <button type="button" onClick={vaciar}>
          Vaciar cache
        </button>
      </footer>
    </>
  );
}