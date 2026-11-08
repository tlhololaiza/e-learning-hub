import type { Learner } from '../../utils/types'

type LearnerTableProps = {
  learners: Learner[]
  onRemove?: (id: string) => void
}

export function LearnerTable({ learners, onRemove }: LearnerTableProps) {
  return (
    <div className="learner-table">
      <div className="table-head"><span>Learner</span><span>Progress</span><span>Status</span><span>Last active</span></div>
      {learners.map((learner) => (
        <div className="table-row" key={learner.id}>
          <span className="learner-name"><i className={`avatar avatar-${learner.color}`}>{learner.initials}</i><span><strong>{learner.name}</strong><small>{learner.cohort}</small></span></span>
          <span className="progress-cell"><div className="progress-bar"><i style={{ width: `${learner.progress}%` }} /></div><strong>{learner.progress}%</strong></span>
          <span><b className={`status status-${learner.status.toLowerCase().replace(' ', '-')}`}>{learner.status}</b></span>
          <span className="last-active">{learner.id === '1' ? '12 min ago' : learner.id === '2' ? '43 min ago' : 'Yesterday'}{onRemove && <button className="table-delete" onClick={() => onRemove(learner.id)} aria-label={`Remove ${learner.name}`}>×</button>}</span>
        </div>
      ))}
    </div>
  )
}
