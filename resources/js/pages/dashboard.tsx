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

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
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

    // Cards según el rol
    const statsCards = [
        {
            icon: LayoutDashboard,
            label: 'Aulas activas',
            value: '—',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
        },
        {
            icon: ClipboardList,
            label: 'Evaluaciones pendientes',
            value: '—',
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-100',
        },
        {
            icon: BookOpen,
            label: 'Materiales disponibles',
            value: '—',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard — UDO Aulas Virtuales" />

            <div className="flex flex-col gap-6 p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>

                {/* ── Bienvenida ── */}
                <div className="bg-[#0b1f3a] rounded-2xl px-8 py-6 flex items-center justify-between flex-wrap gap-4 relative overflow-hidden">
                    {/* grid bg */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute right-0 top-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center flex-shrink-0">
                            <GraduationCap size={24} className="text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">Bienvenido de vuelta</p>
                            <h1 className="text-white text-2xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {user?.nombre} {user?.apellido}
                            </h1>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border mt-1 ${rolColor[user?.rol ?? 'E']}`}>
                                {rolLabel[user?.rol ?? 'E'] ?? 'Usuario'}
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-slate-400 text-sm">
                        <CalendarDays size={14} />
                        {new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                {/* ── Stats cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {statsCards.map(({ icon: Icon, label, value, color, bg, border }) => (
                        <div key={label} className={`bg-white border ${border} rounded-xl p-5 flex items-center gap-4 shadow-sm`}>
                            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <Icon size={22} className={color} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-medium">{label}</p>
                                <p className="text-[#0b1f3a] text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Main grid ── */}
                <div className="grid md:grid-cols-3 gap-4">

                    {/* Mis aulas — ocupa 2 cols */}
                    <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <LayoutDashboard size={16} className="text-[#0b1f3a]" />
                                <h2 className="text-[#0b1f3a] font-bold text-sm">Mis aulas</h2>
                            </div>
                            <span className="text-xs text-slate-400">Periodo actual</span>
                        </div>
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
                                <LayoutDashboard size={24} className="text-slate-300" />
                            </div>
                            <p className="text-slate-500 text-sm font-medium">No tienes aulas asignadas aún</p>
                            <p className="text-slate-400 text-xs max-w-xs">Cuando el administrador te inscriba en un aula, aparecerá aquí.</p>
                        </div>
                    </div>

                    {/* Panel lateral */}
                    <div className="flex flex-col gap-4">

                        {/* Evaluaciones próximas */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
                            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
                                <ClipboardList size={15} className="text-[#0b1f3a]" />
                                <h2 className="text-[#0b1f3a] font-bold text-sm">Próximas evaluaciones</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center px-4">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                                    <ClipboardList size={18} className="text-slate-300" />
                                </div>
                                <p className="text-slate-400 text-xs">Sin evaluaciones pendientes</p>
                            </div>
                        </div>

                        {/* Actividad reciente */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
                            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
                                <Bell size={15} className="text-[#0b1f3a]" />
                                <h2 className="text-[#0b1f3a] font-bold text-sm">Actividad reciente</h2>
                            </div>
                            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center px-4">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                                    <Bell size={18} className="text-slate-300" />
                                </div>
                                <p className="text-slate-400 text-xs">Sin actividad reciente</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── Progreso pensum ── */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-[#0b1f3a]" />
                            <h2 className="text-[#0b1f3a] font-bold text-sm">Progreso de pensum</h2>
                        </div>
                        <span className="text-xs text-slate-400">Vista general</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center px-6">
                        <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
                            <TrendingUp size={24} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 text-sm font-medium">Gráfico de pensum disponible próximamente</p>
                        <p className="text-slate-400 text-xs max-w-sm">Aquí podrás visualizar tu progreso académico de forma gráfica a medida que completes materias.</p>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}