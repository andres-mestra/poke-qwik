import { createContextId, useContextProvider, useStore } from '@builder.io/qwik'
import { type PokemonSmall } from '~/interfaces'

export interface PokemonListState {
  currentPage: number
  isLoading: boolean
  pokemons: PokemonSmall[]
}

export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon.list-context'
)

export const usePokemonListProvider = () => {
  const pokemonState = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  })

  useContextProvider(PokemonListContext, pokemonState)
}
