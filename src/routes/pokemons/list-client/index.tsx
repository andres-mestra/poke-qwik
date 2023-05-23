import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getPokemonsSmall } from '~/helpers/get-pokemos-small'
import { OFFSET_PAD } from '~/constants'
import type { PokemonSmall } from '~/interfaces'

import styles from '../styles.module.css'

interface PokemonPageState {
  currentPage: number
  pokemons: PokemonSmall[]
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
  })

  //Solo el client
  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage)

    const pokemons = await getPokemonsSmall(
      pokemonState.currentPage * OFFSET_PAD
    )
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
  })

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
