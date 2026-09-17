import Avatar from "@/components/ui/Avatar";
import { formatRelativeTime } from "@/lib/format";

export default function ActivityFeed({ items }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li key={item.id} className="activity-item">
          <Avatar name={item.actor} size={32} />
          <div>
            <p className="activity-text">
              <strong style={{ fontWeight: 600 }}>{item.actor}</strong> {item.action}
            </p>
            <p className="activity-time">{formatRelativeTime(item.at)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
