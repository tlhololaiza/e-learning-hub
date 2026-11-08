import type { DashboardData } from '../../utils/types'

export default function LearnerDashboard({ userName, data, completedIds, onStart }: { userName: string; data: DashboardData; completedIds: string[]; onStart: (activity: DashboardData['activities'][number]) => void }) {
  const completed = completedIds.length
  const assigned = data.activities.length

  return (
    <div className="page-wrap inner-page">
      <div className="page-title-row"><div><p className="eyebrow">MY LEARNING</p><h1>Welcome back, {userName}</h1><p className="subtitle">Keep building your learning streak.</p></div></div>
      <div className="report-grid">
        <div className="report-highlight"><span className="eyebrow">MY PROGRESS</span><strong>86%</strong><p>Overall learning progress</p><div className="big-progress"><i style={{ width: '86%' }} /></div></div>
        <div className="report-highlight peach-report"><span className="eyebrow">ACTIVITIES COMPLETED</span><strong>{completed}</strong><p>of {assigned} assigned activities</p><div className="big-progress"><i style={{ width: `${Math.round((completed / assigned) * 100)}%` }} /></div></div>
      </div>
      <div className="section-heading"><div><p className="eyebrow">UP NEXT</p><h2>Continue your activities</h2></div></div>
      <div className="activity-cards">{data.activities.map((activity) => { const isComplete = completedIds.includes(activity.id); return <div className="activity-card" key={activity.id}><div className={`activity-art ${activity.color}`}>{activity.icon}</div><div className="activity-card-copy"><span className="eyebrow">{activity.type}</span><h2>{activity.title}</h2><p>{activity.subject}</p><div className="card-footer"><span>{isComplete ? 'Completed' : 'Ready to start'}</span><span>Due {activity.due}</span></div><button className={`primary-button full-width ${isComplete ? 'completed-button' : ''}`} onClick={() => onStart(activity)} disabled={isComplete}>{isComplete ? 'Completed ✓' : 'Start activity'}</button></div></div> })}</div>
    </div>
  )
}