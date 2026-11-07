import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from '../../redux/authSlice'
import type { AuthUser } from '../../utils/types'

const SESSION_KEY = 'elearn-session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) as AuthUser : null
  })

  const value = useMemo(() => ({
    user,
    login: (nextUser: AuthUser) => {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
      setUser(nextUser)
    },
    logout: () => {
      localStorage.removeItem(SESSION_KEY)
      setUser(null)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
