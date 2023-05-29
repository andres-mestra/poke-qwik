import { $, component$, useTask$, useOnDocument } from '@builder.io/qwik'
import { Link, type DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

import { usePokemonListContext } from '~/hooks/usePokemonListContext'
import { getPokemonsSmall } from '~/helpers/get-pokemos-small'
import { OFFSET_PAD } from '~/constants'

import styles from '../styles.module.css'

const SCROLL_SPACE_ON = 200
export default component$(() => {
  const pokemonState = usePokemonListContext()

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
      OFFSET_PAD
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
      const activeScroll = currentScroll + SCROLL_SPACE_ON >= maxScroll

      if (activeScroll && !pokemonState.loading && !pokemonState.isLast) {
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
          <Link key={pokemon.name} href={`/pokemon/${pokemon.id}`}>
            <div class={styles.pokemons__card}>
              <PokemonImage id={pokemon.id} isVisible />
              <span class="capitalize font-semibold text-indigo-500">
                {pokemon.name}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'Client List',
}
