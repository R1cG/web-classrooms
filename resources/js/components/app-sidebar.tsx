import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, BookA, Users, LayoutDashboard } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';


const rolePermissions = {
    A: ['Dashboard', 'Aulas', 'Usuarios', 'Materias'], 
    P: ['Dashboard', 'Aulas'],
    E: ['Dashboard', 'Aulas'], 
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Aulas',
        href: '/aulas',
        icon: LayoutDashboard,
    },
    {
        title: 'Usuarios',
        href: '/usuarios',
        icon: Users,
    },
    {
        title: 'Materias',
        href: '/materias',
        icon: BookA,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.rol; // 'A', 'P' o 'E'

    // Filtrar items según el rol del usuario
    const filteredNavItems = mainNavItems.filter(item => {
        if (!userRole) return false;
        
        // Obtener los títulos permitidos para este rol
        const allowedTitles = rolePermissions[userRole as keyof typeof rolePermissions] || [];
        return allowedTitles.includes(item.title);
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}