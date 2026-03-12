import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import { useState, useEffect } from 'react';

import {
    BookOpen,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    TrendingUp,
    Users,
    CalendarDays,
    Bell,
    UserPlus,
    BookPlus,
    FileText,
    Sparkles,
    ChevronRight,
    Calendar,
    Clock,
    UserCheck,
    UserCog,
    School,
    Award,
    PieChart,
    BarChart3,
    Activity,
    Globe,
    Database,
    Layers
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const {
        auth,
        totalUsuarios,
        totalEstudiantes,
        totalProfesores,
        totalAdmins,
        totalAulas,
        totalEvaluaciones,
        totalMaterias,
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Administrador — UDO" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

                .dashboard-root { font-family: 'DM Sans', sans-serif; }
                .dashboard-title { font-family: 'Lora', serif; }

                .dashboard-card-enter { opacity: 0; transform: translateY(18px); }
                .dashboard-card-enter.visible {
                    opacity: 1; transform: translateY(0);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }

                .stat-card {
                    transition: all 0.3s ease;
                    border: 1px solid rgba(226, 232, 240, 0.6);
                    backdrop-filter: blur(2px);
                }
                .stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 30px -10px rgba(0,0,0,0.15);
                    border-color: rgba(245, 158, 11, 0.3);
                }

                .header-gradient {
                    background: linear-gradient(135deg, #060f1e 0%, #0b1f3a 50%, #112b50 100%);
                    position: relative; overflow: hidden;
                }
                .header-gradient::before {
                    content: ''; position: absolute;
                    top: -40%; right: -10%;
                    width: 340px; height: 340px;
                    background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
                    pointer-events: none;
                    animation: pulse 8s ease-in-out infinite;
                }
                .header-gradient::after {
                    content: ''; position: absolute;
                    bottom: -30%; left: 30%;
                    width: 240px; height: 240px;
                    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
                    pointer-events: none;
                    animation: pulse 10s ease-in-out infinite reverse;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }

                .badge {
                    transition: all 0.2s ease;
                }
                .badge:hover {
                    transform: scale(1.05);
                }

                .glass-effect {
                    backdrop-filter: blur(8px);
                    background: rgba(255, 255, 255, 0.9);
                }
            `}
            </style>

            <div className="dashboard-root min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">

                    {/* ── HEADER DE BIENVENIDA ── */}
                    <div
                        className={`header-gradient rounded-3xl overflow-hidden mb-8 shadow-2xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <div className="relative z-10 px-8 py-7">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl"></div>
                                        <div
                                            className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                                            style={{ background: 'rgba(245,158,11,0.15)', border: '2px solid rgba(245,158,11,0.3)' }}
                                        >
                                            <GraduationCap size={28} className="text-amber-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-amber-400/80 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                                            PANEL DE ADMINISTRACIÓN
                                        </p>
                                        <h1 className="dashboard-title text-3xl md:text-4xl font-bold text-white leading-tight">
                                            {user?.nombre} {user?.apellido}
                                        </h1>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full border ${rolColor[user?.rol ?? 'A']}`}>
                                                {rolLabel[user?.rol ?? 'A']}
                                            </span>
                                            <span className="text-slate-300 text-sm flex items-center gap-1">
                                                <Database size={14} className="text-amber-400/70" />
                                                Visión general del sistema
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="glass-effect rounded-2xl px-4 py-2.5 flex items-center gap-3">
                                        <CalendarDays size={16} className="text-amber-400" />
                                        <span className="text-sm font-medium text-slate-700">
                                            {new Date().toLocaleDateString('es-VE', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── STATS CARDS PRINCIPALES ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div
                            className={`stat-card bg-white rounded-2xl p-5 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '50ms' }}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <Users size={20} className="text-indigo-600" />
                                </div>
                                <span className="badge bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    Total
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-1">Usuarios</p>
                            <p className="text-2xl font-bold text-slate-800">{totalUsuarios}</p>
                        </div>

                        <div
                            className={`stat-card bg-white rounded-2xl p-5 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '75ms' }}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <GraduationCap size={20} className="text-blue-600" />
                                </div>
                              
                            </div>
                            <p className="text-xs text-slate-500 mb-1">Estudiantes</p>
                            <p className="text-2xl font-bold text-slate-800">{totalEstudiantes}</p>
                        </div>

                        <div
                            className={`stat-card bg-white rounded-2xl p-5 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <UserCheck size={20} className="text-emerald-600" />
                                </div>
                              
                            </div>
                            <p className="text-xs text-slate-500 mb-1">Profesores</p>
                            <p className="text-2xl font-bold text-slate-800">{totalProfesores}</p>
                        </div>

                        <div
                            className={`stat-card bg-white rounded-2xl p-5 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '125ms' }}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                    <UserCog size={20} className="text-amber-600" />
                                </div>
                                <span className="badge bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    Admins
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-1">Administradores</p>
                            <p className="text-2xl font-bold text-slate-800">{totalAdmins}</p>
                        </div>
                    </div>

                    {/* ── STATS CARDS SECUNDARIAS ── */}
                    

                    {/* ── PANEL DE RESUMEN ── */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Distribución de usuarios */}
                        <div
                            className={`bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '225ms' }}
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <PieChart size={16} className="text-indigo-600" />
                                </div>
                                <h2 className="dashboard-title text-lg font-semibold text-[#0b1f3a]">Distribución de usuarios</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-600">Estudiantes</span>
                                        <span className="font-medium text-slate-800">{totalEstudiantes} ({((totalEstudiantes / totalUsuarios) * 100 || 0).toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full progress-bar"
                                            style={{ width: `${(totalEstudiantes / totalUsuarios) * 100 || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-600">Profesores</span>
                                        <span className="font-medium text-slate-800">{totalProfesores} ({((totalProfesores / totalUsuarios) * 100 || 0).toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full progress-bar"
                                            style={{ width: `${(totalProfesores / totalUsuarios) * 100 || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-600">Administradores</span>
                                        <span className="font-medium text-slate-800">{totalAdmins} ({((totalAdmins / totalUsuarios) * 100 || 0).toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full progress-bar"
                                            style={{ width: `${(totalAdmins / totalUsuarios) * 100 || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Distribución de contenido */}
                        <div
                            className={`bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '250ms' }}
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Layers size={16} className="text-purple-600" />
                                </div>
                                <h2 className="dashboard-title text-lg font-semibold text-[#0b1f3a]">Contenido académico</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold text-cyan-600">{totalAulas}</p>
                                    <p className="text-xs text-slate-500 mt-1">Aulas</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold text-purple-600">{totalEvaluaciones}</p>
                                    <p className="text-xs text-slate-500 mt-1">Evaluaciones</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 text-center col-span-2">
                                    <p className="text-3xl font-bold text-orange-600">{totalMaterias}</p>
                                    <p className="text-xs text-slate-500 mt-1">Materias</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RESUMEN DEL SISTEMA ── */}
                    <div
                        className={`mt-6 bg-gradient-to-br from-[#0b1f3a] via-[#0f2744] to-[#1a2f4a] rounded-3xl p-6 text-white shadow-2xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                        style={{ transitionDelay: '275ms' }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Award size={24} className="text-amber-400" />
                                <h3 className="dashboard-title text-lg font-semibold">Estadísticas generales</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                                <div>
                                    <p className="text-slate-300 text-xs">Total registros</p>
                                    <p className="text-xl font-bold">{totalUsuarios + totalAulas + totalMaterias}</p>
                                </div>
                                <div>
                                    <p className="text-slate-300 text-xs">Promedio estudiantes/aula</p>
                                    <p className="text-xl font-bold">{totalAulas > 0 ? (totalEstudiantes / totalAulas).toFixed(1) : 0}</p>
                                </div>
                                <div>
                                    <p className="text-slate-300 text-xs">Evaluaciones por aula</p>
                                    <p className="text-xl font-bold">{totalAulas > 0 ? (totalEvaluaciones / totalAulas).toFixed(1) : 0}</p>
                                </div>
                                <div>
                                    <p className="text-slate-300 text-xs">Relación estudiante/profesor</p>
                                    <p className="text-xl font-bold">{totalProfesores > 0 ? (totalEstudiantes / totalProfesores).toFixed(1) : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}