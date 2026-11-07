import type { ReactNode } from 'react'
import { Sidebar, type NavItem } from './Sidebar'
import { Topbar } from './Topbar'

type AppShellProps = {
  activeNav: NavItem
  learnerCount: number
  serviceMessage: string
  role: 'admin' | 'learner'
  onNavigate: (item: NavItem) => void
  onLogout: () => void
  children: ReactNode
}

export function AppShell({ activeNav, learnerCount, serviceMessage, role, onNavigate, onLogout, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} learnerCount={learnerCount} role={role} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="main-content">
        <Topbar activeNav={activeNav} serviceMessage={serviceMessage} role={role} onLogout={onLogout} />
        {children}
      </main>
    </div>
  )
}
