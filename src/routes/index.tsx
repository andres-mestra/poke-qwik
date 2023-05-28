import { $, component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonGameContext } from '~/hooks/usePokemonGameContext'

import { POKEMON_GRADIENT, POKEMON_ID_MIN } from '~/constants'

export default component$(() => {
  const pokemonGame = usePokemonGameContext()

  const changePokemonId = $((value: number) => {
    const newId = pokemonGame.pokemonId + value
    if (newId < POKEMON_ID_MIN) return
    pokemonGame.pokemonId = newId
  })

  return (
    <>
      <h1 class="text-7xl">Poke Qwik</h1>
      <span class="text-2xl">¿Quién es ese pokémon?</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      <PokemonImage
        id={pokemonGame.pokemonId}
        backImage={pokemonGame.showBackImage}
        isVisible={pokemonGame.isPokemonVisible}
      />

      <div class="flex gap-3 mt-2">
        <button
          class="btn btn-primary-outlined"
          onClick$={() =>
            (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
          }
        >
          {pokemonGame.isPokemonVisible ? 'Ocultar' : 'Revelar'}
        </button>
        <button
          class="btn btn-primary-outlined"
          onClick$={() =>
            (pokemonGame.showBackImage = !pokemonGame.showBackImage)
          }
        >
          Voltear
        </button>
      </div>
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
