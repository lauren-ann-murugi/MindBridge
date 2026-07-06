'use client'

import { useState, useEffect } from 'react'
import { X, Loader, AlertCircle, RefreshCw, CheckCircle2, XCircle, Brain } from 'lucide-react'

const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
const GROQ_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

export default function QuizModal({ isOpen, onClose, material }) {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (isOpen && material && questions.length === 0) {
      generateQuiz()
    }
  }, [isOpen, material])

  const generateQuiz = async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      // 1. SYSTEM INSIGHTS: Localized Token Inference Auth Retrieval
      const rawToken = typeof window !== 'undefined'
        ? (localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY)
        : process.env.NEXT_PUBLIC_GROQ_API_KEY

      if (!rawToken || rawToken === 'undefined' || rawToken.trim() === '') {
        throw new Error('Missing Groq authorization tokens in localized sandbox environments.')
      }

      const cleanToken = String(rawToken).replace(/['"`;]/g, '').trim()
      const titleText = material?.title || 'Workspace Asset'
      const typeText = material?.type || 'Document'
      
      // 2. CONTEXTUAL TEXT FRAMES: Localized Content Optimization Layer
      const sourceText = String(material?.text || material?.content || material?.body || '').substring(0, 6000)

      // 3. DEEP VECTOR QUIZ GENERATION: Structured Payload Transaction
      const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanToken}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          response_format: { type: "json_object" }, // Forces structured output handling natively
          messages: [
            {
              role: 'system',
              content: 'You are an academic quiz architect. Generate exactly 5 conceptual multiple-choice questions. Return ONLY a valid JSON object matching this schema exactly: { "quiz": [ { "question": "string text", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0 } ] }. Keep alternative options competitive and balanced.',
            },
            {
              role: 'user',
              content: `Material Title: ${titleText}\nMaterial Type: ${typeText}\n\nContext Content Frame Block:\n${sourceText || 'No source content available. Evaluate metadata patterns contextually.'}`,
            },
          ],
          max_tokens: 1200,
          temperature: 0.3, // Lower temperature to target strict analytical accuracy
        }),
      })

      if (!response.ok) {
        throw new Error(`Groq Inference Pipeline Fault (${response.status})`)
      }

      const data = await response.json()
      let responseText = data.choices?.[0]?.message?.content || '{}'
      
      // Sanitizing code blocks if model breaks formatting boundaries
      if (responseText.includes('```json')) {
        responseText = responseText.split('```json')[1].split('```')[0].trim()
      } else if (responseText.includes('```')) {
        responseText = responseText.split('```')[1].split('```')[0].trim()
      }

      const parsedJson = JSON.parse(responseText)
      const validQuestionsArray = parsedJson.quiz || parsedJson.questions || (Array.isArray(parsedJson) ? parsedJson : [])

      if (!Array.isArray(validQuestionsArray) || validQuestionsArray.length === 0) {
        throw new Error('Failed to parse a valid quiz question sequence array from model node payload.')
      }

      // Setting vector matching nodes into memory
      setQuestions(validQuestionsArray)
    } catch (error) {
      console.error('Quiz initialization vector failure:', error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (optionIndex) => {
    if (answered) return
    setSelected(optionIndex)
    setAnswered(true)

    if (optionIndex === questions[currentQuestion].correctIndex) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setErrorMessage(null)
  }

  if (!isOpen) return null

  const q = questions[currentQuestion]
  const isComplete = questions.length > 0 && currentQuestion === questions.length - 1 && answered
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-6 box-border animate-fadeIn">
      {/* Structural Dim Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container Card Frame */}
      <div className="relative bg-[#0e0e12] border border-white/[0.06] rounded-xl p-6 max-w-xl w-full min-h-[380px] flex flex-col justify-between overflow-hidden box-border z-10 shadow-2xl">
        
        {/* Upper Header Segment */}
        <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 mb-5 shrink-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <Brain size={14} className="text-indigo-400" />
              <h2 className="m-0 text-sm font-semibold text-white tracking-wide">Knowledge Assessment</h2>
            </div>
            <p className="m-0 text-[10px] text-white/35 uppercase tracking-wider truncate max-w-[320px]">
              {material?.title || 'Material Evaluation Tracker'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="bg-transparent border-0 text-white/40 hover:text-white transition-all p-1 hover:bg-white/[0.04] rounded-md cursor-pointer flex items-center justify-center"
          >
            <X size={15} />
          </button>
        </div>

        {/* Dynamic Inner Evaluation Shell Panels */}
        <div className="flex-1 flex flex-col justify-center py-2">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3.5 py-8">
              <Loader size={24} className="text-indigo-400 animate-spin" />
              <p className="text-white/50 text-xs tracking-wide text-center">Synthesizing deep assessment vectors via Groq model pipeline...</p>
            </div>
          ) : errorMessage ? (
            <div className="flex flex-col items-center gap-3 p-5 bg-red-500/[0.01] border border-red-500/15 rounded-lg w-full box-border">
              <AlertCircle size={22} className="text-red-500" />
              <p className="m-0 text-xs font-mono text-red-300 text-center leading-relaxed max-w-md break-words">{errorMessage}</p>
              <button 
                onClick={generateQuiz} 
                className="bg-white border-0 text-black text-xs font-semibold py-1.5 px-3.5 rounded-md cursor-pointer mt-3 hover:bg-white/90 transition-all flex items-center gap-1.5"
              >
                <RefreshCw size={11} /> Retry Evaluation Pipeline
              </button>
            </div>
          ) : questions.length === 0 ? (
            <p className="text-white/30 text-center text-xs py-8">No quiz matrices successfully mapped for initialization.</p>
          ) : !answered && isComplete ? null : currentQuestion < questions.length && q ? (
            
            // ACTIVE ASSESSMENT NODE LAYOUT
            <div className="w-full animate-fadeIn">
              <div className="mb-4 p-2.5 bg-white/[0.01] border border-white/[0.03] rounded-lg flex justify-between items-center box-border">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Question {currentQuestion + 1} of {questions.length}</span>
                <div className="h-1.5 w-32 bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <p className="m-0 mb-4 text-xs font-medium text-white/90 leading-relaxed pr-1">{q.question}</p>

              {/* Options Vertical Cluster Group */}
              <div className="flex flex-col gap-2.5">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i
                  const isCorrectAnswer = i === q.correctIndex
                  
                  let optStyle = "bg-white/[0.01] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/15 text-white/80"
                  if (answered) {
                    if (isCorrectAnswer) optStyle = "bg-green-500/10 border-green-500/40 text-green-300"
                    else if (isSelected) optStyle = "bg-red-500/10 border-red-500/40 text-red-300 opacity-90"
                    else optStyle = "bg-white/[0.01] border-white/[0.03] text-white/30 opacity-40"
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      className={`w-full text-left p-3.5 border rounded-lg flex items-center justify-between gap-3 text-xs transition-all box-border ${
                        answered ? 'cursor-default' : 'cursor-pointer'
                      } ${optStyle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono tracking-tight font-bold border shrink-0 ${
                          answered && isCorrectAnswer 
                            ? 'bg-green-500/20 border-green-500/20 text-green-300' 
                            : answered && isSelected 
                            ? 'bg-red-500/20 border-red-500/20 text-red-300' 
                            : 'bg-white/[0.03] border-white/10 text-white/60'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="truncate pr-1 font-normal">{opt}</span>
                      </div>
                      {answered && isCorrectAnswer && <CheckCircle2 size={13} className="text-green-400 shrink-0" />}
                      {answered && isSelected && !isCorrectAnswer && <XCircle size={13} className="text-red-400 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            
            // SCORE SUMMARY RENDER OVERVIEW
            <div className="text-center py-4 animate-fadeIn">
              <div className="text-4xl mb-3">
                {percentage >= 80 ? '👑' : percentage >= 60 ? '⚡' : '🧠'}
              </div>
              <h3 className="m-0 text-xl font-bold text-white tracking-wide">{percentage}% Mastery Score</h3>
              <p className="m-0 mt-1.5 text-xs text-white/50 tracking-wide">
                Successfully checked {score} out of {questions.length} matching nodes.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Control Action Row */}
        <div className="flex justify-between items-center border-t border-white/[0.05] pt-4 mt-4 shrink-0">
          <button 
            onClick={onClose} 
            className="bg-transparent border-0 text-white/40 hover:text-white text-xs font-medium cursor-pointer transition-all py-1.5"
          >
            Leave Terminal
          </button>

          {answered && !isComplete && (
            <button
              onClick={nextQuestion}
              className="bg-white border-0 text-black text-xs font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-white/90 transition-all shadow-md ml-auto"
            >
              Continue Module
            </button>
          )}

          {isComplete && (
            <div className="flex gap-2 ml-auto">
              <button
                onClick={resetQuiz}
                className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400 font-medium text-xs py-2 px-4 rounded-lg cursor-pointer transition-all"
              >
                Re-initialize Quiz
              </button>
              <button
                onClick={onClose}
                className="bg-white border-0 text-black font-semibold text-xs py-2 px-4 rounded-lg cursor-pointer hover:bg-white/95 transition-all shadow-md"
              >
                Terminate View
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}