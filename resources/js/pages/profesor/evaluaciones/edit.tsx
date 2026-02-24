import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { evaluacionesUpdate } from '@/routes';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Save, AlertCircle, CalendarDays, FileText, ClipboardList, Clock, ChevronLeft } from 'lucide-react';

interface Props {
    evaluacion: {
        id: number;
        aula_id: number;
        fecha_limite: string;
        descripcion: string;
    };
}

export default function EvaluacionEdit({ evaluacion }: Props) {
    const formatFecha = (fecha: string) => {
        if (!fecha) return '';
        return fecha.replace(' ', 'T').slice(0, 16);
    };

    const { data, setData, put, processing, errors } = useForm({
        fecha_limite: formatFecha(evaluacion.fecha_limite),
        descripcion: evaluacion.descripcion || '',
    });

    const [mounted, setMounted] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (data.fecha_limite && data.fecha_limite.includes('T')) {
            const [fechaPart, horaPart] = data.fecha_limite.split('T');
            setFecha(fechaPart);
            setHora(horaPart.substring(0, 5));
        }
    }, []);

    useEffect(() => {
        if (fecha && hora) {
            setData('fecha_limite', `${fecha}T${hora}`);
        }
    }, [fecha, hora]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(evaluacionesUpdate.url({ evaluacion: evaluacion.id }));
    };

    const descLen = data.descripcion.length;
    const descPct = (descLen / 2000) * 100;
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AppLayout>
            <Head title="Editar Evaluación" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

                .ev-root { font-family: 'DM Sans', sans-serif; }
                .ev-title { font-family: 'Lora', serif; }

                .ev-card-enter {
                    opacity: 0;
                    transform: translateY(18px);
                }
                .ev-card-enter.visible {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }

                .ev-header-gradient {
                    background: linear-gradient(135deg, #060f1e 0%, #0b1f3a 50%, #112b50 100%);
                    position: relative;
                    overflow: hidden;
                }
                .ev-header-gradient::before {
                    content: '';
                    position: absolute;
                    top: -40%; right: -10%;
                    width: 280px; height: 280px;
                    background: radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%);
                    pointer-events: none;
                }
                .ev-header-gradient::after {
                    content: '';
                    position: absolute;
                    bottom: -30%; left: 30%;
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
                    pointer-events: none;
                }

                .ev-field-wrap {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    background: #f8fafc;
                    transition: all 0.2s ease;
                    overflow: hidden;
                }
                .ev-field-wrap.focused {
                    border-color: #f59e0b;
                    background: white;
                    box-shadow: 0 4px 12px -4px rgba(245,158,11,0.18);
                }
                .ev-field-wrap.has-error {
                    border-color: #ef4444;
                    background: #fff5f5;
                }

                .ev-field-wrap-large {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    background: #f8fafc;
                    transition: all 0.2s ease;
                    overflow: hidden;
                }
                .ev-field-wrap-large.focused {
                    border-color: #f59e0b;
                    background: white;
                    box-shadow: 0 4px 12px -4px rgba(245,158,11,0.18);
                }
                .ev-field-wrap-large.has-error {
                    border-color: #ef4444;
                    background: #fff5f5;
                }

                .ev-sub-label {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 7px 11px 0;
                    font-size: 0.65rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: #94a3b8;
                }
                .ev-field-wrap.focused .ev-sub-label,
                .ev-field-wrap-large.focused .ev-sub-label {
                    color: #f59e0b;
                }

                .ev-input {
                    width: 100%;
                    padding: 3px 11px 9px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 0.875rem;
                    color: #0f172a;
                    font-family: 'DM Sans', sans-serif;
                }
                .ev-input[type="date"],
                .ev-input[type="time"] { color-scheme: light; }

                .ev-textarea {
                    width: 100%;
                    padding: 12px 14px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.875rem;
                    line-height: 1.6;
                    color: #0f172a;
                    resize: vertical;
                    min-height: 160px;
                }
                .ev-textarea::placeholder {
                    color: #94a3b8;
                    font-style: italic;
                }

                .ev-progress-track {
                    height: 3px;
                    background: #e2e8f0;
                    border-radius: 99px;
                    overflow: hidden;
                    flex: 1;
                }
                .ev-progress-fill {
                    height: 100%;
                    border-radius: 99px;
                    transition: width 0.3s ease, background-color 0.3s ease;
                }

                .ev-submit-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 22px;
                    background: #f59e0b;
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px -4px rgba(245,158,11,0.4);
                }
                .ev-submit-btn:hover:not(:disabled) {
                    background: #d97706;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px -4px rgba(245,158,11,0.45);
                }
                .ev-submit-btn:active:not(:disabled) { transform: translateY(0); }
                .ev-submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background: #94a3b8;
                    box-shadow: none;
                }

                .ev-back-link { transition: all 0.15s ease; }
                .ev-back-link:hover { gap: 6px; }

                @keyframes spin { to { transform: rotate(360deg); } }
                .animate-spin { animation: spin 0.6s linear infinite; }
            `}</style>

            <div className="ev-root min-h-screen bg-slate-50 p-4 md:p-8">
                <div className="max-w-2xl mx-auto">

                    {/* Volver - Versión segura */}
                    <a
                        href={evaluacion?.aula_id ? `/aulas/access/${evaluacion.aula_id}` : 'javascript:history.back()'}
                        className="ev-back-link inline-flex items-center gap-1.5 mb-5 text-xs font-medium text-slate-500 hover:text-[#0b1f3a] transition-colors"
                        onClick={(e) => {
                            if (!evaluacion?.aula_id) {
                                e.preventDefault();
                                window.history.back();
                            }
                        }}
                    >
                        <ChevronLeft size={14} />
                        Volver al aula
                    </a>

                    {/* Header */}
                    <div
                        className={`ev-header-gradient rounded-2xl overflow-hidden mb-6 shadow-xl ev-card-enter ${mounted ? 'visible' : ''}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <div className="relative z-10 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}
                                >
                                    <ClipboardList size={20} className="text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-amber-400/80 text-[10px] font-semibold tracking-[0.16em] uppercase mb-0.5">
                                        Evaluación #{evaluacion.id}
                                    </p>
                                    <h1 className="ev-title text-xl md:text-2xl font-bold text-white leading-tight">
                                        Editar Evaluación
                                    </h1>
                                </div>
                            </div>
                            <p className="text-slate-400 text-xs mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                Los cambios se reflejarán inmediatamente para todos los estudiantes del aula
                            </p>
                        </div>
                    </div>

                    {/* Error Banner */}
                    {hasErrors && (
                        <div
                            className={`ev-card-enter ${mounted ? 'visible' : ''} mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3`}
                            style={{ transitionDelay: '60ms' }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <AlertCircle size={12} className="text-red-500" />
                                </div>
                                <ul className="m-0 p-0 list-none space-y-1">
                                    {Object.values(errors).map((e, i) => (
                                        <li key={i} className="flex items-center gap-2 text-xs text-red-600">
                                            <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                                            {e}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Form Card */}
                    <div
                        className={`ev-card-enter ${mounted ? 'visible' : ''} bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden`}
                        style={{ transitionDelay: '80ms' }}
                    >
                        {/* Card header strip */}
                        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
                            <CalendarDays size={13} className="text-slate-400" />
                            <span className="text-xs font-semibold text-slate-600">Datos de la evaluación</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="px-5 py-5 flex flex-col gap-5">

                                {/* Fecha y hora */}
                                <div>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5">
                                        <CalendarDays size={11} />
                                        Fecha y hora límite
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className={`ev-field-wrap ${activeField === 'fecha' ? 'focused' : ''} ${errors.fecha_limite ? 'has-error' : ''}`}>
                                            <div className="ev-sub-label">Fecha</div>
                                            <input
                                                type="date"
                                                value={fecha}
                                                onChange={(e) => setFecha(e.target.value)}
                                                onFocus={() => setActiveField('fecha')}
                                                onBlur={() => setActiveField(null)}
                                                className="ev-input"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                        <div className={`ev-field-wrap ${activeField === 'hora' ? 'focused' : ''} ${errors.fecha_limite ? 'has-error' : ''}`}>
                                            <div className="ev-sub-label">
                                                <Clock size={9} />
                                                Hora
                                            </div>
                                            <input
                                                type="time"
                                                value={hora}
                                                onChange={(e) => setHora(e.target.value)}
                                                onFocus={() => setActiveField('hora')}
                                                onBlur={() => setActiveField(null)}
                                                className="ev-input"
                                            />
                                        </div>
                                    </div>
                                    {errors.fecha_limite && (
                                        <p className="flex items-center gap-1.5 text-[11px] text-red-500 mt-1.5">
                                            <AlertCircle size={10} />
                                            {errors.fecha_limite}
                                        </p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5">
                                        <FileText size={11} />
                                        Descripción
                                    </p>
                                    <div className={`ev-field-wrap-large ${activeField === 'desc' ? 'focused' : ''} ${errors.descripcion ? 'has-error' : ''}`}>
                                        <div className="ev-sub-label">Contenido</div>
                                        <textarea
                                            value={data.descripcion}
                                            onChange={(e) => setData('descripcion', e.target.value)}
                                            onFocus={() => setActiveField('desc')}
                                            onBlur={() => setActiveField(null)}
                                            className="ev-textarea"
                                            maxLength={2000}
                                            placeholder="Instrucciones, criterios de evaluación, material necesario, formato de entrega..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 px-0.5">
                                        <div className="ev-progress-track">
                                            <div
                                                className="ev-progress-fill"
                                                style={{
                                                    width: `${descPct}%`,
                                                    backgroundColor: descPct > 90 ? '#ef4444' : descPct > 70 ? '#f59e0b' : '#0b1f3a'
                                                }}
                                            />
                                        </div>
                                        <span className={`text-[11px] font-medium min-w-[58px] text-right ${descPct > 90 ? 'text-red-500' : 'text-slate-400'}`}>
                                            {descLen}/2000
                                        </span>
                                    </div>
                                    {errors.descripcion && (
                                        <p className="flex items-center gap-1.5 text-[11px] text-red-500 mt-1.5">
                                            <AlertCircle size={10} />
                                            {errors.descripcion}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
                                <div className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-500">
                                    <ClipboardList size={11} className="text-slate-400" />
                                    Evaluación
                                    <span
                                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                                        style={{ background: '#f59e0b' }}
                                    >
                                        #{evaluacion.id}
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="text-slate-400">Editando</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="ev-submit-btn"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={14} />
                                            Actualizar evaluación
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <p
                        className={`ev-card-enter ${mounted ? 'visible' : ''} mt-5 text-center text-[11px] text-slate-400`}
                        style={{ transitionDelay: '140ms' }}
                    >
                        Los cambios se aplicarán inmediatamente
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}