import { $, useComputed$ } from '@builder.io/qwik'
import { usePokemonGameContext } from './usePokemonGameContext'
import { POKEMON_GRADIENT, POKEMON_ID_MIN } from '~/constants'

export const usePokemonGame = () => {
  const pokemonGame = usePokemonGameContext()

  const changePokemonId = $((value: number) => {
    const newId = pokemonGame.pokemonId + value
    if (newId < POKEMON_ID_MIN) return
    pokemonGame.pokemonId = newId
  })

  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage
  })

  const toggleVisible = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible
  })

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    nextPokemon: $(() => changePokemonId(POKEMON_GRADIENT)),
    prevPokemon: $(() => changePokemonId(-POKEMON_GRADIENT)),
    toggleFromBack,
    toggleVisible,
  }
}
