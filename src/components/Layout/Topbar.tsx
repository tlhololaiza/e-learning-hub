import type { NavItem } from './Sidebar'

type TopbarProps = {
  activeNav: NavItem
  serviceMessage: string
  user: { name: string; role: 'admin' | 'learner' }
  onLogout: () => void
}

export function Topbar({ activeNav, serviceMessage, user, onLogout }: TopbarProps) {
  const initials = user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return (
    <header className="topbar">
      <div className="mobile-brand"><span className="brand-mark">e</span> elearn<span className="brand-accent">.</span></div>
      <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeNav}</strong></div>
      <div className="top-actions"><span className="sync-status"><i /> {serviceMessage}</span><span className="role-badge">{user.role === 'admin' ? 'Administrator' : 'Learner'}</span><button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button><button className="avatar avatar-sand top-avatar" title={user.name}>{initials}</button><button className="top-logout" onClick={onLogout}>Log out</button></div>
    </header>
  )
}
