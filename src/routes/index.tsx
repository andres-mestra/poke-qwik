import { $, component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

const POKEMON_GRADIENT = 1

export default component$(() => {
  const pokemonId = useSignal(1) // Primitivos
  const showBackImage = useSignal(false)

  const changePokemonId = $((value: number) => {
    const newId = pokemonId.value + value
    if (newId <= 0) return
    pokemonId.value = newId
  })

  return (
    <>
      <h1 class="text-7xl">Poke Qwik</h1>
      <span class="text-2xl">¿Quién es ese pokémon?</span>
      <span class="text-9xl">{pokemonId}</span>

      <PokemonImage id={pokemonId.value} backImage={showBackImage.value} />

      <div class="flex gap-3 mt-2">
        <button
          class="btn btn-primary"
          onClick$={() => changePokemonId(-POKEMON_GRADIENT)}
        >
          Anterior
        </button>
        <button
          class="btn btn-primary"
          onClick$={() => changePokemonId(POKEMON_GRADIENT)}
        >
          Siguientes
        </button>
      </div>
      <div class="flex gap-3 mt-2">
        <button
          class="btn btn-primary"
          onClick$={() => (showBackImage.value = !showBackImage.value)}
        >
          Voltear
        </button>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Poke Qwik',
  meta: [
    {
      name: 'description',
      content: 'The Pokemon Web',
    },
  ],
}
