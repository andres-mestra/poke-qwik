import {
  $,
  component$,
  useStore,
  useTask$,
  useOnDocument,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getPokemonsSmall } from '~/helpers/get-pokemos-small'
import { OFFSET_PAD } from '~/constants'
import type { PokemonSmall } from '~/interfaces'

import styles from '../styles.module.css'

interface PokemonPageState {
  loading: boolean
  isLast: boolean
  currentPage: number
  pokemons: PokemonSmall[]
}

const LIMIT = 30
const SCROLL_SPACE_ON = 200
export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    loading: false,
    isLast: false,
    currentPage: 0,
    pokemons: [],
  })

  /*
  //Solo el client
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage)

  //   const pokemons = await getPokemonsSmall(
  //     pokemonState.currentPage * OFFSET_PAD
  //   )
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
  // })
  */

  //Primero en el server, luego del lado del client si cambia currentPage
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage)

    const pokemons = await getPokemonsSmall(
      pokemonState.currentPage * OFFSET_PAD,
      LIMIT
    )

    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    pokemonState.loading = false
    pokemonState.isLast = !pokemons.length
  })

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight

      if (
        currentScroll + SCROLL_SPACE_ON >= maxScroll &&
        !pokemonState.loading &&
        !pokemonState.isLast
      ) {
        pokemonState.loading = true
        pokemonState.currentPage++
      }
    })
  )

  return (
    <article class={styles.pokemons__page}>
      <section class="flex flex-col items-center">
        <span class="text-5xl">Status</span>
        <span>Página actual: {pokemonState.currentPage}</span>
        <span>Cargando página:</span>
      </section>
      <div>
        <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage++}
        >
          Siguientes
        </button>
      </div>
      <section class={styles.pokemons__grid}>
        {pokemonState.pokemons.map((pokemon) => (
          <div key={pokemon.name} class={styles.pokemons__card}>
            <PokemonImage id={pokemon.id} isVisibleInit={true} />
            <span class="capitalize font-semibold text-indigo-500">
              {pokemon.name}
            </span>
          </div>
        ))}
      </section>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'Client List',
}
