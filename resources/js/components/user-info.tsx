import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
    variant = 'light',
}: {
    user: User;
    showEmail?: boolean;
    variant?: 'light' | 'dark';
}) {
    const getInitials = useInitials();

    const nameColor  = variant === 'dark' ? '#111827' : '#ffffff';
    const emailColor = variant === 'dark' ? '#6b7280' : 'rgba(255,255,255,0.6)';

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium" style={{ color: nameColor }}>
                    {user.name}
                </span>
                {showEmail && (
                    <span className="truncate text-xs" style={{ color: emailColor }}>
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}