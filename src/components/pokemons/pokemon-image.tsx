import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

interface Props {
  id: number | string
  size?: number
  backImage?: boolean
  isVisibleInit?: boolean
  showControlHidde?: boolean
}

const POKEMON_IMG_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const PokemonImage = component$(
  ({
    id,
    size = 200,
    backImage = false,
    isVisibleInit = false,
    showControlHidde = false,
  }: Props) => {
    const imageLoaded = useSignal(false)
    const isVisible = useSignal(isVisibleInit)

    const imgPath = backImage ? `/back/${id}.png` : `/${id}.png`
    const imgSize = `${size}px`

    useTask$(({ track }) => {
      track(() => id)
      isVisible.value = isVisibleInit
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
        <Link href={`/pokemon/${id}`}>
          <figure>
            <img
              alt="Pokemon Sprite"
              style={{ height: imgSize, with: imgSize }}
              src={`${POKEMON_IMG_BASE}${imgPath}`}
              class={[
                {
                  hidden: !imageLoaded.value,
                  'brightness-0': !isVisible.value,
                },
                'transition-all',
              ]}
              onLoad$={() => (imageLoaded.value = true)}
            />
          </figure>
        </Link>
        {showControlHidde && (
          <button
            class="btn btn-primary-outlined"
            onClick$={() => (isVisible.value = !isVisible.value)}
          >
            {isVisible.value ? 'Ocultar' : 'Revelar'}
          </button>
        )}
      </div>
    )
  }
)
