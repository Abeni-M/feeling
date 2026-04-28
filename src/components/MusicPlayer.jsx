import React, { useRef, useState, useEffect } from 'react'
import './MusicPlayer.css'

// Chopin – Nocturne Op. 9 No. 2 (public domain, Wikimedia Commons)
const CLASSICAL_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/1/17/Fr%C3%A9d%C3%A9ric_Chopin_-_Nocturne_Op._9_No._2_E_flat_major.ogg'

const MusicPlayer = () => {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)

  // Try silent autoplay on mount; browsers may block — user can click to start
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.22
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else          { audio.play(); setPlaying(true) }
  }

  if (!visible) return null

  return (
    <div className={`music-player ${playing ? 'mp-playing' : 'mp-paused'}`}>
      <audio ref={audioRef} src={CLASSICAL_SRC} loop preload="auto" />

      <button
        id="music-toggle-btn"
        className="mp-btn"
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play classical music'}
        aria-label={playing ? 'Pause music' : 'Play classical music'}
      >
        {/* Animated bars when playing */}
        <span className="mp-bars" aria-hidden="true">
          {[1,2,3,4].map(i => <span key={i} className={`mp-bar mp-bar-${i}`} />)}
        </span>
        <span className="mp-note" aria-hidden="true">{playing ? '' : '♪'}</span>
      </button>

      {/* Label shown on hover */}
      <span className="mp-label">
        {playing ? 'Chopin · Nocturne' : 'Play Music'}
      </span>

      {/* Close */}
      <button
        className="mp-close"
        onClick={() => { audioRef.current?.pause(); setVisible(false) }}
        aria-label="Dismiss music player"
        title="Dismiss"
      >×</button>
    </div>
  )
}

export default MusicPlayer
