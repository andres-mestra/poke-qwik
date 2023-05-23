import type { PokemonListResponse, PokemonSmall } from '~/components/interfaces'
import { LIMIT_DEFAULT, OFFSET_MIN } from '~/constants'

export async function getPokemonsSmall(
  offset = OFFSET_MIN,
  limit = LIMIT_DEFAULT
): Promise<PokemonSmall[]> {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
  const data = (await resp.json()) as PokemonListResponse

  return data.results.map(({ url, name }) => {
    const segments = url.split('/')
    const id = segments.at(-2)!

    return { id, name }
  })
}
