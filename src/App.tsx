import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { getDashboardData } from './api/jsonServer'
import { ActivityModal } from './components/Modals/ActivityModal'
import { ActivityFormModal } from './components/Modals/ActivityFormModal'
import { LearnerModal } from './components/Modals/LearnerModal'
import { AppShell } from './components/Layout/AppShell'
import Login from './pages/Login/login'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import { useAuth } from './redux/authSlice'
import { createActivity, createLearner, removeActivity, removeLearner, saveCompletion } from './api/jsonServer'
import { demoData } from './data/demoData'
import AdminDashboard from './pages/AdminDashboard/adminDashboard'
import Activities from './pages/Activities/activities'
import LearnerDashboard from './pages/LearnerDasboard/learnerDashboard'
import Learners from './pages/Learners/learners'
import Reports from './pages/Reports/reports'
import Settings from './pages/Settings/settings'
import type { Activity, Completion, DashboardData, Learner } from './utils/types'
import type { NavItem } from './components/Layout/Sidebar'

function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Dashboard')
  const { user, logout } = useAuth()
  const [data, setData] = useState<DashboardData>(demoData)
  const [serviceMessage, setServiceMessage] = useState('Demo data · start JSON Server to sync')
  const [showLearnerForm, setShowLearnerForm] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [completedIds, setCompletedIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('elearn-completions') ?? '[]') as string[])

  useEffect(() => {
    let active = true
    getDashboardData()
      .then((serverData) => {
        if (active && serverData.learners.length > 0) {
          setData(serverData)
          setServiceMessage('Live data connected')
        }
      })
      .catch(() => {
        if (active) setServiceMessage('Demo data · JSON Server unavailable')
      })
    return () => { active = false }
  }, [])

  const completedActivities = useMemo(() => data.activities.reduce((total, item) => total + item.completed, 0), [data.activities])
  const assignedActivities = useMemo(() => data.activities.reduce((total, item) => total + item.assigned, 0), [data.activities])
  const averageProgress = data.learners.length ? Math.round(data.learners.reduce((total, learner) => total + learner.progress, 0) / data.learners.length) : 0

  function addLearner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? 'New learner')
    const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    const learner: Learner = { id: String(Date.now()), name, email: String(form.get('email') ?? ''), cohort: 'Cohort 05 · 2024', progress: 0, status: 'Active', initials, color: 'blue' }
    setData((current) => ({ ...current, learners: [learner, ...current.learners] }))
    void createLearner(learner).catch(() => undefined)
    setShowLearnerForm(false)
  }

  function removeLearnerById(id: string) {
    if (!window.confirm('Remove this learner?')) return
    setData((current) => ({ ...current, learners: current.learners.filter((learner) => learner.id !== id) }))
    void removeLearner(id).catch(() => undefined)
  }

  function addActivity(activity: Activity) {
    setData((current) => ({ ...current, activities: [activity, ...current.activities] }))
    void createActivity(activity).catch(() => undefined)
    setShowActivityForm(false)
  }

  function removeActivityById(id: string) {
    if (!window.confirm('Remove this activity?')) return
    setData((current) => ({ ...current, activities: current.activities.filter((activity) => activity.id !== id) }))
    void removeActivity(id).catch(() => undefined)
  }

  function completeActivity(activityId: string) {
    if (!user?.learnerId || completedIds.includes(activityId)) return
    const next = [...completedIds, activityId]
    setCompletedIds(next)
    localStorage.setItem('elearn-completions', JSON.stringify(next))
    const completion: Completion = { id: `${user.learnerId}-${activityId}`, learnerId: user.learnerId, activityId, completedAt: new Date().toISOString() }
    void saveCompletion(completion).catch(() => undefined)
  }

  function renderPage() {
    if (activeNav === 'Dashboard') return user?.role === 'admin'
      ? <AdminDashboard data={data} averageProgress={averageProgress} completedActivities={completedActivities} onAddLearner={() => setShowLearnerForm(true)} onActivityClick={setSelectedActivity} />
      : <LearnerDashboard data={data} completedIds={completedIds} onComplete={completeActivity} />
    if (activeNav === 'Learners' && user?.role === 'admin') return <Learners learners={data.learners} onAdd={() => setShowLearnerForm(true)} onRemove={removeLearnerById} />
    if (activeNav === 'Activities' && user?.role === 'admin') return <Activities activities={data.activities} onActivityClick={setSelectedActivity} onCreate={() => setShowActivityForm(true)} onRemove={removeActivityById} />
    if (activeNav === 'Reports' && user?.role === 'admin') return <Reports learners={data.learners} averageProgress={averageProgress} completed={completedActivities} assigned={assignedActivities} />
    return <Settings />
  }

  if (!user) return <Login />

  return (
    <ProtectedRoute>
      <AppShell activeNav={activeNav} learnerCount={data.learners.length} serviceMessage={serviceMessage} role={user.role} onNavigate={setActiveNav} onLogout={logout}>
        {renderPage()}
        {user.role === 'admin' && showLearnerForm && <LearnerModal onClose={() => setShowLearnerForm(false)} onSubmit={addLearner} />}
        {user.role === 'admin' && showActivityForm && <ActivityFormModal onClose={() => setShowActivityForm(false)} onSubmit={addActivity} />}
        {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
      </AppShell>
    </ProtectedRoute>
  )
}

export default App
