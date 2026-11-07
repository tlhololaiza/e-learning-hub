export type NavItem = 'Dashboard' | 'Learners' | 'Activities' | 'Reports' | 'Settings'

type SidebarProps = {
  activeNav: NavItem
  learnerCount: number
  user: { name: string; role: 'admin' | 'learner' }
  onNavigate: (item: NavItem) => void
  onLogout: () => void
}

export function Sidebar({ activeNav, learnerCount, user, onNavigate, onLogout }: SidebarProps) {
  const { name, role } = user
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const items: NavItem[] = role === 'admin' ? ['Dashboard', 'Learners', 'Activities', 'Reports', 'Settings'] : ['Dashboard', 'Settings']
  const icons = { Dashboard: '⌂', Learners: '♙', Activities: '▤', Reports: '◒', Settings: '⚙' }

  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">e</span><span>learn<span className="brand-accent">.</span></span></div>
      <div className="workspace-switcher"><span className="workspace-avatar">LH</span><span><strong>Learning Hub</strong><small>Institution workspace</small></span><span className="chevron">⌄</span></div>
      <p className="nav-label">Workspace</p>
      <nav className="main-nav" aria-label="Main navigation">
        {items.map((item) => (
          <button className={activeNav === item ? 'nav-item active' : 'nav-item'} key={item} onClick={() => onNavigate(item)}>
            <span className={`nav-icon icon-${item.toLowerCase()}`}>{icons[item]}</span>{item}
            {item === 'Learners' && <span className="nav-count">{learnerCount}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><span className="help-icon">?</span><div><strong>Need a hand?</strong><small>Visit our help center</small></div><span className="arrow">→</span></div>
        <div className="profile-row"><span className="avatar avatar-sand">{initials}</span><span><strong>{name}</strong><small>{role === 'admin' ? 'Administrator' : 'Learner'}</small></span></div>
        <button className="logout-button" onClick={onLogout}>↪ <span>Log out</span></button>
      </div>
    </aside>
  )
}
