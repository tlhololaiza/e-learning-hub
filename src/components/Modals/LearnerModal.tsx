import type { FormEvent } from 'react'

type LearnerModalProps = {
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function LearnerModal({ onClose, onSubmit }: LearnerModalProps) {
  return <div className="modal-backdrop" onClick={onClose}><form className="modal" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">LEARNERS</p><h2>Add a learner</h2></div><button type="button" className="close-button" onClick={onClose}>×</button></div><label>Full name<input name="name" required placeholder="e.g. Maya Patel" /></label><label>Email address<input name="email" type="email" required placeholder="maya@email.com" /></label><button className="primary-button full-width" type="submit">Add learner</button></form></div>
}
