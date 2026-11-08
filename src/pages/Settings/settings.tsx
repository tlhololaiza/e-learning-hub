import { useState, type FormEvent } from 'react'
import type { AuthUser } from '../../utils/types'

type SettingsProps = {
  user: AuthUser
  onSave: (details: { name: string; email: string; password: string }) => Promise<void>
}

export default function Settings({ user, onSave }: SettingsProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')
    try {
      await onSave({ name, email, password })
      setPassword('')
      setMessage('Your details have been updated.')
    } catch {
      setError('We could not save your details. Please try again.')
    }
  }

  return <div className="page-wrap inner-page"><div className="page-title-row"><div><p className="eyebrow">ACCOUNT</p><h1>Settings</h1><p className="subtitle">Update the details you use to sign in.</p></div></div><form className="panel settings-panel" onSubmit={submit}><label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Email address<input value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())} required type="email" /></label><label>New password<input value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} type="password" placeholder="Leave blank to keep your current password" /></label>{message && <p className="settings-success">{message}</p>}{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Save changes</button></form></div>
}
