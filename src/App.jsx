import React, { useState } from 'react'
import IntroScreen from './components/IntroScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import emailjs from '@emailjs/browser'
import './App.css'

// All quiz questions with answers and scoring
export const QUESTIONS = [
  {
    id: 1,
    question: "Ati yeroo mara jaalala akkamiitu sitti tola? / What kind of love is actually your vibe? ✨",
    emoji: "😎",
    answers: [
      { text: "Kan waliin kolfu / Laughing until our stomachs hurt", score: 1 },
      { text: "Kan harka wal-qabatee deemu / Cheesy holding hands stuff", score: 1 },
      { text: "Kan callisee wal-hubatu / Quiet vibes & Netflix", score: 1 },
      { text: "Hunda isaa! / Give me all of it!", score: 1 },
    ],
  },
  {
    id: 2,
    question: "Nama tokko yoo yaaddu maal goota? / What's your move when someone is stuck in your head? 🤔",
    emoji: "👀",
    answers: [
      { text: "Suuraa isaa nan laala / Stalking your photos (just a bit!)", score: 1 },
      { text: "Nan bilbilaaf / I just call or text directly", score: 1 },
      { text: "Nan callisa / I keep it a secret and act cool", score: 0.5 },
      { text: "Nan irraanfadha / I try to forget (but I can't!)", score: 0 },
    ],
  },
  {
    id: 3,
    question: "Yoo namni tokko 'Ati anaaf adda' siin jedhe? / If someone says 'You're special to me'... 😳",
    emoji: "💖",
    answers: [
      { text: "Nan kolfadha / I'll probably just blush and smile", score: 1 },
      { text: "Anis akkasuma! / I'd say 'You are special too!'", score: 1 },
      { text: "Maaliif? / I'd ask 'Wait, really? Why?'", score: 0.5 },
      { text: "Nan baqadha! / I'd run away (just kidding!)", score: 0 },
    ],
  },
  {
    id: 4,
    question: "Guyyaa kee maalitu gammachiisa? / What's the fastest way to make you smile? ⚡",
    emoji: "🍕",
    answers: [
      { text: "Nyaata gaarii / Good food is the secret key", score: 1 },
      { text: "Ergaa bareedduu / A sweet 'Good Morning' text", score: 1 },
      { text: "Waliin deemuu / Just hanging out together", score: 1 },
      { text: "Kolfisiisuu / Making me laugh non-stop", score: 1 },
    ],
  },
  {
    id: 5,
    question: "Wanti si gammachiisu maali? / What truly makes your heart do a happy dance? 💃",
    emoji: "🌈",
    answers: [
      { text: "Nama na hubatu / Someone who actually gets me", score: 1 },
      { text: "Nama na kolfisiisu / Someone who makes me laugh", score: 1 },
      { text: "Nama na jaallatu / Someone who loves me for real", score: 1 },
      { text: "Nageenya / Just peace, quiet and you", score: 1 },
    ],
  },
  {
    id: 6,
    question: "Amma amma eenyuun yaadaa jirta? / Be honest, who are you thinking about right now? 😏",
    emoji: "🎯",
    answers: [
      { text: "Sima! / Definitely you, obviously!", score: 1 },
      { text: "Si'i ta'uu mala / Maybe it's you... who knows?", score: 1 },
      { text: "Iccitiidha! / It's a top secret!", score: 0.5 },
      { text: "Eenyuuniyyuu / No one special (Liar!)", score: 0 },
    ],
  },
]

function App() {
  const [screen, setScreen] = useState('intro') // 'intro' | 'quiz' | 'result'
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  const handleStart = () => setScreen('quiz')

  const handleFinish = (collectedAnswers, totalScore) => {
    setAnswers(collectedAnswers)
    setScore(totalScore)
    setScreen('result')

    // Prepare and send the email
    const formattedAnswers = collectedAnswers.map(a => {
      const q = QUESTIONS.find(curr => curr.id === a.questionId)
      return `Question: ${q.question}\nAnswer: ${q.answers[a.answerIdx].text}`
    }).join('\n\n')

    const templateParams = {
      to_email: 'abenm410@gmail.com',
      from_name: 'Bony',
      total_score: totalScore,
      answers_summary: formattedAnswers,
    }

    // EmailJS credentials configured
    emailjs.send(
      'service_0ntia54', 
      'template_tfkv1xt', 
      templateParams, 
      'aat6ziqGEqgNtDAg6'
    ).then(
      (response) => console.log('Email sent successfully!', response.status, response.text),
      (error) => console.error('Failed to send email...', error)
    )
  }

  const handleRetry = () => {
    setAnswers([])
    setScore(0)
    setScreen('intro')
  }

  return (
    <div className="app-root">
      {screen === 'intro' && <IntroScreen onStart={handleStart} />}
      {screen === 'quiz' && (
        <QuizScreen questions={QUESTIONS} onFinish={handleFinish} />
      )}
      {screen === 'result' && (
        <ResultScreen 
          score={score} 
          answers={answers} 
          questions={QUESTIONS}
          onRetry={handleRetry} 
        />
      )}
    </div>
  )
}

export default App
