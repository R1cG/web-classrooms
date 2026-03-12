import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import {
    BookOpen,
    CalendarRange,
    Clock,
    FileText,
    GraduationCap,
    Sparkles,
    Users,
    ChevronLeft,
    PenLine,
    ClipboardList,
    CheckCircle2,
    AlertCircle,
    LayoutDashboard,
    TrendingUp,
    Award,
    ChevronRight,
    Calendar,
    Bell,
    Star
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { aulasAccess } from '@/routes';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
    const handleDoubleClick = (id: number) => {
        router.get(aulasAccess(id).url);
    };

interface Aula {
    id: number;
    semestre: string;
    materia: {
        nombre: string;
    };
    profesor: {
        nombre: string;
        apellido: string;
    };
    materia_codigo?: string;
    cantidad_estudiantes?: number;
}

interface Evaluacion {
    id: number;
    descripcion: string;
    fecha_limite: string;
    aula: {
        materia: {
            nombre: string;
        };
    };
    entregado?: boolean;
    calificacion?: number;
    turned_in?: boolean;
    late?: boolean;
    entrega?: {
        url: string;
        updated_at: string;
    } | null;
}

interface TimelineItem {
    id: number;
    tipo: 'post' | 'evaluacion';
    contenido: string;
    created_at: string;
    fecha_limite?: string;
    entregado?: boolean;
    calificacion?: number;
    turned_in?: boolean;
    late?: boolean;
    entrega?: {
        url: string;
        updated_at: string;
    } | null;
}

interface Props {
    aulas: Aula[];
    cantidadAulas: number;
    evaluacionesTurnedIn: number;
    evaluacionesNoTurnedIn: number;
    evaluacionesOnTime: Evaluacion[];
    timeline: TimelineItem[];
    progreso?: {
        creditos_cursados: number;
        creditos_totales: number;
        promedio_general: number;
    };
}

export default function Dashboard({
    aulas,
    cantidadAulas,
    evaluacionesTurnedIn,
    evaluacionesNoTurnedIn,
    evaluacionesOnTime,
    timeline,
    progreso,
}: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatDateShort = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.toLocaleDateString('es-ES', { day: '2-digit' }),
            month: date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    const isOverdue = (fechaLimite: string) => new Date(fechaLimite) < new Date();
    
    // Función para truncar texto
    const truncateText = (text: string, maxLength: number = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estudiante Dashboard — UDO" />

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
                    background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%);
                    pointer-events: none;
                    animation: pulse 8s ease-in-out infinite;
                }
                .header-gradient::after {
                    content: ''; position: absolute;
                    bottom: -30%; left: 30%;
                    width: 240px; height: 240px;
                    background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%);
                    pointer-events: none;
                    animation: pulse 10s ease-in-out infinite reverse;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }

                .aula-card {
                    transition: all 0.3s ease;
                    border-left: 4px solid #f59e0b;
                    background: white;
                }
                .aula-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 30px -10px rgba(0,0,0,0.15);
                }

                .evaluacion-card {
                    transition: all 0.3s ease;
                    border-left: 4px solid #3b82f6;
                    background: white;
                }
                .evaluacion-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 25px -8px rgba(0,0,0,0.1);
                }

                .timeline-dot-post {
                    background: #10b981;
                    box-shadow: 0 0 0 4px #d1fae5, 0 0 0 6px #10b98120;
                }
                .timeline-dot-evaluacion {
                    background: #3b82f6;
                    box-shadow: 0 0 0 4px #dbeafe, 0 0 0 6px #3b82f620;
                }
                .timeline-line {
                    background: linear-gradient(to bottom, #e2e8f0, #f1f5f9);
                    width: 2px;
                }

                .item-card {
                    border-left-width: 4px;
                    transition: all 0.3s ease;
                }
                .item-card:hover {
                    transform: translateX(4px);
                    box-shadow: 0 8px 25px -8px rgba(0,0,0,0.15);
                }
                .item-card-post { border-left-color: #10b981; }
                .item-card-evaluacion { border-left-color: #3b82f6; }

                .btn-action {
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .btn-action:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px -8px currentColor;
                }
                .btn-action:active { transform: translateY(0); }
                .btn-action::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    transform: translate(-50%, -50%);
                    transition: width 0.5s, height 0.5s;
                }
                .btn-action:active::after {
                    width: 200px;
                    height: 200px;
                }

                .badge {
                    transition: all 0.2s ease;
                }
                .badge:hover {
                    transform: scale(1.05);
                }

                .progress-bar {
                    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
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
                                            style={{ background: 'rgba(245,158,11,0.2)', border: '2px solid rgba(245,158,11,0.3)' }}
                                        >
                                            <LayoutDashboard size={28} className="text-amber-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                                            PANEL DE ESTUDIANTE
                                        </p>
                                        <h1 className="dashboard-title text-3xl md:text-4xl font-bold text-white leading-tight">
                                            ¡Hola de nuevo!
                                        </h1>
                                        <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                                            <GraduationCap size={14} className="text-amber-400/70" />
                                            Estudiante · {cantidadAulas} aulas activas
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="glass-effect rounded-2xl px-4 py-2.5 flex items-center gap-3">
                                        <Calendar size={16} className="text-amber-400" />
                                        <span className="text-sm font-medium text-slate-700">
                                            {new Date().toLocaleDateString('es-VE', { 
                                                weekday: 'long', 
                                                day: 'numeric', 
                                                month: 'long' 
                                            })}
                                        </span>
                                    </div>
                                    {progreso?.promedio_general && (
                                        <div className="glass-effect rounded-2xl px-4 py-2.5 flex items-center gap-2">
                                            <Star size={16} className="text-amber-500" />
                                            <span className="text-sm font-medium text-slate-700">
                                                Promedio: <span className="text-amber-600 font-bold">{progreso.promedio_general}/20</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── STATS CARDS MEJORADAS ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        {/* Aulas inscritas */}
                        <div
                            className={`stat-card bg-white rounded-2xl p-6 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '50ms' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                                    <BookOpen size={24} className="text-blue-600" />
                                </div>
                                <span className="badge bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Activas
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Aulas inscritas</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-slate-800">{cantidadAulas}</p>
                                <span className="text-xs text-slate-400 mb-1">total</span>
                            </div>
                        </div>

                        {/* Evaluaciones entregadas */}
                        <div
                            className={`stat-card bg-white rounded-2xl p-6 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
                                    <CheckCircle2 size={24} className="text-emerald-600" />
                                </div>
                                <span className="badge bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Completadas
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Evaluaciones entregadas</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-emerald-600">{evaluacionesTurnedIn}</p>
                                <span className="text-xs text-slate-400 mb-1">entregas</span>
                            </div>
                        </div>

                        {/* Evaluaciones pendientes */}
                        <div
                            className={`stat-card bg-white rounded-2xl p-6 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '150ms' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center shadow-sm">
                                    <Clock size={24} className="text-amber-600" />
                                </div>
                                <span className="badge bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Por entregar
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Evaluaciones pendientes</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-amber-600">{evaluacionesNoTurnedIn}</p>
                                <span className="text-xs text-slate-400 mb-1">pendientes</span>
                            </div>
                        </div>
                    </div>

                    {/* ── MIS AULAS ── */}
                    <div
                        className={`bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                    <BookOpen size={18} className="text-amber-600" />
                                </div>
                                <h2 className="dashboard-title text-xl font-semibold text-[#0b1f3a]">Mis Aulas</h2>
                            </div>
                            <span className="badge bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                {cantidadAulas} aula{cantidadAulas !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {aulas.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-4 bg-slate-50/50 rounded-2xl">
                                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                                    <BookOpen size={36} className="text-slate-400" />
                                </div>
                                <p className="text-slate-600 text-base font-medium">No estás inscrito en ninguna aula</p>
                                <p className="text-slate-400 text-sm max-w-sm text-center">
                                    Cuando el administrador te inscriba en un aula, aparecerán aquí todas tus materias.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {aulas.map((aula, index) => (
                                    <div
                                        key={aula.id}
                                        className="aula-card rounded-xl border border-slate-200 p-5 hover:shadow-xl cursor-pointer group"
                                        style={{ transitionDelay: `${250 + index * 50}ms` }}
                                        onClick={() => handleDoubleClick(aula.id)}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <BookOpen size={18} className="text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-800 text-base leading-tight">
                                                    {aula.materia.nombre}
                                                </h3>
                                                <p className="text-xs text-slate-400 font-mono mt-0.5">
                                                    {aula.materia_codigo || 'Código no disponible'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm border-t border-slate-100 pt-3 mt-1">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <GraduationCap size={14} className="text-slate-400" />
                                                <span className="text-xs">
                                                    Prof. {aula.profesor.nombre} {aula.profesor.apellido}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <CalendarRange size={14} className="text-slate-400" />
                                                <span className="text-xs">Semestre: {aula.semestre}</span>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── PRÓXIMAS EVALUACIONES Y TIMELINE ── */}
                    <div className="grid lg:grid-cols-2 gap-6 mt-8">
                        {/* Próximas evaluaciones */}
                        <div
                            className={`bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <ClipboardList size={18} className="text-blue-600" />
                                    </div>
                                    <h2 className="dashboard-title text-xl font-semibold text-[#0b1f3a]">Próximas Evaluaciones</h2>
                                </div>
                                <span className="badge bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                    {evaluacionesOnTime.length} próximas
                                </span>
                            </div>

                            {evaluacionesOnTime.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3 bg-slate-50/50 rounded-2xl">
                                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                                        <ClipboardList size={28} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-500">No hay evaluaciones próximas</p>
                                    <p className="text-xs text-slate-400 text-center max-w-xs">
                                        Cuando se asignen nuevas evaluaciones, aparecerán aquí.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {evaluacionesOnTime.map((ev, index) => {
                                        const overdue = isOverdue(ev.fecha_limite);
                                        const diasRestantes = Math.ceil((new Date(ev.fecha_limite).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                        
                                        return (
                                            <div
                                                key={ev.id}
                                                className="evaluacion-card rounded-xl border border-slate-200 p-4 hover:shadow-lg"
                                                style={{ animationDelay: `${350 + index * 50}ms` }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                                                        <FileText size={18} className="text-blue-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div>
                                                                <p className="font-bold text-slate-800">{truncateText(ev.descripcion, 50)}</p>
                                                                <p className="text-xs text-slate-500 mt-1">{ev.aula.materia.nombre}</p>
                                                            </div>
                                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                                                                diasRestantes <= 2 
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : diasRestantes <= 5
                                                                        ? 'bg-amber-100 text-amber-700'
                                                                        : 'bg-green-100 text-green-700'
                                                            }`}>
                                                                {diasRestantes === 0 ? 'Hoy' : 
                                                                 diasRestantes === 1 ? 'Mañana' : 
                                                                 `${diasRestantes} días`}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-2 text-xs">
                                                            <div className="flex items-center gap-1 text-slate-500">
                                                                <Calendar size={12} />
                                                                <span>{formatDate(ev.fecha_limite)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-slate-500">
                                                                <Clock size={12} />
                                                                <span>{new Date(ev.fecha_limite).toLocaleTimeString().slice(0,5)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        
                        </div>

                        {/* Timeline de actividad */}
                        <div
                            className={`bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '350ms' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Bell size={18} className="text-purple-600" />
                                    </div>
                                    <h2 className="dashboard-title text-xl font-semibold text-[#0b1f3a]">Actividad Reciente</h2>
                                </div>
                                {timeline.length > 0 && (
                                    <Sparkles size={18} className="text-amber-400 animate-pulse" />
                                )}
                            </div>

                            {timeline.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3 bg-slate-50/50 rounded-2xl">
                                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                                        <Bell size={28} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-500">No hay actividad reciente</p>
                                    <p className="text-xs text-slate-400 text-center max-w-xs">
                                        La actividad de tus aulas aparecerá aquí.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {timeline.slice(0, 5).map((item) => {
                                        const d = formatDateShort(item.created_at);
                                        return (
                                            <div
                                                key={`${item.tipo}-${item.id}`}
                                                className="item-card flex items-start gap-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                                            >
                                                <div className="relative">
                                                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                                                        item.tipo === 'post' ? 'bg-emerald-500' : 'bg-blue-500'
                                                    }`}>
                                                        <div className={`absolute inset-0 rounded-full animate-ping opacity-40 ${
                                                            item.tipo === 'post' ? 'bg-emerald-500' : 'bg-blue-500'
                                                        }`}></div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                            item.tipo === 'post'
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                            {item.tipo === 'post' ? 'Nuevo post' : 'Evaluación'}
                                                        </span>
                                                        <span className="text-xs text-slate-400">{d.time}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700 font-medium">{truncateText(item.contenido, 60)}</p>
                                                    <p className="text-xs text-slate-400 mt-1">{d.day} {d.month}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            
                            {timeline.length > 5 && (
                                <div className="mt-5 text-center">
                                    <button className="text-xs text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1 transition-all hover:gap-2">
                                        Ver más actividad <ChevronRight size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── PROGRESO ACADÉMICO ── */}
                    {progreso && (
                        <div
                            className={`mt-8 bg-gradient-to-br from-[#0b1f3a] via-[#0f2744] to-[#1a2f4a] rounded-3xl p-8 text-white shadow-2xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <TrendingUp size={28} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="dashboard-title text-xl font-semibold">Progreso Académico</h3>
                                        <p className="text-slate-300 text-sm mt-1">Semestre actual</p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-300">Créditos cursados</span>
                                            <span className="text-white font-medium">
                                                {progreso.creditos_cursados}/{progreso.creditos_totales}
                                            </span>
                                        </div>
                                        <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                            <div
                                                className="progress-bar h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full relative"
                                                style={{ width: `${(progreso.creditos_cursados / progreso.creditos_totales) * 100}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-300">Evaluaciones completadas</span>
                                            <span className="text-white font-medium">
                                                {evaluacionesTurnedIn}/{evaluacionesTurnedIn + evaluacionesNoTurnedIn}
                                            </span>
                                        </div>
                                        <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                            <div
                                                className="progress-bar h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full relative"
                                                style={{
                                                    width: `${((evaluacionesTurnedIn) / (evaluacionesTurnedIn + evaluacionesNoTurnedIn || 1)) * 100}%`
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}