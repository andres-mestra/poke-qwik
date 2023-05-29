import { component$ } from '@builder.io/qwik'
import { useCounter } from '~/hooks/use-counter'

export default component$(() => {
  const { counter, increase, decrease } = useCounter(0)

  return (
    <section class="flex flex-col items-center justify-center gap-5">
      <span class="text-3xl">Counter</span>
      <span class="text-7xl">{counter.value}</span>

      <div class="flex gap-5">
        <button class="btn btn-primary" onClick$={decrease}>
          -1
        </button>
        <button class="btn btn-primary" onClick$={increase}>
          +1
        </button>
      </div>
    </section>
  )
})
