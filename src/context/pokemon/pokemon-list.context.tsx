import { createContextId, useContextProvider, useStore } from '@builder.io/qwik'
import { type PokemonSmall } from '~/interfaces'

export interface PokemonListState {
  loading: boolean
  isLast: boolean
  currentPage: number
  pokemons: PokemonSmall[]
}

export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon.list-context'
)

export const usePokemonListProvider = () => {
  const pokemonState = useStore<PokemonListState>({
    isLast: false,
    loading: false,
    currentPage: 0,
    pokemons: [],
  })

  useContextProvider(PokemonListContext, pokemonState)
}
