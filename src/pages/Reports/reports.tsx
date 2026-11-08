import type { DashboardData } from '../../utils/types'

export default function Reports({ data, isLive }: { data: DashboardData; isLive: boolean }) {
  if (!isLive) {
    return <div className="page-wrap inner-page"><div className="page-title-row"><div><p className="eyebrow">INSIGHTS</p><h1>Reports</h1><p className="subtitle">Reports are available when the JSON Server is connected.</p></div></div></div>
  }

  const learners = data.learners
  const assigned = data.activities.reduce((total, activity) => total + activity.assigned, 0)
  const completed = data.activities.reduce((total, activity) => total + activity.completed, 0)
  const averageProgress = learners.length ? Math.round(learners.reduce((total, learner) => total + learner.progress, 0) / learners.length) : 0
  const completionRate = assigned ? Math.round((completed / assigned) * 100) : 0
  return <div className="page-wrap inner-page"><div className="page-title-row"><div><p className="eyebrow">INSIGHTS</p><h1>Reports</h1><p className="subtitle">A clear view of your learning impact.</p></div><button className="outline-button">Export report ↓</button></div><div className="report-grid"><div className="report-highlight"><span className="eyebrow">AVERAGE LEARNER PROGRESS</span><strong>{averageProgress}%</strong><p>Across {learners.length} active learners</p><div className="big-progress"><i style={{ width: `${averageProgress}%` }} /></div></div><div className="report-highlight peach-report"><span className="eyebrow">COMPLETION RATE</span><strong>{completionRate}%</strong><p>{completed} of {assigned} activities completed</p><div className="big-progress"><i style={{ width: `${completionRate}%` }} /></div></div></div></div>
}
