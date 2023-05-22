import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <>
      <h5>List-client</h5>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Client List',
}
