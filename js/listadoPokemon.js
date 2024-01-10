import { datosPokemonUrl, urlLimitadaPokemon } from "./crudPokemon.mjs"

const contenedorTodosPokemon = document.getElementById(
  "contenedorTodosPokemon"
)
const informacion = document.getElementById("informacion")
const numPokemons = document.getElementById("numPokemon")
const boton = document.getElementById("enviar")
const textCarga = document.getElementById("textCarga")

/* Pintamos la lista de pokemon que nos ha devuelto la API */
const pintarPokemon = (pokemon) => {
  const elementos = document.createElement("div")
  elementos.dataset.url = pokemon.url // Poner la url para luego
  elementos.innerHTML = `
        <p class="seleccion">${pokemon.name}</p>
    `
  contenedorTodosPokemon.append(elementos)

  elementos.addEventListener("click", async (event) => {
    const url =
      event.target.tagName.toLowerCase() == "p"
        ? event.target.parentNode.dataset.url
        : event.target.dataset.url
    const pokemonElemento = await datosPokemonUrl(url)

    pintarDatosPokemon(pokemonElemento)
  })
}

/* Mostramos la información del pokemon pasado por parametro */
const pintarDatosPokemon = async (pokemon) => {
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

// Obtenemos todos los pokemon (lista)
const fetchAndDisplayPokemon = async () => {
  const todosPokemons = await urlLimitadaPokemon(numPokemons.value)
  // Lo pintamos con la función de antes
  todosPokemons.forEach((pokemon) => pintarPokemon(pokemon))
}

boton.addEventListener("click", (event) => {
  event.preventDefault()
  contenedorTodosPokemon.innerHTML = ''
  if (numPokemons.value != "") {
    textCarga.innerText = "Esperando a que seleciones un pokemon"
    fetchAndDisplayPokemon()
  } else {
    alert("Obligatorio poner el numero de pokemons")
  }
  numPokemons.value = ""
})
