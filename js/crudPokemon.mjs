const BASEURL = "https://pokeapi.co/api/v2/pokemon"

/* Total de pokemon que nos da la API */
const numTotalPokemons = async () => {
  try {
    const respuesta = await axios.get(BASEURL)
    return respuesta.data.count
  } catch (error) {
    console.log(error)
  }
}

/* Obtener todos los pokemons */
const obtenerAllPokemons = async () => {
  try {
    const totalPokemon = await numTotalPokemons()
    const respuesta = await axios.get(`${BASEURL}?limit=${totalPokemon}`)
    return respuesta.data.results
  } catch (error) {
    console.log(error)
  }
}

/* Obtener la URL por el nombre que nos pase */
export const obtenerUrlPorNombre = async (name) => {
  const todosLosPokemons = await obtenerAllPokemons()
  const urlPokemon = todosLosPokemons.find((el) => el.name === name)
  return urlPokemon ? urlPokemon.url : null
}

/* Obtiene los datos del pokemon pasado por url */
export const datosPokemonUrl = async (url) => {
  try {
    const respuesta = await axios.get(url)
    return respuesta.data
  } catch (error) {
    console.log(error)
  }
}

/* Limitar los pokemon que se muestre */
export const urlLimitadaPokemon = async (limite) => {
  try {
    const respuesta = await axios.get(`${BASEURL}?limit=${limite}`)
    return respuesta.data.results
  } catch (error) {
    console.log(error)
  }
}
