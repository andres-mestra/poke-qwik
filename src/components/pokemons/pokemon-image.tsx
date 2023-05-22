import { component$, useSignal, useTask$ } from '@builder.io/qwik'

interface Props {
  id: number
  size?: number
  backImage?: boolean
  isVisible?: boolean
}

const POKEMON_IMG_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false }: Props) => {
    const imageLoaded = useSignal(false)
    const isVisible = useSignal(false)

    const imgPath = backImage ? `/back/${id}.png` : `/${id}.png`
    const imgSize = `${size}px`

    useTask$(({ track }) => {
      track(() => id)
      isVisible.value = false
      imageLoaded.value = false
    })

    useTask$(({ track }) => {
      track(() => backImage)
      imageLoaded.value = false
    })

    return (
      <div class="flex flex-col items-center justify-center">
        {!imageLoaded.value && (
          <span style={{ height: imgSize }}>Cargando...</span>
        )}
        <figure>
          <img
            alt="Pokemon Sprite"
            style={{ height: imgSize, with: imgSize }}
            src={`${POKEMON_IMG_BASE}${imgPath}`}
            class={[
              { hidden: !imageLoaded.value, 'brightness-0': !isVisible.value },
              'transition-all',
            ]}
            onLoad$={() => (imageLoaded.value = true)}
          />
        </figure>
        <button
          class="btn btn-primary-outlined"
          onClick$={() => (isVisible.value = !isVisible.value)}
        >
          {isVisible.value ? 'Ocultar' : 'Revelar'}
        </button>
      </div>
    )
  }
)
