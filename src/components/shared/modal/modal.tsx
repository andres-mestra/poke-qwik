import { $, Slot, component$, useStylesScoped$ } from '@builder.io/qwik'
import type { PropFunction, QwikMouseEvent } from '@builder.io/qwik'
import ModalStyles from './modal.css?inline'

interface Props {
  showModal: boolean
  closeFn: PropFunction<() => void>
}

const MODAL_ID = 'modal-container'
export const Modal = component$(({ showModal, closeFn }: Props) => {
  useStylesScoped$(ModalStyles)

  const handleClose = $((event: QwikMouseEvent<HTMLDivElement>) => {
    const elementId = (event.target as HTMLDivElement).id
    if (elementId === MODAL_ID) closeFn()
  })

  return (
    // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
    <div
      id={MODAL_ID}
      class={showModal ? 'modal-background' : 'hidden'}
      onClick$={handleClose}
    >
      <div class="modal-content">
        <div class="mt-3 text-center">
          <h3 class="modal-title">
            <Slot name="title" />
          </h3>

          <div class="mt-2 px-7 py-3">
            <div class="modal-content-text">
              <Slot name="content" />
            </div>
          </div>

          {/* Botton */}
          <div class="items-center px-4 py-3">
            <button id="ok-btn" class="modal-button" onClick$={closeFn}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
