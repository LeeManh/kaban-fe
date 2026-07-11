import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

export function UserAvatar({
  user,
  className,
  fallbackClassName,
}: {
  user?: { name?: string | null; email: string; avatar?: string | null } | null;
  className?: string;
  fallbackClassName?: string;
}) {
  return (
    <Avatar className={className}>
      {user?.avatar && <AvatarImage src={user.avatar} alt="" />}
      <AvatarFallback className={cn("bg-violet-500 font-bold text-white", fallbackClassName)}>
        {user ? getInitials(user) : ""}
      </AvatarFallback>
    </Avatar>
  );
}
