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
    question: "When you think about a 'perfect connection,' what feels most important to you?",
    emoji: "✨",
    answers: [
      { text: "A deep, unspoken understanding of each other", score: 1 },
      { text: "A sense of adventure and shared laughter", score: 1 },
      { text: "Total honesty and being completely vulnerable", score: 1 },
      { text: "Consistency and knowing they'll always be there", score: 1 },
    ],
  },
  {
    id: 2,
    question: "How do you feel when someone notices the tiny details about you that others miss?",
    emoji: "🦋",
    answers: [
      { text: "It makes me feel deeply seen and cherished", score: 1 },
      { text: "It's surprising but very heartwarming", score: 1 },
      { text: "I feel a bit shy but secretly very happy", score: 0.5 },
      { text: "I don't really notice when people do that", score: 0 },
    ],
  },
  {
    id: 3,
    question: "In your quietest moments, what kind of love do you find yourself dreaming of?",
    emoji: "🌙",
    answers: [
      { text: "A love that feels like a calm harbor in a storm", score: 1 },
      { text: "A love that inspires me to be my best self", score: 1 },
      { text: "A love that is my best friend and my home", score: 1 },
      { text: "I'm not sure if I'm dreaming of love right now", score: 0 },
    ],
  },
  {
    id: 4,
    question: "If someone told you that you've changed their entire world for the better... how would that land in your heart?",
    emoji: "🌍",
    answers: [
      { text: "I'd be moved to tears—that's so beautiful", score: 1 },
      { text: "I'd feel an incredible warmth and joy", score: 1 },
      { text: "I'd feel honored but maybe a little overwhelmed", score: 0.5 },
      { text: "I'd probably think they're exaggerating", score: -1 },
    ],
  },
  {
    id: 5,
    question: "Do you believe that some people are meant to find each other, no matter the distance or time?",
    emoji: "💫",
    answers: [
      { text: "Absolutely—some connections are written in the stars", score: 1 },
      { text: "I'd like to believe that, it's a beautiful thought", score: 1 },
      { text: "Maybe, but I think we choose who we love", score: 0.5 },
      { text: "No, I think life is mostly just coincidences", score: -1 },
    ],
  },
  {
    id: 6,
    question: "If you could see yourself through the eyes of someone who truly cares for you, what do you think you'd see?",
    emoji: "💖",
    answers: [
      { text: "Someone precious, rare, and worth everything", score: 1 },
      { text: "Someone who brings light and color into a room", score: 1 },
      { text: "Someone who is still figuring things out", score: 0.5 },
      { text: "I'm not sure what they would see", score: 0 },
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
