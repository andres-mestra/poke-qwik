import { component$ } from '@builder.io/qwik'
import { Link, type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import type {
  PokemonSimple,
  PokemonListResponse,
} from '~/components/interfaces'

export const usePokemonList = routeLoader$<PokemonSimple[]>(async () => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`
  )
  const data = (await resp.json()) as PokemonListResponse
  return data?.results || []
})

export default component$(() => {
  const pokemons = usePokemonList()

  return (
    <article class="flex flex-col items-center gap-7">
      <section class="flex flex-col items-center">
        <span class="text-5xl">Status</span>
        <span>Página actual: xxxx</span>
        <span>Cargando página: xxxx</span>
      </section>
      <div>
        <Link class="btn btn-primary mr-2">Anteriores</Link>
        <Link class="btn btn-primary mr-2">Siguientes</Link>
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
