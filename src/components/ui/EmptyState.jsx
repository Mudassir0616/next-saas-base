import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  message = "There is no data to show right now.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={22} />
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}
