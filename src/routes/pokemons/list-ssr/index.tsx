import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from '@builder.io/qwik'
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import type { PokemonSmall } from '~/interfaces'
import { Modal } from '~/components/shared'
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

  const modalVisible = useSignal(false)
  const modalPokemon = useStore({
    id: '',
    name: '',
  })

  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id
    modalPokemon.name = name
    modalVisible.value = true
  })

  const closeModal = $(() => {
    modalVisible.value = false
  })

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
          <div
            key={pokemon.name}
            class={styles.pokemons__card}
            onClick$={() => showModal(pokemon.id, pokemon.name)}
          >
            <PokemonImage id={pokemon.id} isVisible />
            <span class="capitalize font-semibold text-indigo-500">
              {pokemon.name}
            </span>
          </div>
        ))}
      </section>
      <Modal showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot="title">{modalPokemon.name}</div>
        <div class="flex flex-col items-center justify-center" q:slot="content">
          <PokemonImage id={modalPokemon.id} />
          <span>Preguntando a ChatGPT</span>
        </div>
        <p>Hola mundo</p>
      </Modal>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'SSR List',
}
