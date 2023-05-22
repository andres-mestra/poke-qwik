import { component$ } from '@builder.io/qwik'

interface Props {
  id: number
  size?: number
  backImage?: boolean
}

const POKEMON_IMG_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false }: Props) => {
    const imgPath = backImage ? `/back/${id}.png` : `/${id}.png`
    const imgSize = `${size}px`

    return (
      <figure>
        <img
          src={`${POKEMON_IMG_BASE}${imgPath}`}
          alt="Pokemon Sprite"
          height={imgSize}
          width={imgSize}
        />
      </figure>
    )
  }
)
