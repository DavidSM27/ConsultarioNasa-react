# NASA - Consultor de imagenes (React)

Aplicacion en React 19 que busca imagenes en el archivo publico de la NASA
([NASA Image and Video Library](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)).
Es la reconstruccion en React de la app de la mision anterior async-oddysey

## Tecnologia

- React 19 y Vite
- API publica de la NASA

## Que hace

- Busca por texto o con los botones rapidos.
- Muestra hasta 24 imagenes. Si una imagen no carga, su tarjeta desaparece.
- Filtra por decada: cada decada es un boton con el numero de imagenes que tiene.
- Muestra los estados de carga, error, sin resultados y busqueda vacia.
- Guarda cada busqueda 10 minutos en localStorage. "Vaciar cache" la borra y vuelve a pedir los datos.

## Decisiones

**Estado.** `App` solo guarda dos estados: `consulta`  y `decada`
. Las imagenes visibles, el conteo por decada y el numero de resultados se calculan en cada
render a partir de ellos, sin guardarlos en otro estado. El texto que se esta escribiendo en el
buscador vive dentro de `Buscador`, porque ningun otro componente lo necesita.

**Efectos.** Hay dos `useEffect`:
- En `useFetch`: pide los datos cuando cambia la url. Tiene una funcion de limpieza que pone a  la
  peticion como obsoleta, para que una respuesta lenta de una busqueda anterior no sustituya a la nueva.
- En `App`: cambia el titulo de la pestana segun la busqueda.

El filtro de decada se reinicia en la funcion `buscar` .

**Listas y condicionales.** Cada tarjeta usa `key={img.id}`; `normalizar`
descarta los ids repetidos. `Estado` elige el mensaje con `if / else if`.

**Hook personalizado.** `useFetch(url, { transformar, cacheKey })` hace la peticion, comprueba
`respuesta.ok`, usa la cache si se le pasa `cacheKey` y devuelve `datos`, `cargando`, `error` y
`reintentar`. Asi `App` no sabe nada de `fetch`.

## Declaracion de uso de IA

- **Herramienta:** Claude (Anthropic).
- **Para que se uso:** Se ha hecho uso de la ia para darme una vision general del proyecto y para estar de supervisor de lo que iba haciendo con mi codigo, mientras iba escribiendo, iba compartiendo con claude los avanzes que iba realizando y me daba algunas correciones o me verificaba el codigo siempre como ayudante y nunca dejando que el escribiera el codigo tal cual
- **Que es de la mision anterior:** la separacion en capas, `normalizar`, `contarPorDecada`, la cache de
  10 minutos y los estilos.
- **Que he hecho yo:** Yo he realizado toda la parte de la transformacion de los archivos antiguos de js a jsx. Aportando nuevas tecnicas logicas como el uso de los hooks.