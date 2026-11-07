type ActivityItemProps = {
  icon: string
  tone: string
  title: string
  detail: string
  time: string
}

export function ActivityItem({ icon, tone, title, detail, time }: ActivityItemProps) {
  return (
    <div className="activity-item">
      <span className={`activity-icon ${tone}`}>{icon}</span>
      <span><strong>{title}</strong><small>{detail}</small></span>
      <time>{time}</time>
    </div>
  )
}
