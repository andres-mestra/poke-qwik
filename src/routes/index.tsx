import { $, component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

const POKEMON_GRADIENT = 1

export default component$(() => {
  const pokemonId = useSignal<number>(1) // Primitivos

  const changePokemonId = $((value: number) => {
    const newId = pokemonId.value + value
    if (newId <= 0) return
    pokemonId.value = newId
  })

  return (
    <>
      <h1 class="text-7xl">Poke Qwik</h1>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <figure>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
          alt="Pokemon Sprite"
          height="200px"
          width="200px"
        />
      </figure>

      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-POKEMON_GRADIENT)}
          class="btn btn-primary mr-3"
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(POKEMON_GRADIENT)}
          class="btn btn-primary"
        >
          Siguientes
        </button>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Poke Qwik',
  meta: [
    {
      name: 'description',
      content: 'The Pokemon Web',
    },
  ],
}
