import { Slot, component$ } from '@builder.io/qwik'
import { usePokemonGameProvider } from './pokemon-game.context'
import { usePokemonListProvider } from './pokemon-list.context'

export const PokemonProvider = component$(() => {
  usePokemonGameProvider()
  usePokemonListProvider()

  return <Slot />
})
