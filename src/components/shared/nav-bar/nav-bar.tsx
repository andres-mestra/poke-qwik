import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export const NavBar = component$(() => {
  return (
    <nav class="nav">
      <Link class="nav-link" href="/">
        Home
      </Link>
      <Link class="nav-link" href="/pokemons/list-ssr">
        SSR-List
      </Link>
      <Link class="nav-link" href="/pokemons/list-client">
        Client-List
      </Link>
    </nav>
  )
})
