import React, { useState, useEffect, useRef } from 'react'
import './PhotoSlideshow.css'

// Auto-read ALL images from assets except profile.jpg
const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true })
export const slideshowImages = Object.keys(imageModules)
  .filter((p) => !p.includes('profile.jpg'))
  .map((p) => imageModules[p].default)

const PhotoSlideshow = ({ intervalMs = 3500 }) => {
  const [active, setActive] = useState(0)
  const [prev, setPrev]   = useState(null)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setPrev(active)
    setActive(idx)
  }

  useEffect(() => {
    if (slideshowImages.length <= 1) return
    timerRef.current = setInterval(() => {
      setActive((cur) => {
        setPrev(cur)
        return (cur + 1) % slideshowImages.length
      })
    }, intervalMs)
    return () => clearInterval(timerRef.current)
  }, [intervalMs])

  if (slideshowImages.length === 0) {
    return <div className="slideshow-empty">No photos yet 🌸</div>
  }

  return (
    <div className="slideshow-root">
      {/* Images stack */}
      <div className="slideshow-images">
        {slideshowImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Memory ${i + 1}`}
            className={[
              'slideshow-img',
              i === active ? 'ss-active' : '',
              i === prev   ? 'ss-prev'   : '',
            ].join(' ')}
            draggable={false}
          />
        ))}

        {/* Gradient overlay */}
        <div className="slideshow-overlay" />

        {/* Corner glow */}
        <div className="slideshow-glow" />
      </div>

      {/* Dot indicators */}
      {slideshowImages.length > 1 && (
        <div className="slideshow-dots" aria-label="Slideshow navigation">
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              className={`ss-dot ${i === active ? 'ss-dot-active' : ''}`}
              onClick={() => {
                clearInterval(timerRef.current)
                goTo(i)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoSlideshow
