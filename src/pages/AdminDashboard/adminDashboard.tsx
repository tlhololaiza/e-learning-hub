import { ActivityItem } from '../../components/Dashboard/ActivityItem'
import { CompletionChart } from '../../components/Dashboard/CompletionChart'
import { LearnerTable } from '../../components/Dashboard/LearnerTable'
import { QuickActions } from '../../components/Dashboard/QuickActions'
import { StatCard } from '../../components/Dashboard/StatCard'
import type { Activity, DashboardData } from '../../utils/types'

type AdminDashboardProps = {
  userName: string
  data: DashboardData
  averageProgress: number
  completedActivities: number
  onAddLearner: () => void
  onRemoveLearner: (id: string) => void
  onActivityClick: (activity: Activity) => void
  onViewReports: () => void
}

export default function AdminDashboard({ userName, data, averageProgress, completedActivities, onAddLearner, onRemoveLearner, onActivityClick, onViewReports }: AdminDashboardProps) {
  return (
    <div className="page-wrap">
      <section className="welcome-row"><div><p className="eyebrow">FRIDAY, MAY 22, 2026</p><h1>Welcome, {userName} <span className="wave">✦</span></h1><p className="subtitle">Here’s what’s happening across your learning space today.</p></div></section>
      <section className="hero-banner"><div className="hero-copy"><span className="hero-kicker">LEARNING AT A GLANCE</span><h2>Small steps, big progress.</h2><p>Keep your learners moving forward with meaningful activities.</p><button className="text-button" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>Explore progress <span>→</span></button></div><div className="hero-graphic"><div className="graphic-sun" /><div className="graphic-card card-one"><span>✦</span><strong>+18%</strong><small>this month</small></div><div className="graphic-card card-two"><span className="mini-avatar">AO</span><small>Great work!</small></div><div className="graphic-line" /></div></section>
      <section className="section-heading"><div><p className="eyebrow">OVERVIEW</p><h2>At a glance</h2></div><span className="updated">Updated just now <i /></span></section>
      <section className="stats-grid"><StatCard label="Total learners" value={String(data.learners.length)} icon="♙" tone="blue" /><StatCard label="Active activities" value={String(data.activities.length)} icon="▤" tone="mint" /><StatCard label="Avg. completion" value={`${averageProgress}%`} icon="◒" tone="peach" /><StatCard label="Activities completed" value={String(completedActivities)} icon="✓" tone="lavender" /></section>
      <section className="dashboard-grid"><div className="panel progress-panel"><div className="panel-heading"><div><p className="eyebrow">LEARNER ENGAGEMENT</p><h2>Completion overview</h2></div><button className="filter-button">Last 30 days <span>⌄</span></button></div><CompletionChart /><div className="chart-legend"><span><i className="legend-purple" /> Completion rate</span><span><i className="legend-dashed" /> Target</span><strong>+18.4%</strong><small>from previous period</small></div></div><div className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Latest updates</h2></div><button className="dots-button">•••</button></div><div className="activity-list"><ActivityItem icon="✓" tone="green" title="New learner enrolled" detail="Amara Okafor joined Cohort 04" time="12 min ago" /><ActivityItem icon="◌" tone="purple" title="Simulation completed" detail="Kwame completed The Water Cycle" time="43 min ago" /><ActivityItem icon="!" tone="orange" title="Learner needs attention" detail="Lerato is falling behind schedule" time="2 hrs ago" /><ActivityItem icon="+" tone="blue" title="New activity created" detail="Build a Simple Circuit was published" time="Yesterday" /></div><button className="view-all">View all activity <span>→</span></button></div></section>
      <section className="section-heading lower-heading"><div><p className="eyebrow">MANAGE</p><h2>Your learning space</h2></div><button className="outline-button" onClick={onAddLearner}>+ Add learner</button></section>
      <section className="bottom-grid"><div className="panel table-panel"><div className="panel-heading"><div><h2>Recent learners</h2><p className="muted">Monitor progress across your cohorts</p></div><button className="view-all">View all <span>→</span></button></div><LearnerTable learners={data.learners.slice(0, 4)} onRemove={onRemoveLearner} /></div><QuickActions onAddLearner={onAddLearner} onActivityClick={onActivityClick} onViewReports={onViewReports} activity={data.activities[0]} /></section>
    </div>
  )
}
