import { component$, Slot } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { Logo } from '~/components/shared/logo/logon'
import { NavBar } from '~/components/shared/nav-bar/nav-bar'

export default component$(() => {
  return (
    <>
      <header class="flex items-center justify-around">
        <Link href="/">
          <Logo height={100} width={100} />
        </Link>
        <NavBar />
      </header>
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  )
})
