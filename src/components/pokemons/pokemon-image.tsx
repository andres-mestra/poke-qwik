import { component$, useSignal, useTask$ } from '@builder.io/qwik'

interface Props {
  id: number
  size?: number
  backImage?: boolean
}

const POKEMON_IMG_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false }: Props) => {
    const imageLoaded = useSignal(false)

    const imgPath = backImage ? `/back/${id}.png` : `/${id}.png`
    const imgSize = `${size}px`

    useTask$(({ track }) => {
      track(() => id)
      track(() => backImage)

      imageLoaded.value = false
    })

    return (
      <div
        class="flex flex-col items-center justify-center"
        style={{ height: imgSize }}
      >
        {!imageLoaded.value && <span>Cargando...</span>}
        <figure>
          <img
            alt="Pokemon Sprite"
            style={{ height: imgSize, with: imgSize }}
            src={`${POKEMON_IMG_BASE}${imgPath}`}
            class={{ hidden: !imageLoaded.value }}
            onLoad$={() => (imageLoaded.value = true)}
          />
        </figure>
      </div>
    )
  }
)
