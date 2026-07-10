import { formatDistanceToNow } from "date-fns";
import {
  ArrowRightLeft,
  Clock,
  MessageSquare,
  Paperclip,
  UserMinus,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";

import type { Notification, NotificationType } from "@/lib/api/notifications";
import { cn } from "@/lib/utils";

const NOTIFICATION_TYPE_META: Record<
  NotificationType,
  { icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  CARD_ASSIGNED: { icon: UserRoundCheck, className: "bg-violet-100 text-violet-600" },
  DUE_REMINDER: { icon: Clock, className: "bg-amber-100 text-amber-600" },
  COMMENT_MENTION: { icon: MessageSquare, className: "bg-blue-100 text-blue-600" },
  BOARD_INVITATION: { icon: UserPlus, className: "bg-emerald-100 text-emerald-600" },
  CARD_REMOVED: { icon: UserMinus, className: "bg-slate-200 text-slate-600" },
  ATTACHMENT_ADDED: { icon: Paperclip, className: "bg-orange-100 text-orange-600" },
  CARD_MOVED: { icon: ArrowRightLeft, className: "bg-cyan-100 text-cyan-600" },
};

function getNotificationHref(notification: Notification): string {
  if (!notification.link) return "#";
  if (notification.type === "BOARD_INVITATION" && notification.link.startsWith("/boards/")) {
    return `${notification.link}?share=requests`;
  }
  return notification.link;
}

export function NotificationRow({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) {
  const meta = NOTIFICATION_TYPE_META[notification.type];
  const Icon = meta.icon;

  return (
    <Link
      href={getNotificationHref(notification)}
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-md px-2.5 py-2.5 hover:bg-slate-50",
        !notification.isRead && "bg-blue-50/60",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          meta.className,
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] leading-snug text-slate-800">
          {notification.message}
        </span>
        <span className="mt-0.5 block text-xs text-slate-500">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </span>
      </span>
      {!notification.isRead && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
    </Link>
  );
}
