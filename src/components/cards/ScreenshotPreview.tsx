import { useEffect, useId, useRef, useState } from 'react'
import type { Screenshot } from '../../types/portfolio'

/** Native top-layer dialog keeps enlarged project imagery keyboard accessible. */
export function ScreenshotPreview({ screenshot }: { screenshot: Screenshot }) {
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open || !dialog.current) return
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
      trigger.current?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <button ref={trigger} type="button" className="screenshot-inspect" onClick={() => setOpen(true)} aria-haspopup="dialog">
        Inspect screenshot <span aria-hidden="true">↗</span>
      </button>
      {open && (
        <dialog ref={dialog} className="screenshot-lightbox" aria-labelledby={titleId}
          onCancel={() => setOpen(false)}
          onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
          <div className="screenshot-lightbox-panel">
            <div className="screenshot-lightbox-heading">
              <p id={titleId}>{screenshot.caption}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close screenshot preview" autoFocus>×</button>
            </div>
            <div className="screenshot-lightbox-image">
              <img src={screenshot.url} alt={screenshot.caption} />
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
