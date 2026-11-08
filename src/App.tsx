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
import { createActivity, createLearner, createUser, removeActivity, removeLearner, removeLearnerAccount, saveCompletion, updateLearner, updateUser } from './api/jsonServer'
import { demoData } from './data/demoData'
import AdminDashboard from './pages/AdminDashboard/adminDashboard'
import Activities from './pages/Activities/activities'
import LearnerDashboard from './pages/LearnerDasboard/learnerDashboard'
import Learners from './pages/Learners/learners'
import Reports from './pages/Reports/reports'
import Settings from './pages/Settings/settings'
import type { Activity, AuthUser, Completion, DashboardData, Learner } from './utils/types'
import type { NavItem } from './components/Layout/Sidebar'

function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Dashboard')
  const { user, logout, updateUser: updateSessionUser } = useAuth()
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
    const email = String(form.get('email') ?? '').toLowerCase()
    const password = String(form.get('password') ?? '')
    const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    const learnerId = String(Date.now())
    const learner: Learner = { id: learnerId, name, email, cohort: 'Cohort 05 · 2026', progress: 0, status: 'Active', initials, color: 'blue' }
    const account = { id: `learner-${learnerId}`, name, email, role: 'learner' as const, learnerId, password }
    setData((current) => ({ ...current, learners: [learner, ...current.learners] }))
    void createLearner(learner).catch(() => undefined)
    void createUser(account).catch(() => undefined)
    setShowLearnerForm(false)
  }

  async function removeLearnerById(id: string) {
    if (!window.confirm('Remove this learner?')) return
    setData((current) => ({ ...current, learners: current.learners.filter((learner) => learner.id !== id) }))
    try {
      await Promise.all([removeLearner(id), removeLearnerAccount(id)])
    } catch {
      setServiceMessage('Learner removed locally · JSON Server sync failed')
    }
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

  async function saveUserDetails(details: { name: string; email: string; password: string }) {
    if (!user) return
    const updatedUser = { ...user, name: details.name.trim(), email: details.email.trim().toLowerCase(), ...(details.password ? { password: details.password } : {}) }
    const learner = user.role === 'learner'
      ? data.learners.find((item) => item.id === user.learnerId || item.id === user.id || item.email.toLowerCase() === user.email.toLowerCase())
      : undefined
    const updatedLearner = learner
      ? { ...learner, name: updatedUser.name, email: updatedUser.email, initials: updatedUser.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
      : undefined

    await Promise.all([
      updateUser(updatedUser),
      updatedLearner ? updateLearner(updatedLearner) : Promise.resolve(),
    ])

    if (updatedLearner) {
      setData((current) => ({ ...current, learners: current.learners.map((item) => item.id === updatedLearner.id ? updatedLearner : item) }))
    }
    updateSessionUser(updatedUser)
  }

  function renderPage(currentUser: AuthUser) {
    if (activeNav === 'Dashboard') return currentUser.role === 'admin'
      ? <AdminDashboard userName={currentUser.name} data={data} averageProgress={averageProgress} completedActivities={completedActivities} onAddLearner={() => setShowLearnerForm(true)} onRemoveLearner={removeLearnerById} onActivityClick={setSelectedActivity} onViewReports={() => setActiveNav('Reports')} />
      : <LearnerDashboard userName={currentUser.name} data={data} completedIds={completedIds} onStart={setSelectedActivity} />
    if (activeNav === 'Learners' && currentUser.role === 'admin') return <Learners learners={data.learners} onAdd={() => setShowLearnerForm(true)} onRemove={removeLearnerById} />
    if (activeNav === 'Activities' && currentUser.role === 'admin') return <Activities activities={data.activities} onActivityClick={setSelectedActivity} onCreate={() => setShowActivityForm(true)} onRemove={removeActivityById} />
    if (activeNav === 'Reports' && currentUser.role === 'admin') return <Reports learners={data.learners} averageProgress={averageProgress} completed={completedActivities} assigned={assignedActivities} />
    return <Settings user={currentUser} onSave={saveUserDetails} />
  }

  if (!user) return <Login />

  return (
    <ProtectedRoute>
      <AppShell activeNav={activeNav} learnerCount={data.learners.length} serviceMessage={serviceMessage} user={user} onNavigate={setActiveNav} onLogout={logout}>
        {renderPage(user)}
        {user.role === 'admin' && showLearnerForm && <LearnerModal onClose={() => setShowLearnerForm(false)} onSubmit={addLearner} />}
        {user.role === 'admin' && showActivityForm && <ActivityFormModal onClose={() => setShowActivityForm(false)} onSubmit={addActivity} />}
        {selectedActivity && <ActivityModal key={`${selectedActivity.id}-${user.role}`} activity={selectedActivity} learnerMode={user.role === 'learner'} onComplete={user.role === 'learner' ? () => completeActivity(selectedActivity.id) : undefined} onClose={() => setSelectedActivity(null)} />}
      </AppShell>
    </ProtectedRoute>
  )
}

export default App
