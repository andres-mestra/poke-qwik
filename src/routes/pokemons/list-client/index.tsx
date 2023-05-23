import { component$, useStore } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { PokemonSmall } from '~/components/interfaces'

interface PokemonPageState {
  currentPage: number
  pokemons: PokemonSmall[]
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
  })

  return (
    <article class="flex flex-col items-center gap-7">
      <section class="flex flex-col items-center">
        <span class="text-5xl">Status</span>
        <span>Página actual: {pokemonState.currentPage}</span>
        <span>Cargando página:</span>
      </section>
      <div>
        <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage--}
        >
          Anteriores
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage++}
        >
          Siguientes
        </button>
      </div>
      <section class="grid grid-cols-6 gap-3">
        {/* {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="flex flex-col justify-center items-center p-2 bg-slate-100 rounded-lg  shadow-md shadow-indigo-500/50"
          >
            <PokemonImage id={pokemon.id} isVisibleInit={true} />
            <span class="capitalize font-semibold text-indigo-500">
              {pokemon.name}
            </span>
          </div>
        ))} */}
      </section>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'Client List',
}
