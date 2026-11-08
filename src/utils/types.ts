export type UserRole = 'admin' | 'learner'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: UserRole
  learnerId?: string
  password?: string
}

export type Learner = {
  id: string
  name: string
  email: string
  cohort: string
  progress: number
  status: 'Active' | 'At risk' | 'Completed'
  initials: string
  color: string
}

export type Activity = {
  id: string
  title: string
  type: 'Simulation' | 'Quiz' | 'Assignment'
  subject: string
  assigned: number
  completed: number
  due: string
  color: string
  icon: string
}

export type DashboardData = {
  learners: Learner[]
  activities: Activity[]
  completions: Completion[]
}

export type Completion = {
  id: string
  learnerId: string
  activityId: string
  completedAt: string
}