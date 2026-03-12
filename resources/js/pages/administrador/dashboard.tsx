import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';

import {
    BookOpen,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    TrendingUp,
    Users,
    CalendarDays,
    Bell,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

interface AdminDashboardProps extends SharedData {
    totalUsuarios: number;
    totalEstudiantes: number;
    totalProfesores: number;
    totalAdmins: number;
    totalAulas: number;
    totalEvaluaciones: number;
    totalMaterias: number;
}

export default function Dashboard() {

    const {
        auth,
        totalUsuarios,
        totalEstudiantes,
        totalProfesores,
        totalAdmins,
        totalAulas,
        totalEvaluaciones,
        totalMaterias
    } = usePage<AdminDashboardProps>().props;

    const user = auth.user;

    const rolLabel: Record<string, string> = {
        A: 'Administrador',
        P: 'Profesor',
        E: 'Estudiante',
    };

    const rolColor: Record<string, string> = {
        A: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        P: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        E: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    const statsCards = [
        {
            icon: Users,
            label: 'Usuarios',
            value: totalUsuarios,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
        },
        {
            icon: GraduationCap,
            label: 'Estudiantes',
            value: totalEstudiantes,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
        },
        {
            icon: Users,
            label: 'Profesores',
            value: totalProfesores,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
        },
        {
            icon: Users,
            label: 'Administradores',
            value: totalAdmins,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-100',
        },
        {
            icon: LayoutDashboard,
            label: 'Aulas',
            value: totalAulas,
            color: 'text-cyan-600',
            bg: 'bg-cyan-50',
            border: 'border-cyan-100',
        },
        {
            icon: ClipboardList,
            label: 'Evaluaciones',
            value: totalEvaluaciones,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-100',
        },
        {
            icon: BookOpen,
            label: 'Materias',
            value: totalMaterias,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard — Administración" />

            <div className="flex flex-col gap-6 p-6">

                {/* ── Welcome header ── */}
                <div className="bg-[#0b1f3a] rounded-2xl px-8 py-6 flex items-center justify-between flex-wrap gap-4 relative overflow-hidden">

                    <div className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
                            backgroundSize: '32px 32px'
                        }}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center">
                            <GraduationCap size={24} className="text-yellow-400" />
                        </div>

                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-widest">
                                Panel administrativo
                            </p>

                            <h1 className="text-white text-2xl font-black">
                                {user?.nombre} {user?.apellido}
                            </h1>

                            <span className={`inline-flex text-xs font-semibold px-2 py-1 rounded-full border mt-1 ${rolColor[user?.rol ?? 'A']}`}>
                                {rolLabel[user?.rol ?? 'A']}
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-slate-400 text-sm">
                        <CalendarDays size={14} />
                        {new Date().toLocaleDateString('es-VE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                </div>

                {/* ── Statistics cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {statsCards.map(({ icon: Icon, label, value, color, bg, border }) => (

                        <div
                            key={label}
                            className={`bg-white border ${border} rounded-xl p-5 flex items-center gap-4 shadow-sm`}
                        >
                            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                                <Icon size={22} className={color} />
                            </div>

                            <div>
                                <p className="text-slate-500 text-xs font-medium">
                                    {label}
                                </p>

                                <p className="text-[#0b1f3a] text-2xl font-black">
                                    {value}
                                </p>
                            </div>
                        </div>

                    ))}

                </div>

                {/* ── System overview panels ── */}
                <div className="grid md:grid-cols-3 gap-4">

                    {/* Aulas */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <LayoutDashboard size={16} />
                            <h2 className="font-semibold text-sm">Aulas registradas</h2>
                        </div>

                        <p className="text-4xl font-black text-[#0b1f3a]">
                            {totalAulas}
                        </p>

                        <p className="text-xs text-slate-400 mt-2">
                            Total de aulas activas en el sistema
                        </p>
                    </div>

                    {/* Evaluaciones */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <ClipboardList size={16} />
                            <h2 className="font-semibold text-sm">Evaluaciones</h2>
                        </div>

                        <p className="text-4xl font-black text-[#0b1f3a]">
                            {totalEvaluaciones}
                        </p>

                        <p className="text-xs text-slate-400 mt-2">
                            Evaluaciones creadas en la plataforma
                        </p>
                    </div>

                    {/* Materias */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen size={16} />
                            <h2 className="font-semibold text-sm">Materias</h2>
                        </div>

                        <p className="text-4xl font-black text-[#0b1f3a]">
                            {totalMaterias}
                        </p>

                        <p className="text-xs text-slate-400 mt-2">
                            Materias registradas en el sistema
                        </p>
                    </div>

                </div>

                {/* ── Activity placeholder ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center text-center gap-3 shadow-sm">

                    <Bell size={28} className="text-slate-300" />

                    <p className="text-slate-500 font-medium">
                        Actividad del sistema
                    </p>

                    <p className="text-slate-400 text-sm max-w-sm">
                        Próximamente podrás visualizar aquí los últimos registros
                        de actividad del sistema, usuarios nuevos, evaluaciones creadas
                        y actualizaciones importantes.
                    </p>

                </div>

            </div>
        </AppLayout>
    );
}