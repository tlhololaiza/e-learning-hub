import { useState, type FormEvent } from 'react'
import type { Activity } from '../../utils/types'

export function ActivityFormModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (activity: Activity) => void }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [type, setType] = useState<Activity['type']>('Simulation')
  const [due, setDue] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    onSubmit({ id: String(Date.now()), title, subject, type, assigned: 0, completed: 0, due, color: type === 'Quiz' ? 'lavender' : type === 'Assignment' ? 'peach' : 'mint', icon: type === 'Quiz' ? '÷' : type === 'Assignment' ? '✎' : '◌' })
  }

  return <div className="modal-backdrop" onClick={onClose}><form className="modal" onSubmit={submit} onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">CONTENT</p><h2>Create activity</h2></div><button type="button" className="close-button" onClick={onClose}>×</button></div><label>Activity title<input value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="e.g. Photosynthesis lab" /></label><label>Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} required placeholder="e.g. Biology" /></label><label>Type<select value={type} onChange={(event) => setType(event.target.value as Activity['type'])}><option>Simulation</option><option>Quiz</option><option>Assignment</option></select></label><label>Due date<input value={due} onChange={(event) => setDue(event.target.value)} required type="date" /></label><button className="primary-button full-width" type="submit">Create activity</button></form></div>
}
