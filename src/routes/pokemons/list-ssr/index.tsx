import { component$, useComputed$ } from '@builder.io/qwik'
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import type {
  PokemonSimple,
  PokemonListResponse,
} from '~/components/interfaces'

const OFFSET_PAD = 10
const OFFSET_MIN = 0

export const usePokemonList = routeLoader$<PokemonSimple[]>(
  async ({ query, pathname, redirect }) => {
    const offset = Number(query.get('offset') || OFFSET_MIN)

    if (offset < OFFSET_MIN) redirect(302, pathname)

    if (isNaN(offset)) redirect(302, pathname)

    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    )
    const data = (await resp.json()) as PokemonListResponse
    return data?.results || []
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
    <article class="flex flex-col items-center gap-7">
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
      <section class="grid grid-cols-6 gap-3">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="flex flex-col justify-center items-center"
          >
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </section>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'SSR List',
}
