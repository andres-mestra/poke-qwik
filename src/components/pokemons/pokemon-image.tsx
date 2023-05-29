import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik'

interface Props {
  id: number | string
  size?: number
  backImage?: boolean
  isVisible?: boolean
}

const POKEMON_IMG_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
    const imageLoaded = useSignal(false)

    useTask$(({ track }) => {
      track(() => id)
      imageLoaded.value = false
    })

    useTask$(({ track }) => {
      track(() => backImage)
      imageLoaded.value = false
    })

    const imgSize = useComputed$(() => `${size}px`)

    const imgPath = useComputed$(() => {
      if (!id) return ''

      return backImage
        ? `${POKEMON_IMG_BASE}/back/${id}.png`
        : `${POKEMON_IMG_BASE}/${id}.png`
    })

    return (
      <div class="flex flex-col items-center justify-center">
        {!imageLoaded.value && (
          <span style={{ height: imgSize.value }}>Cargando...</span>
        )}

        <figure>
          <img
            alt="Pokemon Sprite"
            style={{ height: imgSize.value, with: imgSize.value }}
            src={imgPath.value}
            class={[
              {
                hidden: !imageLoaded.value,
                'brightness-0': !isVisible,
              },
              'transition-all',
            ]}
            onLoad$={() => (imageLoaded.value = true)}
          />
        </figure>
      </div>
    )
  }
)
