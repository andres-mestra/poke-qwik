import { component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  const pokemonId = useSignal<number>(1) // Primitivos

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
        <button onClick$={() => pokemonId.value--} class="btn btn-primary mr-3">
          Anterior
        </button>
        <button onClick$={() => pokemonId.value++} class="btn btn-primary">
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
