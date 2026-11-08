import type { Activity, AuthUser, Completion, DashboardData, Learner } from '../utils/types'

const API_URL = 'http://localhost:3001'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}/${path}`, options)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function getDashboardData(): Promise<DashboardData> {
  const [learnersResponse, activitiesResponse] = await Promise.all([
    fetch(`${API_URL}/learners`),
    fetch(`${API_URL}/activities`),
  ])

  if (!learnersResponse.ok || !activitiesResponse.ok) {
    throw new Error('The local data service returned an error.')
  }

  return {
    learners: await learnersResponse.json(),
    activities: await activitiesResponse.json(),
  }
}

export async function getUsers(): Promise<AuthUser[]> {
  return request<AuthUser[]>('users')
}

export async function createUser(user: AuthUser): Promise<AuthUser> {
  return request<AuthUser>('users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) })
}

export async function updateUser(user: AuthUser): Promise<AuthUser> {
  return request<AuthUser>(`users/${user.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) })
}

export async function removeUser(id: string): Promise<void> {
  await request<unknown>(`users/${id}`, { method: 'DELETE' })
}

export async function removeLearnerAccount(learnerId: string): Promise<void> {
  const users = await getUsers()
  const learnerAccounts = users.filter((user) => user.role === 'learner' && user.learnerId === learnerId)
  await Promise.all(learnerAccounts.map((user) => removeUser(user.id)))
}

export async function createLearner(learner: Learner): Promise<Learner> {
  return request<Learner>('learners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(learner) })
}

export async function updateLearner(learner: Learner): Promise<Learner> {
  return request<Learner>(`learners/${learner.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(learner) })
}

export async function removeLearner(id: string): Promise<void> {
  await request<unknown>(`learners/${id}`, { method: 'DELETE' })
}

export async function createActivity(activity: Activity): Promise<Activity> {
  return request<Activity>('activities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activity) })
}

export async function removeActivity(id: string): Promise<void> {
  await request<unknown>(`activities/${id}`, { method: 'DELETE' })
}

export async function saveCompletion(completion: Completion): Promise<Completion> {
  return request<Completion>('completions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(completion) })
}