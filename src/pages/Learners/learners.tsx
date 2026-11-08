import { useMemo, useState } from 'react'
import { LearnerTable } from '../../components/Dashboard/LearnerTable'
import type { Learner } from '../../utils/types'

export default function Learners({ learners, onAdd, onRemove }: { learners: Learner[]; onAdd: () => void; onRemove: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredLearners = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    if (!normalizedSearch) return learners
    return learners.filter((learner) => [learner.name, learner.email, learner.cohort].some((value) => value.toLowerCase().includes(normalizedSearch)))
  }, [learners, searchTerm])

  return <div className="page-wrap inner-page"><div className="page-title-row"><div><p className="eyebrow">PEOPLE</p><h1>Learners</h1><p className="subtitle">Manage everyone in your learning space.</p></div><button className="primary-button" onClick={onAdd}>+ Add learner</button></div><div className="panel table-panel standalone-table"><div className="search-row"><input aria-label="Search learners" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="⌕  Search learners" /><button className="filter-button">All cohorts ⌄</button></div>{filteredLearners.length > 0 ? <LearnerTable learners={filteredLearners} onRemove={onRemove} /> : <p className="muted">No learners match your search.</p>}</div></div>
}
