import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { entregaCreate } from '@/routes';
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
    AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Item {
    id: number;
    tipo: 'post' | 'evaluacion';
    contenido?: string;
    fecha_limite?: string;
    created_at: string;
    entregado?: boolean; 
    calificacion?: number; 
}

interface Props {
    aula: {
        id: number;
        semestre: string;
        materia_nombre: string;
        materia_codigo: string;
        profesor?: {
            nombre: string;
            apellido: string;
        };
        cantidad_estudiantes?: number;
    };
    timeline: Item[];
}

export default function AulaAccess({ aula, timeline }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    const isOverdue = (fechaLimite: string) => {
        return new Date(fechaLimite) < new Date();
    };

    return (
        <AppLayout>
            <Head title={`${aula.materia_nombre} — UDO`} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

                .aula-root { font-family: 'DM Sans', sans-serif; }
                .aula-title { font-family: 'Lora', serif; }

                .aula-card-enter {
                    opacity: 0;
                    transform: translateY(18px);
                }
                .aula-card-enter.visible {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }

                .header-gradient {
                    background: linear-gradient(135deg, #060f1e 0%, #0b1f3a 50%, #112b50 100%);
                    position: relative;
                    overflow: hidden;
                }
                .header-gradient::before {
                    content: '';
                    position: absolute;
                    top: -40%;
                    right: -10%;
                    width: 340px;
                    height: 340px;
                    background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                .header-gradient::after {
                    content: '';
                    position: absolute;
                    bottom: -30%;
                    left: 30%;
                    width: 240px;
                    height: 240px;
                    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }

                .timeline-dot-post {
                    background: #10b981;
                    box-shadow: 0 0 0 3px #d1fae5, 0 0 0 5px #10b98130;
                }
                .timeline-dot-evaluacion {
                    background: #3b82f6;
                    box-shadow: 0 0 0 3px #dbeafe, 0 0 0 5px #3b82f630;
                }
                .timeline-line {
                    background: linear-gradient(to bottom, #e2e8f0, #f1f5f9);
                }

                .item-card {
                    border-left-width: 3px;
                    transition: box-shadow 0.2s ease, transform 0.2s ease;
                }
                .item-card:hover {
                    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                    transform: translateY(-1px);
                }
                .item-card-post { border-left-color: #10b981; }
                .item-card-evaluacion { border-left-color: #3b82f6; }

                .btn-action {
                    transition: all 0.15s ease;
                }
                .btn-action:hover { transform: translateY(-1px); }
                .btn-action:active { transform: translateY(0); }

                .back-link { transition: all 0.15s ease; }
                .back-link:hover { gap: 6px; }

                .entrega-badge {
                    transition: all 0.2s ease;
                }
                .entrega-badge:hover {
                    filter: brightness(0.95);
                }
            `}</style>

            <div className="aula-root min-h-screen bg-slate-50 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">

                    {/* Volver */}
                    <a
                        href="/aulas"
                        className="back-link inline-flex items-center gap-1.5 mb-5 text-xs font-medium text-slate-500 hover:text-[#0b1f3a] transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Volver a Mis Aulas
                    </a>

                    {/* ── HEADER ── */}
                    <div
                        className={`header-gradient rounded-2xl overflow-hidden mb-8 shadow-xl aula-card-enter ${mounted ? 'visible' : ''}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <div className="relative z-10 px-7 pt-7 pb-5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}
                                    >
                                        <BookOpen size={24} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-amber-400/80 text-[10px] font-semibold tracking-[0.18em] uppercase mb-1">
                                            {aula.materia_codigo}
                                        </p>
                                        <h1 className="aula-title text-2xl md:text-3xl font-bold text-white leading-tight">
                                            {aula.materia_nombre}
                                        </h1>
                                    </div>
                                </div>
                                <span
                                    className="flex-shrink-0 text-xs px-3 py-1 rounded-full font-medium"
                                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)' }}
                                >
                                    <CalendarRange size={10} className="inline mr-1 mb-0.5" />
                                    {aula.semestre}
                                </span>
                            </div>

                            <div className="flex items-center gap-5 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                {aula.profesor && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                            <GraduationCap size={12} className="text-slate-300" />
                                        </div>
                                        <span className="text-xs text-slate-300">
                                            Prof. {aula.profesor.nombre} {aula.profesor.apellido}
                                        </span>
                                    </div>
                                )}
                                {aula.cantidad_estudiantes !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                            <Users size={12} className="text-slate-300" />
                                        </div>
                                        <span className="text-xs text-slate-300">
                                            {aula.cantidad_estudiantes} estudiantes
                                        </span>
                                    </div>
                                )}
                                {timeline.length > 0 && (
                                    <div className="flex items-center gap-2 ml-auto">
                                        <Sparkles size={11} className="text-amber-400/60" />
                                        <span className="text-xs text-slate-400">{timeline.length} elemento{timeline.length !== 1 ? 's' : ''}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── TIMELINE ── */}
                    {timeline.length === 0 ? (
                        <div
                            className={`bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center py-24 gap-4 aula-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <FileText size={28} className="text-slate-300" />
                            </div>
                            <div className="text-center">
                                <p className="aula-title text-slate-700 text-xl font-semibold mb-1">Sin contenido aún</p>
                                <p className="text-slate-400 text-sm max-w-xs">El profesor aún no ha publicado nada en esta aula.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div
                                className="timeline-line absolute left-[31px] top-4 bottom-4 w-0.5 z-0"
                                style={{ display: timeline.length > 1 ? 'block' : 'none' }}
                            />
                            <div className="space-y-4">
                                {timeline.map((item, index) => {
                                    const d = formatDateShort(item.created_at);
                                    const overdue = item.tipo === 'evaluacion' && item.fecha_limite && isOverdue(item.fecha_limite);
                                    
                                    return (
                                        <div
                                            key={`${item.tipo}-${item.id}`}
                                            className={`aula-card-enter ${mounted ? 'visible' : ''} flex items-start gap-4`}
                                            style={{ transitionDelay: `${100 + index * 60}ms` }}
                                        >
                                            {/* Date + dot */}
                                            <div className="flex flex-col items-center flex-shrink-0 z-10 pt-3">
                                                <div className="text-center mb-2 w-14">
                                                    <p className="text-[11px] font-bold text-slate-700 leading-none">{d.day}</p>
                                                    <p className="text-[9px] font-semibold tracking-wider text-slate-400 mt-0.5">{d.month}</p>
                                                </div>
                                                <div className={`w-3 h-3 rounded-full ${item.tipo === 'post' ? 'timeline-dot-post' : 'timeline-dot-evaluacion'}`} />
                                            </div>

                                            {/* Card */}
                                            <div className={`flex-1 bg-white rounded-xl border border-slate-200 shadow-sm item-card ${item.tipo === 'post' ? 'item-card-post' : 'item-card-evaluacion'} overflow-hidden`}>
                                                <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full
                                                            ${item.tipo === 'post'
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                            }`}>
                                                            {item.tipo === 'post' ? <PenLine size={10} /> : <ClipboardList size={10} />}
                                                            {item.tipo === 'post' ? 'Post' : 'Evaluación'}
                                                        </span>
                                                        <span className="text-[11px] text-slate-400">{d.time}</span>
                                                    </div>

                                                    {/* Estado de entrega (solo para evaluaciones) */}
                                                    {item.tipo === 'evaluacion' && item.entregado !== undefined && (
                                                        <div className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-full
                                                            ${item.entregado 
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                                                : overdue
                                                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                            }`}>
                                                            {item.entregado ? (
                                                                <>
                                                                    <CheckCircle2 size={10} />
                                                                    <span>Entregado</span>
                                                                </>
                                                            ) : overdue ? (
                                                                <>
                                                                    <AlertCircle size={10} />
                                                                    <span>Vencido</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Clock size={10} />
                                                                    <span>Pendiente</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="px-5 py-4">
                                                    <p className={`leading-relaxed ${item.tipo === 'evaluacion' ? 'font-medium text-slate-800' : 'text-slate-700'} text-sm`}>
                                                        {item.contenido}
                                                    </p>
                                                    
                                                    {/* Detalles de evaluación */}
                                                    {item.tipo === 'evaluacion' && (
                                                        <>
                                                            {item.fecha_limite && (
                                                                <div className={`mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg
                                                                    ${overdue 
                                                                        ? 'bg-red-50 border-red-200 text-red-700'
                                                                        : 'bg-amber-50 border-amber-200 text-amber-700'
                                                                    }`}
                                                                    style={{ border: '1px solid' }}
                                                                >
                                                                    <Clock size={11} className={overdue ? 'text-red-500' : 'text-amber-500'} />
                                                                    <span>
                                                                        {overdue ? 'Vencido: ' : 'Entrega: '}
                                                                        <strong>{formatDate(item.fecha_limite)}</strong>
                                                                    </span>
                                                                </div>
                                                            )}
                                                            
                                                            {item.calificacion !== undefined && (
                                                                <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700">
                                                                    <GraduationCap size={11} className="text-purple-500" />
                                                                    <span>Calificación: <strong>{item.calificacion}</strong></span>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}

                                                    {/* Botón de entrega (solo evaluaciones no entregadas y no vencidas) */}
                                                    {item.tipo === 'evaluacion' && !item.entregado && !overdue && (
                                                        <div className="mt-4 flex justify-end">
                                                            <button
                                                                onClick={() => router.get(entregaCreate(item.id))}
                                                                className="btn-action px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
                                                            >
                                                                <ClipboardList size={13} />
                                                                Realizar Entrega
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Botón de ver entrega (si ya entregó) */}
                                                    {item.tipo === 'evaluacion' && item.entregado && (
                                                        <div className="mt-4 flex justify-end">
                                                            <button
                                                                onClick={() => router.get(entregaCreate(item.id))}
                                                                className="btn-action px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
                                                            >
                                                                <CheckCircle2 size={13} />
                                                                Ver mi Entrega
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {timeline.length > 0 && (
                        <div
                            className={`mt-8 text-center aula-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: `${100 + timeline.length * 60}ms` }}
                        >
                            <p className="text-xs text-slate-400">
                                {timeline.length} elemento{timeline.length !== 1 ? 's' : ''} en el aula · {aula.semestre}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}