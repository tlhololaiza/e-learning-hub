import type { Activity } from '../../utils/types'

type QuickActionsProps = {
  onAddLearner: () => void
  onActivityClick: (activity: Activity) => void
  activity: Activity
}

export function QuickActions({ onAddLearner, onActivityClick, activity }: QuickActionsProps) {
  return (
    <div className="panel quick-panel">
      <div className="panel-heading"><div><p className="eyebrow">SHORTCUTS</p><h2>Quick actions</h2></div></div>
      <button className="quick-action" onClick={onAddLearner}><span className="quick-icon blue-bg">♙</span><span><strong>Add a new learner</strong><small>Invite someone to your space</small></span><b>→</b></button>
      <button className="quick-action" onClick={() => onActivityClick(activity)}><span className="quick-icon peach-bg">▤</span><span><strong>Create an activity</strong><small>Build something engaging</small></span><b>→</b></button>
      <button className="quick-action"><span className="quick-icon mint-bg">◒</span><span><strong>View reports</strong><small>Understand your impact</small></span><b>→</b></button>
    </div>
  )
}
