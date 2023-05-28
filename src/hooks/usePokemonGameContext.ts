import { useContext } from '@builder.io/qwik'
import { PokemonGameContext } from '~/context'

export const usePokemonGameContext = () => {
  return useContext(PokemonGameContext)
}
