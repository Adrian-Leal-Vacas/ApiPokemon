import { obtenerUrlPorNombre, datosPokemonUrl } from "./crudPokemon.mjs"

const nombrePokemon = document.getElementById("pokemon")
const informacion = document.getElementById("informacion")
const buscar = document.getElementById("buscar")

/* Mostramos la información del pokemon pasado por parametro */
const pintarElemento = async (pokemon) => {
  informacion.innerHTML = `
    <div>
        <img src="${pokemon.sprites.front_default}" alt="">
        <h1>${pokemon.name}</h1>
    </div>
    <div>
        <div>
            <p>Tipo: ${pokemon.types[0].type.name}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
            <p>Movimientos: ${pokemon.moves[0].move.name} </p>
        </div>
        <div>
            <p>Habilidades: ${pokemon.abilities[0].ability.name} </p>
            <p>Formas posibles: ${pokemon.forms[0].name} </p>
            <p>Experiencia Base: ${pokemon.base_experience} </p>
            <p>ID: ${pokemon.id} </p>
        </div>
    </div>
    `
}

buscar.addEventListener("click", async () => {
  const url = await obtenerUrlPorNombre(nombrePokemon.value.toLowerCase())

  if (url) {
    const pokemon = await datosPokemonUrl(url)
    pintarElemento(pokemon)
  } else {
    informacion.innerHTML = `<h1 id="textCarga">No se ha encontrado el pokemon escrito</h1>
        <img class="imgCarga" src="../img/espera.gif" alt="Esperando al pokemon">`
  }
})
