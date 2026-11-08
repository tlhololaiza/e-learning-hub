type StatCardProps = {
  label: string
  value: string
  change?: string
  tone: string
  icon: string
}

export function StatCard({ label, value, change, tone, icon }: StatCardProps) {
  return (
    <div className={`stat-card stat-${tone}`}>
      <div className="stat-top"><span className="stat-icon">{icon}</span><span className="stat-label">{label}</span></div>
      <strong className="stat-value">{value}</strong>
      {change && <div><b className="positive">{change}</b><span className="stat-note">vs last month</span></div>}
    </div>
  )
}
