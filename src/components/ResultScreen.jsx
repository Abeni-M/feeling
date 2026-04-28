import React, { useEffect, useState } from 'react'
import PhotoSlideshow from './PhotoSlideshow'
import './ResultScreen.css'

// ─── Confetti particle ───
const Particle = ({ style }) => <div className="confetti-particle" style={style} />

const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`,
    background: ['#ff6b9d', '#c084fc', '#fbbf24', '#67e8f9', '#f472b6', '#a78bfa'][i % 6],
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
  },
}))

// Social links
const SOCIALS = [
  {
    label: 'Telegram',
    href: 'https://t.me/Abe_m_1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/abe_ne_zer_m?igsh=MWhxc2JqcGJpZTN0ag==',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/abenezer.mulatu.37',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@benenzer70',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.39-2.9 5.84-1.76 1.48-4.2 2.1-6.44 1.71-2.22-.38-4.25-1.57-5.55-3.37-1.31-1.83-1.66-4.22-1.07-6.39.6-2.18 2.25-3.95 4.35-4.8 2.05-.82 4.35-.87 6.42-.14v4.03c-1.12-.47-2.39-.46-3.48-.06-1.07.41-1.92 1.25-2.29 2.3-.39 1.09-.16 2.37.58 3.27.75.92 2.01 1.34 3.16 1.11 1.14-.23 2.12-1.01 2.53-2.09.43-1.13.34-2.42.34-3.64V.02z" />
      </svg>
    ),
  },
]

const ResultScreen = ({ score, answers, questions, onRetry }) => {
  // score max possible = 6 (one point per question)
  // Thresholds: 4.5+ = Deep Connection, 3-4 = Growing Interest, <3 = Friendship
  const isMatch = score >= 4.5
  const isMaybe = score >= 3 && score < 4.5
  const isOpposite = score < 3

  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`result-root ${isMatch ? 'result-match' : isMaybe ? 'result-maybe' : 'result-opposite'}`}>

      {/* Background slideshow (blurred) */}
      <div className="result-bg-slideshow">
        <PhotoSlideshow intervalMs={5000} />
        <div className="result-bg-overlay" />
      </div>

      {/* Confetti — only on match */}
      {isMatch && showContent && (
        <div className="confetti-layer" aria-hidden="true">
          {CONFETTI.map((p) => <Particle key={p.id} style={p.style} />)}
        </div>
      )}

      {/* Floating hearts — match only */}
      {isMatch && (
        <div className="result-hearts" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="r-heart" style={{
              left: `${5 + i * 10}%`,
              animationDelay: `${i * 0.4}s`,
              fontSize: `${1 + Math.random()}rem`
            }}>💖</span>
          ))}
        </div>
      )}

      {/* Main card */}
      <div className={`result-card ${showContent ? 'result-card-in' : ''}`}>

        {isMatch && (
          <>
            {/* MATCH — Grand Confession */}
            <div className="result-header">
              <div className="result-icon-ring">💖</div>
              <p className="result-label result-label-match">This is what i feel for youuuu!!! 💖🌹</p>
              <h1 className="result-title result-title-match">
                My Dearest…
              </h1>
            </div>

            <div className="result-letter">
              <p>
                Bony, I've been trying to write this for a while, because <em>"I am happy when I am with you"</em> never feels like enough.
                Those three words are true — but they are just the door.
                What I feel for you is the whole house, and the garden, and the sky above it.
              </p>
              <p>
                Before you, I was Abenezer. But <em>with you</em>, I feel like I am finally
                meeting the person I was always meant to be. You don't just add to my life —
                you have fundamentally changed its texture and its light.
                You've made the ordinary world feel like a wonderful place.
              </p>
              <p>
                I love the way your mind works. I love your strength — the quiet way you
                handle things that would break others. And yes, I love your smile,
                the one that starts in your eyes before it ever reaches your lips.
              </p>
              <p>
                Loving you isn't a feeling that comes and goes.
                It's a <em>gravity</em>. The constant, steady pull of my entire being toward yours.
                You are my home — not a place, but a person.
              </p>
              <p>
                Whatever the future holds, the one thing I know for certain is that
                I want to be next to you for all of it. Thank you for being the best
                part of every single one of my days.
              </p>
              <p className="result-sign">With all my heart,<br /><strong>Abenezer</strong></p>
              <p className="result-amharic"> always i am with you whenever you need me wherever you are 💖🌹</p>
            </div>

            {/* Feelings Summary Section */}
            <div className="result-summary">
              <h3 className="result-summary-title">What your heart shared...</h3>
              <div className="result-summary-tags">
                {answers.map((a, idx) => {
                  const q = questions.find(q => q.id === a.questionId);
                  const ansText = q?.answers[a.answerIdx]?.text;
                  // Handle bilingual split
                  const shortVersion = ansText ? ansText.split('/')[1]?.trim() || ansText : "✨";
                  return (
                    <span key={idx} className="result-tag">
                      {q?.emoji} {shortVersion}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Social links */}
            <div className="result-socials">
              <p className="result-socials-label">Come find me 🌸</p>
              <div className="result-socials-row">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="result-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {isMaybe && (
          <>
            {/* MAYBE — Gentle, hopeful */}
            <div className="result-header">
              <div className="result-icon-ring result-icon-maybe">🌙</div>
              <p className="result-label result-label-maybe">You are very special for me </p>
              <h1 className="result-title result-title-maybe">
                That's okay.
              </h1>
            </div>

            <div className="result-letter result-letter-maybe">
              <p>
                You don't have to have it all figured out right now.
                Feelings can be quiet and uncertain and still be completely real.
              </p>
              <p>
                I just wanted you to know that I see you — truly —
                and whatever you feel, I'm here without any pressure.
              </p>
              <p>
                If you ever want to talk, to laugh, or even just sit in comfortable silence…
                you know where to find me.
              </p>
              <p className="result-sign">Always,<br /><strong>Abenezer</strong> 🌸</p>
            </div>

            <div className="result-summary">
              <h3 className="result-summary-title">Your gentle thoughts...</h3>
              <div className="result-summary-tags">
                {answers.map((a, idx) => {
                  const q = questions.find(q => q.id === a.questionId);
                  const ansText = q?.answers[a.answerIdx]?.text;
                  const shortVersion = ansText ? ansText.split('/')[1]?.trim() || ansText : "✨";
                  return (
                    <span key={idx} className="result-tag" style={{ background: 'rgba(192, 132, 252, 0.08)', borderColor: 'rgba(192, 132, 252, 0.2)', color: '#d8b4fe' }}>
                      {q?.emoji} {shortVersion}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="result-socials">
              <p className="result-socials-label">No pressure — just here 🤍</p>
              <div className="result-socials-row">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="result-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <button id="result-retry-btn" className="result-retry-btn" onClick={onRetry}>
              Try Again 🔄
            </button>
          </>
        )}

        {isOpposite && (
          <>
            {/* OPPOSITE — Sweet, non-pushy */}
            <div className="result-header">
              <div className="result-icon-ring result-icon-opposite">🌿</div>
              <p className="result-label result-label-opposite">And that's completely okay.</p>
              <h1 className="result-title result-title-opposite">
                No pressure, ever.
              </h1>
            </div>

            <div className="result-letter result-letter-opposite">
              <p>
                Not every heart beats in the same direction, and that's perfectly fine.
                I respect you and your feelings — always.
              </p>
              <p>
                I just wanted to be honest. That's all this was.
                No expectations, no pressure. Just a guy being real.
              </p>
              <p>
                If you ever need anything — a laugh, a conversation, or just someone
                who genuinely cares about you — I'm still here. That part never changes.
              </p>
              <p className="result-sign">Warmly,<br /><strong>Abenezer</strong></p>
            </div>

            <div className="result-summary">
              <h3 className="result-summary-title">Your honest answers...</h3>
              <div className="result-summary-tags">
                {answers.map((a, idx) => {
                  const q = questions.find(q => q.id === a.questionId);
                  const ansText = q?.answers[a.answerIdx]?.text;
                  const shortVersion = ansText ? ansText.split('/')[1]?.trim() || ansText : "✨";
                  return (
                    <span key={idx} className="result-tag" style={{ background: 'rgba(103, 232, 249, 0.08)', borderColor: 'rgba(103, 232, 249, 0.2)', color: '#a5f3fc' }}>
                      {q?.emoji} {shortVersion}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="result-socials">
              <p className="result-socials-label">Still here for you 🤍</p>
              <div className="result-socials-row">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="result-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <button id="result-retry-btn-opp" className="result-retry-btn" onClick={onRetry}>
              Start Over 🔄
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default ResultScreen
