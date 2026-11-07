import { LearnerTable } from '../../components/Dashboard/LearnerTable'
import type { Learner } from '../../utils/types'

export default function Learners({ learners, onAdd, onRemove }: { learners: Learner[]; onAdd: () => void; onRemove: (id: string) => void }) {
  return <div className="page-wrap inner-page"><div className="page-title-row"><div><p className="eyebrow">PEOPLE</p><h1>Learners</h1><p className="subtitle">Manage everyone in your learning space.</p></div><button className="primary-button" onClick={onAdd}>+ Add learner</button></div><div className="panel table-panel standalone-table"><div className="search-row"><input placeholder="⌕  Search learners" /><button className="filter-button">All cohorts ⌄</button></div><LearnerTable learners={learners} onRemove={onRemove} /></div></div>
}
