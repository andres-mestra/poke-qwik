import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

import { POKEMON_ID_MIN, POKEMON_ID_MAX } from '~/constants'

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params?.id)

  if (isNaN(id)) redirect(302, '/')

  if (id < POKEMON_ID_MIN) redirect(302, '/')

  if (id > POKEMON_ID_MAX) redirect(302, '/')

  return id
})

export default component$(() => {
  const pokemonId = usePokemonId()

  return (
    <>
      <p class="text-4xl">Pokemon: {pokemonId.value}</p>
      <PokemonImage isVisibleInit id={pokemonId.value} />
    </>
  )
})
