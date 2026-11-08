import { useState, type FormEvent } from 'react'
import { getUsers } from '../../api/jsonServer'
import { useAuth } from '../../redux/authSlice'
import type { AuthUser } from '../../utils/types'

const demoUsers: Record<string, AuthUser & { password: string }> = {
  'admin@learninghub.org': { id: 'admin-1', name: 'Tebogo Ndlovu', email: 'admin@learninghub.org', role: 'admin', password: 'admin123' },
  'learner@learninghub.org': { id: 'learner-1', name: 'Amara Okafor', email: 'learner@learninghub.org', role: 'learner', learnerId: '1', password: 'learner123' },
}

export default function Login() {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email')).toLowerCase()
    const password = String(form.get('password'))
    let account = demoUsers[email]
    try {
      const users = await getUsers()
      const serverUser = users.find((item) => item.email.toLowerCase() === email) as (AuthUser & { password?: string }) | undefined
      if (serverUser) account = { ...serverUser, password: serverUser.password ?? '' }
    } catch {
      // Demo accounts keep the app usable when JSON Server is not running.
    }
    if (!account || account.password !== password) {
      setError('Incorrect email or password.')
      setLoading(false)
      return
    }
    login(account)
  }

  return <main className="login-page"><div className="login-card"><div className="brand login-brand"><span className="brand-mark">e</span><span>learn<span className="brand-accent">.</span></span></div><p className="eyebrow">WELCOME BACK</p><h1>Sign in to your learning space</h1><p className="subtitle">Access your activities, progress, and insights.</p><form onSubmit={submit}><label>Email address<input name="email" type="email" required placeholder="you@institution.org" /></label><label>Password<input name="password" type="password" required placeholder="Enter your password" /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button full-width" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button></form><div className="demo-credentials"><strong>Demo accounts</strong><span>Admin: admin@learninghub.org / admin123</span><span>Learner: learner@learninghub.org / learner123</span></div></div></main>
}