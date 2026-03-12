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
    Star,
    UserCheck,
    UserCog,
    BarChart3,
    PieChart,
    Layers,
    User
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
    cantidad_estudiantes: number;
    materia: {
        nombre: string;
    };
    materia_codigo?: string;
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
    entregas?: number;
    pendientes?: number;
}

interface Props {
    cantidadAulas: number;
    cantidadEvaluaciones: number;
    cantidadEstudiantes: number;
    aulas: Aula[];
    evaluacionesRecientes: Evaluacion[];
    stats?: {
        entregas_pendientes: number;
        entregas_calificadas: number;
        tasa_calificacion: number;
    };
}

export default function Dashboard({
    cantidadAulas,
    cantidadEvaluaciones,
    cantidadEstudiantes,
    aulas,
    evaluacionesRecientes,
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

    // Función para truncar texto
    const truncateText = (text: string, maxLength: number = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Limitar arrays para mostrar
    const aulasMostradas = aulas.slice(0, 3);
    const evaluacionesMostradas = evaluacionesRecientes.slice(0, 3);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profesor Dashboard — UDO" />

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

                .aula-card-nuevo {
                    transition: all 0.3s ease;
                    background: white;
                }
                .aula-card-nuevo:hover {
                    transform: scale(1.02);
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

                .ver-mas-link {
                    transition: all 0.2s ease;
                }
                .ver-mas-link:hover {
                    gap: 0.75rem;
                    color: #f59e0b;
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
                                            PANEL DE PROFESOR
                                        </p>
                                        <h1 className="dashboard-title text-3xl md:text-4xl font-bold text-white leading-tight">
                                            ¡Bienvenido!
                                        </h1>
                                        <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                                            <BookOpen size={14} className="text-amber-400/70" />
                                            {cantidadAulas} aulas activas · {cantidadEstudiantes} estudiantes
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── STATS CARDS ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        {/* Aulas */}
                        <div
                            className={`stat-card bg-white rounded-2xl p-6 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '50ms' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center shadow-sm">
                                    <BookOpen size={24} className="text-amber-600" />
                                </div>
                                <span className="badge bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Activas
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Aulas</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-slate-800">{cantidadAulas}</p>
                                <span className="text-xs text-slate-400 mb-1">total</span>
                            </div>
                        </div>

                        {/* Evaluaciones */}
                        <div
                            className={`stat-card bg-white rounded-2xl p-6 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                                    <ClipboardList size={24} className="text-blue-600" />
                                </div>
                                <span className="badge bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Creadas
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Evaluaciones</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-slate-800">{cantidadEvaluaciones}</p>
                                <span className="text-xs text-slate-400 mb-1">total</span>
                            </div>
                        </div>

           
                        <div
                            className={`stat-card bg-white rounded-2xl p-6 shadow-lg dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '150ms' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm">
                                    <Users size={24} className="text-indigo-600" />
                                </div>
                                <span className="badge bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Únicos
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Estudiantes</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-slate-800">{cantidadEstudiantes}</p>
                                <span className="text-xs text-slate-400 mb-1">inscritos</span>
                            </div>
                        </div>
                    </div>

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
                            <div className="flex items-center gap-3">
                                <span className="badge bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                    Mostrando {Math.min(3, aulas.length)} de {cantidadAulas}
                                </span>
                                {cantidadAulas > 3 && (
                                    <a 
                                        href="/aulas" 
                                        className="text-xs text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1 ver-mas-link transition-all"
                                    >
                                        Ver todas <ChevronRight size={12} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {aulas.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-4 bg-slate-50/50 rounded-2xl">
                                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                                    <BookOpen size={36} className="text-slate-400" />
                                </div>
                                <p className="text-slate-600 text-base font-medium">No tienes aulas asignadas</p>
                                <p className="text-slate-400 text-sm max-w-sm text-center">
                                    Cuando el administrador te asigne aulas, aparecerán aquí.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {aulasMostradas.map((aula, index) => (
                                        <div
                                            key={aula.id}
                                            className="cursor-pointer bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group aula-card-nuevo"
                                            onClick={() => handleDoubleClick(aula.id)}
                                            title="Doble clic para acceder al aula"
                                            style={{ transitionDelay: `${250 + index * 50}ms` }}
                                        >
                                            {/* Header */}
                                            <div className="bg-[#0b1f3a] px-5 py-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2.5">
                                                    <CalendarRange size={16} className="text-[#f59e0b]" />
                                                    <span className="text-white text-sm font-semibold">
                                                        {aula.semestre}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 space-y-4">
                                                {/* Materia */}
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                                                        <BookOpen size={16} className="text-[#f59e0b]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-slate-500">Materia</p>
                                                        <p className="font-semibold text-slate-800 text-base truncate">
                                                            {aula.materia.nombre}
                                                        </p>
                                                        <p className="text-xs text-slate-400 font-mono truncate">
                                                            {aula.materia_codigo || 'Código no disponible'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Estudiantes */}
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                                        <Users size={16} className="text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Estudiantes</p>
                                                        <p className="font-semibold text-slate-800 text-sm">
                                                            {aula.cantidad_estudiantes} estudiante{aula.cantidad_estudiantes !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Indicador de acceso */}
                                                <div className="pt-2 flex justify-end">
                                                    <span className="text-xs text-amber-600 font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Acceder al aula <ChevronRight size={10} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {cantidadAulas > 3 && (
                                    <div className="mt-6 text-center">
                                        <a 
                                            href="/aulas" 
                                            className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium bg-amber-50 hover:bg-amber-100 px-5 py-2.5 rounded-xl transition-all"
                                        >
                                            Ver las {cantidadAulas} aulas <ChevronRight size={14} />
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* ── ÚLTIMAS EVALUACIONES ── */}
                    <div className="grid lg:grid-cols-1 gap-6 mt-8">
                        <div
                            className={`bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xl dashboard-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <ClipboardList size={18} className="text-blue-600" />
                                    </div>
                                    <h2 className="dashboard-title text-xl font-semibold text-[#0b1f3a]">Últimas Evaluaciones</h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="badge bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                                        Mostrando {Math.min(3, evaluacionesRecientes.length)} de {evaluacionesRecientes.length}
                                    </span>
                                    {evaluacionesRecientes.length > 3 && (
                                        <a 
                                            href="/evaluaciones" 
                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 ver-mas-link transition-all"
                                        >
                                            Ver todas <ChevronRight size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {evaluacionesRecientes.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3 bg-slate-50/50 rounded-2xl">
                                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                                        <ClipboardList size={28} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-500">No hay evaluaciones recientes</p>
                                    <p className="text-xs text-slate-400 text-center max-w-xs">
                                        Las evaluaciones que crees aparecerán aquí.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {evaluacionesMostradas.map((ev, index) => {
                                            const diasRestantes = Math.ceil((new Date(ev.fecha_limite).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                            
                                            return (
                                                <div
                                                    key={ev.id}
                                                    className="evaluacion-card rounded-xl border border-slate-200 p-5 hover:shadow-lg"
                                                >
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                                                            <FileText size={18} className="text-blue-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-bold text-slate-800 truncate">{truncateText(ev.descripcion, 40)}</h3>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">{ev.aula.materia.nombre}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 border-t border-slate-100 pt-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                                <Calendar size={12} />
                                                                <span>{formatDate(ev.fecha_limite)}</span>
                                                            </div>
                                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                                                diasRestantes < 0 ? 'bg-red-100 text-red-700' :
                                                                diasRestantes <= 3 ? 'bg-amber-100 text-amber-700' :
                                                                'bg-green-100 text-green-700'
                                                            }`}>
                                                                {diasRestantes < 0 ? 'Vencida' :
                                                                 diasRestantes === 0 ? 'Hoy' :
                                                                 diasRestantes === 1 ? 'Mañana' :
                                                                 `${diasRestantes} días`}
                                                            </span>
                                                        </div>
                                                        
                                                        {ev.entregas !== undefined && ev.pendientes !== undefined && (
                                                            <div className="flex items-center justify-between text-xs">
                                                                <div className="flex items-center gap-2">
                                                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                                                    <span className="text-slate-600">Entregas: {ev.entregas}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock size={12} className="text-amber-500" />
                                                                    <span className="text-slate-600">Pendientes: {ev.pendientes}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}