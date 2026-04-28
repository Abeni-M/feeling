import React, { useEffect, useRef } from 'react'
import profilePic from '../assets/profile.jpg'
import './IntroScreen.css'

const FloatingHeart = ({ style }) => (
  <span className="floating-heart" style={style}>💖</span>
)

const HEARTS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${6 + Math.random() * 6}s`,
    fontSize: `${0.8 + Math.random() * 1.6}rem`,
    opacity: 0.15 + Math.random() * 0.35,
  },
}))

const IntroScreen = ({ onStart }) => {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const pulse = () => btn.classList.add('pulse-once')
    const clean = () => btn.classList.remove('pulse-once')
    const id = setInterval(() => { pulse(); setTimeout(clean, 800) }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="intro-root">
      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Floating hearts */}
      <div className="hearts-layer" aria-hidden="true">
        {HEARTS.map((h) => <FloatingHeart key={h.id} style={h.style} />)}
      </div>

      {/* Main card */}
      <div className="intro-card">
        {/* Profile ring */}
        <div className="profile-ring-wrapper">
          <div className="profile-ring">
            <img src={profilePic} alt="Abenezer" className="intro-profile-pic" />
          </div>
          <span className="profile-status-dot" title="Online" />
        </div>

        {/* Text */}
        <div className="intro-text-block">
          <p className="intro-from">A message for you,</p>
          <h1 className="intro-title">
            Hey Bony...<br />
            <em>There's something I've been wanting to share.</em>
          </h1>
          <p className="intro-subtitle">
            I've put my heart into these questions.<br />
            Just be yourself.
          </p>
        </div>

        {/* CTA */}
        <button
          ref={btnRef}
          id="intro-begin-btn"
          className="intro-btn"
          onClick={onStart}
          aria-label="Begin the quiz"
        >
          <span className="intro-btn-text">Begin</span>
          <span className="intro-btn-icon">→</span>
        </button>

        <p className="intro-hint">6 questions · takes about a minute</p>
      </div>
    </div>
  )
}

export default IntroScreen
