import { component$, useComputed$ } from '@builder.io/qwik'
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import type { PokemonSmall } from '~/interfaces'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getPokemonsSmall } from '~/helpers/get-pokemos-small'
import { OFFSET_MIN, OFFSET_PAD } from '~/constants'

import styles from '../styles.module.css'

export const usePokemonList = routeLoader$<PokemonSmall[]>(
  async ({ query, pathname, redirect }) => {
    const offset = Number(query.get('offset') || OFFSET_MIN)

    if (offset < OFFSET_MIN) redirect(302, pathname)

    if (isNaN(offset)) redirect(302, pathname)

    const pokemons = await getPokemonsSmall(offset)

    return pokemons
  }
)

export default component$(() => {
  const location = useLocation()
  const pokemons = usePokemonList()

  const curretOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search)
    return Number(offsetString.get('offset') || OFFSET_MIN)
  })

  return (
    <article class={styles.pokemons__page}>
      <section class="flex flex-col items-center">
        <span class="text-5xl">Status</span>
        <span>Página actual: {curretOffset.value}</span>
        <span>Cargando página: {location.isNavigating ? 'Si' : 'No'}</span>
      </section>
      <div>
        <Link
          class="btn btn-primary mr-2"
          href={`/pokemons/list-ssr/?offset=${curretOffset.value - OFFSET_PAD}`}
        >
          Anteriores
        </Link>
        <Link
          class="btn btn-primary mr-2"
          href={`/pokemons/list-ssr/?offset=${curretOffset.value + OFFSET_PAD}`}
        >
          Siguientes
        </Link>
      </div>
      <section class={styles.pokemons__grid}>
        {pokemons.value.map((pokemon) => (
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
  title: 'SSR List',
}
