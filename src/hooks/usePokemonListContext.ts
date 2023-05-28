import { useContext } from '@builder.io/qwik'
import { PokemonListContext } from '~/context'

export const usePokemonListContext = () => {
  return useContext(PokemonListContext)
}
