import { createContextId, useContextProvider, useStore } from '@builder.io/qwik'

export interface PokemonGameState {
  pokemonId: number
  showBackImage: boolean
  isPokemonVisible: boolean
}

export const PokemonGameContext = createContextId<PokemonGameState>(
  'pokemon.game-context'
)

export const usePokemonGameProvider = () => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: false,
    showBackImage: false,
  })

  useContextProvider(PokemonGameContext, pokemonGame)
}
