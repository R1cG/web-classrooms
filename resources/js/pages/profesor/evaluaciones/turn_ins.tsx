import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    ClipboardList,
    Clock,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    ChevronLeft,
    Users,
    CalendarRange,
    Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface TurnIn {
    cedula: string;
    nombre: string;
    apellido: string;
    url: string;
    submitted_at: string;
    on_time: boolean;
}

interface Props {
    evaluacion: {
        id: number;
        descripcion: string;
        fecha_limite: string;
    };
    turn_ins: TurnIn[];
}

export default function TurnIns({ evaluacion, turn_ins }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

    const onTime  = turn_ins.filter((t) => t.on_time).length;
    const late    = turn_ins.filter((t) => !t.on_time).length;
    const isOverdue = new Date(evaluacion.fecha_limite) < new Date();

    return (
        <AppLayout>
            <Head title="Entregas de Evaluación" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

                .ti-root { font-family: 'DM Sans', sans-serif; }
                .ti-title { font-family: 'Lora', serif; }

                .ti-card-enter { opacity: 0; transform: translateY(18px); }
                .ti-card-enter.visible {
                    opacity: 1; transform: translateY(0);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }

                .header-gradient {
                    background: linear-gradient(135deg, #060f1e 0%, #0b1f3a 50%, #112b50 100%);
                    position: relative; overflow: hidden;
                }
                .header-gradient::before {
                    content: ''; position: absolute;
                    top: -40%; right: -10%; width: 340px; height: 340px;
                    background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                .header-gradient::after {
                    content: ''; position: absolute;
                    bottom: -30%; left: 30%; width: 240px; height: 240px;
                    background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }

                .turn-card {
                    transition: box-shadow 0.2s ease, transform 0.2s ease;
                    border-left: 3px solid transparent;
                }
                .turn-card:hover {
                    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                    transform: translateY(-1px);
                }
                .turn-card.on-time  { border-left-color: #10b981; }
                .turn-card.late     { border-left-color: #f59e0b; }

                .back-link { transition: all 0.15s ease; }
                .back-link:hover { gap: 6px; }

                .stat-card {
                    transition: box-shadow 0.2s ease, transform 0.2s ease;
                }
                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.07);
                }
            `}</style>

            <div className="ti-root min-h-screen bg-slate-50 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">

                    {/* Volver */}
                    <button
                        onClick={() => window.history.back()}
                        className="back-link inline-flex items-center gap-1.5 mb-5 text-xs font-medium text-slate-500 hover:text-[#0b1f3a] transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Volver
                    </button>

                    {/* ── HEADER ── */}
                    <div
                        className={`header-gradient rounded-2xl overflow-hidden mb-6 shadow-xl ti-card-enter ${mounted ? 'visible' : ''}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <div className="relative z-10 px-7 pt-7 pb-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}
                                    >
                                        <ClipboardList size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-blue-400/80 text-[10px] font-semibold tracking-[0.18em] uppercase mb-1">
                                            Evaluación #{evaluacion.id}
                                        </p>
                                        <h1 className="ti-title text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2">
                                            {evaluacion.descripcion}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 mt-4 pt-4 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                        <CalendarRange size={12} className="text-slate-300" />
                                    </div>
                                    <span className={`text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-slate-300'}`}>
                                        {isOverdue ? 'Venció: ' : 'Entrega: '}
                                        {formatDate(evaluacion.fecha_limite)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                        <Users size={12} className="text-slate-300" />
                                    </div>
                                    <span className="text-xs text-slate-300">
                                        {turn_ins.length} entrega{turn_ins.length !== 1 ? 's' : ''}
                                    </span>
                                </div>

                                {turn_ins.length > 0 && (
                                    <div className="flex items-center gap-2 ml-auto">
                                        <Sparkles size={11} className="text-blue-400/60" />
                                        <span className="text-xs text-slate-400">
                                            {onTime} a tiempo · {late} tarde{late !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stat bar */}
                        {turn_ins.length > 0 && (
                            <div className="relative z-10 px-7 py-3 flex gap-4" style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/25">
                                        <CheckCircle2 size={10} />
                                        {onTime} a tiempo
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/25">
                                        <Clock size={10} />
                                        {late} tarde{late !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── LISTA ── */}
                    {turn_ins.length === 0 ? (
                        <div
                            className={`bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center py-24 gap-4 ti-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <ClipboardList size={28} className="text-slate-300" />
                            </div>
                            <div className="text-center">
                                <p className="ti-title text-slate-700 text-xl font-semibold mb-1">Sin entregas aún</p>
                                <p className="text-slate-400 text-sm max-w-xs">Ningún estudiante ha entregado esta evaluación todavía.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {turn_ins.map((turn, index) => (
                                <div
                                    key={turn.cedula}
                                    className={`ti-card-enter ${mounted ? 'visible' : ''}`}
                                    style={{ transitionDelay: `${100 + index * 50}ms` }}
                                >
                                    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm turn-card ${turn.on_time ? 'on-time' : 'late'} overflow-hidden`}>

                                        {/* Card header */}
                                        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                {/* Avatar initials */}
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                                                    style={{
                                                        background: turn.on_time ? '#d1fae5' : '#fef3c7',
                                                        color: turn.on_time ? '#065f46' : '#92400e',
                                                    }}
                                                >
                                                    {turn.nombre[0]}{turn.apellido[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 leading-none">
                                                        {turn.nombre} {turn.apellido}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 mt-0.5">C.I. {turn.cedula}</p>
                                                </div>
                                            </div>

                                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full
                                                ${turn.on_time
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                {turn.on_time
                                                    ? <><CheckCircle2 size={10} />A tiempo</>
                                                    : <><Clock size={10} />Tarde</>
                                                }
                                            </span>
                                        </div>

                                        {/* Card body */}
                                        <div className="px-5 py-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Clock size={11} />
                                                <span>
                                                    Entregado el{' '}
                                                    <span className="text-slate-600 font-medium">
                                                        {formatDate(turn.submitted_at)}
                                                    </span>
                                                </span>
                                            </div>

                                            <a
                                                href={turn.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
                                                style={{
                                                    background: '#eff6ff',
                                                    border: '1px solid #bfdbfe',
                                                    color: '#1d4ed8',
                                                }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLElement).style.background = '#dbeafe';
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLElement).style.background = '#eff6ff';
                                                }}
                                            >
                                                <ExternalLink size={11} />
                                                Ver entrega
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {turn_ins.length > 0 && (
                        <div
                            className={`mt-8 text-center ti-card-enter ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: `${100 + turn_ins.length * 50}ms` }}
                        >
                            <p className="text-xs text-slate-400">
                                {turn_ins.length} entrega{turn_ins.length !== 1 ? 's' : ''} · Evaluación #{evaluacion.id}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}