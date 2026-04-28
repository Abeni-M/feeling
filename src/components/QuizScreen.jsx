import React, { useState, useEffect } from 'react'
import PhotoSlideshow from './PhotoSlideshow'
import './QuizScreen.css'

const QuizScreen = ({ questions, onFinish }) => {
  const [qIndex, setQIndex]         = useState(0)
  const [selected, setSelected]     = useState(null)   // index of chosen answer
  const [answers, setAnswers]       = useState([])
  const [animating, setAnimating]   = useState(false)  // slide-out animation
  const [entering, setEntering]     = useState(true)   // slide-in animation
  const [score, setScore]           = useState(0)

  const q = questions[qIndex]
  const progress = ((qIndex) / questions.length) * 100

  // Slide-in on mount & question change
  useEffect(() => {
    setEntering(true)
    const t = setTimeout(() => setEntering(false), 600)
    return () => clearTimeout(t)
  }, [qIndex])

  const handleSelect = (idx) => {
    if (animating) return
    setSelected(idx)
  }

  const handleNext = () => {
    if (selected === null || animating) return

    const ans = q.answers[selected]
    const newScore = score + ans.score
    const newAnswers = [...answers, { questionId: q.id, answerIdx: selected, score: ans.score }]

    setScore(newScore)
    setAnswers(newAnswers)
    setAnimating(true)

    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        onFinish(newAnswers, newScore)
      } else {
        setQIndex(qIndex + 1)
        setSelected(null)
        setAnimating(false)
      }
    }, 500)
  }

  const isLast = qIndex + 1 >= questions.length

  return (
    <div className="quiz-root">
      {/* Background orbs */}
      <div className="quiz-orb quiz-orb-1" />
      <div className="quiz-orb quiz-orb-2" />

      {/* Progress bar */}
      <div className="quiz-progress-track" role="progressbar" aria-valuenow={progress} aria-valuemax={100}>
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question counter */}
      <div className="quiz-counter">
        <span className="quiz-counter-current">{qIndex + 1}</span>
        <span className="quiz-counter-sep">/</span>
        <span className="quiz-counter-total">{questions.length}</span>
      </div>

      {/* Two-panel layout */}
      <div className="quiz-layout">

        {/* LEFT: Photo slideshow panel */}
        <div className="quiz-photo-panel">
          <PhotoSlideshow intervalMs={3500} />
          {/* Floating question emoji on photo */}
          <div className="quiz-emoji-badge">{q.emoji}</div>
        </div>

        {/* RIGHT: Question card */}
        <div className={[
          'quiz-card',
          animating ? 'quiz-card-exit' : '',
          entering  ? 'quiz-card-enter' : '',
        ].join(' ')}>

          {/* Step dots */}
          <div className="quiz-step-dots">
            {questions.map((_, i) => (
              <span
                key={i}
                className={[
                  'step-dot',
                  i === qIndex ? 'step-dot-active' : '',
                  i < qIndex   ? 'step-dot-done'   : '',
                ].join(' ')}
              />
            ))}
          </div>

          {/* Question text */}
          <h2 className="quiz-question">{q.question}</h2>

          {/* Answer options */}
          <div className="quiz-answers">
            {q.answers.map((ans, i) => (
              <button
                key={i}
                id={`q${q.id}-ans-${i}`}
                className={[
                  'quiz-answer-btn',
                  selected === i ? 'quiz-answer-selected' : '',
                ].join(' ')}
                onClick={() => handleSelect(i)}
                aria-pressed={selected === i}
              >
                <span className="quiz-answer-letter">
                  {['A', 'B', 'C', 'D'][i]}
                </span>
                <span className="quiz-answer-text">{ans.text}</span>
                {selected === i && (
                  <span className="quiz-answer-check">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            id="quiz-next-btn"
            className={['quiz-next-btn', selected !== null ? 'quiz-next-ready' : ''].join(' ')}
            onClick={handleNext}
            disabled={selected === null}
            aria-label={isLast ? 'See my result' : 'Next question'}
          >
            <span>{isLast ? 'See My Result' : 'Next'}</span>
            <span className="quiz-next-icon">{isLast ? '💖' : '→'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizScreen
