
export interface NotifBadgeprops {
    notifCounts?: number
  };

export default function NotifBadge({notifCounts} :NotifBadgeprops ) {

  return (
    <span className="rounded-full min-w-5 h-5 bg-red-300 text-white text-sm text-center justify-center items-center">
{notifCounts}
  </span>
  );
}
