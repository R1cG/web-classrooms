import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PostCreate from '@/pages/profesor/posts/create';
import PostEdit from '@/pages/profesor/posts/edit';
import {
    BookOpen,
    CalendarRange,
    Clock,
    Edit3,
    FileText,
    GraduationCap,
    Sparkles,
    Trash2,
    Users,
    ChevronLeft,
    PenLine,
    ClipboardList
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { postsDestroy, evaluacionesCreate, evaluacionesEdit, evaluacionesDestroy } from '@/routes';

interface Item {
    id: number;
    tipo: 'post' | 'evaluacion';
    contenido?: string;
    fecha_limite?: string;
    created_at: string;
    aula_id?: number;
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
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    // Modal: crear post
    const [showPostCreate, setShowPostCreate] = useState(false);

    // Modal: editar post — guarda el post que se está editando, o null si cerrado
    const [editingPost, setEditingPost] = useState<{ id: number; contenido: string; aula_id: number } | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const handleDelete = async (item: Item) => {
        if (!confirm('¿Estás seguro que deseas eliminar esto?')) return;
        if (!confirm('Esta acción no se puede deshacer. Confirmar nuevamente.')) return;
        setLoadingDelete(item.id);
        try {
            if (item.tipo === 'post') {
                await router.delete(postsDestroy(item.id));
            } else {
                await router.delete(evaluacionesDestroy(item.id));
            }
        } finally {
            setLoadingDelete(null);
        }
    };

    const handleEditClick = (item: Item) => {
        if (item.tipo === 'post') {
            // Posts: modal flotante
            setEditingPost({
                id: item.id,
                contenido: item.contenido ?? '',
                aula_id: item.aula_id ?? aula.id,
            });
        } else {
            // Evaluaciones: navega a página completa
            router.get(evaluacionesEdit(item.id));
        }
    };

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
            `}</style>

            <div className="aula-root min-h-screen bg-slate-50 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">

                    {/* Volver */}
                    <a
                        href="/mis-aulas"
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

                        {/* Action bar */}
                        <div className="relative z-10 px-7 py-4 flex gap-3" style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button
                                onClick={() => router.get(evaluacionesCreate(aula.id))}
                                className="btn-action px-4 py-2 text-white text-xs font-semibold rounded-xl flex items-center gap-2"
                                style={{ background: 'rgba(59,130,246,0.8)', border: '1px solid rgba(59,130,246,0.5)' }}
                            >
                                <ClipboardList size={13} />
                                Nueva Evaluación
                            </button>
                            <button
                                onClick={() => setShowPostCreate(true)}
                                className="btn-action px-4 py-2 text-white text-xs font-semibold rounded-xl flex items-center gap-2"
                                style={{ background: 'rgba(16,185,129,0.75)', border: '1px solid rgba(16,185,129,0.45)' }}
                            >
                                <PenLine size={13} />
                                Nuevo Post
                            </button>
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
                                <p className="text-slate-400 text-sm max-w-xs">Crea tu primer post o evaluación para que aparezca en el timeline.</p>
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => router.get(evaluacionesCreate(aula.id))}
                                    className="btn-action px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                                >
                                    Crear Evaluación
                                </button>
                                <button
                                    onClick={() => setShowPostCreate(true)}
                                    className="btn-action px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors"
                                >
                                    Crear Post
                                </button>
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

                                                    <div className="flex items-center gap-1.5">
                                                        <button
                                                            onClick={() => handleEditClick(item)}
                                                            className="btn-action w-7 h-7 rounded-lg flex items-center justify-center text-amber-500 hover:text-amber-600"
                                                            style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
                                                            title="Editar"
                                                        >
                                                            <Edit3 size={11} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item)}
                                                            disabled={loadingDelete === item.id}
                                                            className="btn-action w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:text-red-600 disabled:opacity-40"
                                                            style={{ background: '#fff5f5', border: '1px solid #fecaca' }}
                                                            title="Eliminar"
                                                        >
                                                            {loadingDelete === item.id ? (
                                                                <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <Trash2 size={11} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="px-5 py-4">
                                                    <p className={`leading-relaxed ${item.tipo === 'evaluacion' ? 'font-medium text-slate-800' : 'text-slate-700'} text-sm`}>
                                                        {item.contenido}
                                                    </p>
                                                    {item.tipo === 'evaluacion' && item.fecha_limite && (
                                                        <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                                                            style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}
                                                        >
                                                            <Clock size={11} className="text-amber-500" />
                                                            <span>Entrega: <strong className="text-amber-600">{formatDate(item.fecha_limite)}</strong></span>
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

            {/* ── MODALES ── */}
            <PostCreate
                aulaId={aula.id}
                isOpen={showPostCreate}
                onClose={() => setShowPostCreate(false)}
            />
            <PostEdit
                post={editingPost}
                isOpen={editingPost !== null}
                onClose={() => setEditingPost(null)}
            />
        </AppLayout>
    );
}