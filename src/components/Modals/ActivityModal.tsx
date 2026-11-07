import type { Activity } from '../../utils/types'

export function ActivityModal({ activity, onClose }: { activity: Activity; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal activity-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose}>×</button><div className={`activity-art ${activity.color}`}>{activity.icon}</div><p className="eyebrow">{activity.type.toUpperCase()}</p><h2>{activity.title}</h2><p className="muted">{activity.subject} · Due {activity.due}</p><div className="modal-stat"><strong>{Math.round((activity.completed / activity.assigned) * 100)}%</strong><span>completion rate</span></div><button className="primary-button full-width" onClick={onClose}>View activity</button></div></div>
}
