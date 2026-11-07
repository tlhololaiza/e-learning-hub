import type { NavItem } from './Sidebar'

type TopbarProps = {
  activeNav: NavItem
  serviceMessage: string
  role: 'admin' | 'learner'
  onLogout: () => void
}

export function Topbar({ activeNav, serviceMessage, role, onLogout }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="mobile-brand"><span className="brand-mark">e</span> elearn<span className="brand-accent">.</span></div>
      <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeNav}</strong></div>
      <div className="top-actions"><span className="sync-status"><i /> {serviceMessage}</span><span className="role-badge">{role === 'admin' ? 'Administrator' : 'Learner'}</span><button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button><button className="avatar avatar-sand top-avatar">{role === 'admin' ? 'TN' : 'AO'}</button><button className="top-logout" onClick={onLogout}>Log out</button></div>
    </header>
  )
}
