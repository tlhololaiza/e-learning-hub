import { useState } from 'react'
import type { Activity } from '../../utils/types'

const simulationSteps = ['Review the activity instructions', 'Complete the hands-on task', 'Record what you observed']

function getQuizQuestion(activity: Activity) {
  if (activity.title.toLowerCase().includes('fraction')) {
    return { question: 'Which fraction is equal to 0.5?', answers: ['1/4', '1/2', '3/4'], correct: '1/2' }
  }
  return { question: `Which statement best describes the main idea of ${activity.title}?`, answers: ['It applies the concepts from this lesson', 'It is unrelated to the lesson', 'It should be skipped'], correct: 'It applies the concepts from this lesson' }
}

export function ActivityModal({ activity, onClose, onComplete, learnerMode = false }: { activity: Activity; onClose: () => void; onComplete?: () => void; learnerMode?: boolean }) {
  const [steps, setSteps] = useState<boolean[]>(activity.type === 'Simulation' ? simulationSteps.map(() => false) : [])
  const [answer, setAnswer] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')

  function submit() {
    const quiz = activity.type === 'Quiz' ? getQuizQuestion(activity) : null
    const isValid = activity.type === 'Simulation'
      ? steps.length === simulationSteps.length && steps.every(Boolean)
      : activity.type === 'Quiz'
        ? answer === quiz?.correct
        : response.trim().length >= 30

    if (!isValid) {
      setError(activity.type === 'Simulation' ? 'Complete every step before submitting.' : activity.type === 'Quiz' ? 'Choose the correct answer to submit.' : 'Write at least 30 characters about your work.')
      return
    }
    onComplete?.()
    onClose()
  }

  return <div className="modal-backdrop" onClick={onClose}><div className="modal activity-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose}>×</button><div className={`activity-art ${activity.color}`}>{activity.icon}</div><p className="eyebrow">{activity.type.toUpperCase()}</p><h2>{activity.title}</h2><p className="muted">{activity.subject} · Due {activity.due}</p>{learnerMode ? <div className="activity-task"><p className="task-instruction">Complete the activity below to record your progress.</p>{activity.type === 'Simulation' && <fieldset><legend>Activity steps</legend>{simulationSteps.map((step, index) => <label className="task-option" key={step}><input type="checkbox" checked={steps[index] ?? false} onChange={(event) => setSteps((current) => current.map((value, stepIndex) => stepIndex === index ? event.target.checked : value))} />{step}</label>)}</fieldset>}{activity.type === 'Quiz' && (() => { const quiz = getQuizQuestion(activity); return <fieldset><legend>{quiz.question}</legend>{quiz.answers.map((option) => <label className="task-option" key={option}><input type="radio" name="quiz-answer" value={option} checked={answer === option} onChange={(event) => setAnswer(event.target.value)} />{option}</label>)}</fieldset> })()}{activity.type === 'Assignment' && <label>Response<textarea value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Explain what you learned or produced..." rows={5} /></label>}{error && <p className="form-error">{error}</p>}<button className="primary-button full-width" onClick={submit}>Submit activity</button></div> : <><div className="modal-stat"><strong>{Math.round((activity.completed / Math.max(activity.assigned, 1)) * 100)}%</strong><span>completion rate</span></div><button className="primary-button full-width" onClick={onClose}>Close</button></>}</div></div>
}
