import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTerm } from '../utils/terms'
import './TermTooltip.css'

export default function TermTooltip({ termId, children }) {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const term = getTerm(termId)

  useEffect(() => {
    if (show && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipWidth = 360
      let left = rect.left + rect.width / 2 - tooltipWidth / 2
      if (left < 12) left = 12
      if (left + tooltipWidth > window.innerWidth - 12) {
        left = window.innerWidth - tooltipWidth - 12
      }
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left,
      })
    }
  }, [show])

  if (!term) {
    return <span>{children}</span>
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="term-tooltip-trigger"
        onClick={() => setShow(!show)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') setShow(!show) }}
      >
        {children || term.term}
      </span>
      {show && (
        <>
          <div className="term-tooltip-backdrop" onClick={() => setShow(false)} />
          <div
            ref={tooltipRef}
            className="term-tooltip"
            style={{ top: position.top, left: position.left }}
          >
            <div className="term-tooltip__header">
              <span className="term-tooltip__name">{term.term}</span>
              <button className="term-tooltip__close" onClick={() => setShow(false)}>✕</button>
            </div>
            {term.full_name && (
              <p className="term-tooltip__fullname">{term.full_name}</p>
            )}
            <p className="term-tooltip__def serif">{term.definitions?.lay}</p>
            <Link
              to={`/glossary/${term.id}`}
              className="term-tooltip__link"
              onClick={() => setShow(false)}
            >
              Full definition →
            </Link>
          </div>
        </>
      )}
    </>
  )
}
