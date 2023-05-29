import { component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { usePokemonGame } from '~/hooks/use-pokemon-game'

export default component$(() => {
  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    prevPokemon,
    toggleVisible,
    toggleFromBack,
  } = usePokemonGame()

  return (
    <>
      <h1 class="text-7xl">Poke Qwik</h1>
      <span class="text-2xl">¿Quién es ese pokémon?</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <PokemonImage
        id={pokemonId.value}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />

      <div class="flex gap-3 mt-2">
        <button class="btn btn-primary-outlined" onClick$={toggleVisible}>
          {isPokemonVisible.value ? 'Ocultar' : 'Revelar'}
        </button>
        <button class="btn btn-primary-outlined" onClick$={toggleFromBack}>
          Voltear
        </button>
      </div>
      <div class="flex gap-3 mt-2">
        <button class="btn btn-primary" onClick$={prevPokemon}>
          Anterior
        </button>
        <button class="btn btn-primary" onClick$={nextPokemon}>
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
