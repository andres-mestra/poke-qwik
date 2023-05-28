import { Slot, component$, useVisibleTask$ } from '@builder.io/qwik'
import {
  type PokemonGameState,
  usePokemonGameProvider,
} from './pokemon-game.context'
import { usePokemonListProvider } from './pokemon-list.context'
import { POKEMON_GAME_KEY, POKEMON_ID_MIN } from '~/constants'

export const PokemonProvider = component$(() => {
  usePokemonListProvider()
  const pokemonGame = usePokemonGameProvider()

  useVisibleTask$(() => {
    const pokemonGameJson = localStorage.getItem(POKEMON_GAME_KEY)
    if (pokemonGameJson) {
      const {
        pokemonId = POKEMON_ID_MIN,
        showBackImage = false,
        isPokemonVisible = false,
      } = JSON.parse(pokemonGameJson) as PokemonGameState

      pokemonGame.pokemonId = pokemonId
      pokemonGame.showBackImage = showBackImage
      pokemonGame.isPokemonVisible = isPokemonVisible
    }
  })

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
      pokemonGame.isPokemonVisible,
    ])

    localStorage.setItem(POKEMON_GAME_KEY, JSON.stringify(pokemonGame))
  })

  return <Slot />
})
