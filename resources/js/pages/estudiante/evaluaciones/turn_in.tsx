import { evaluacionesTurnInStore } from '@/routes';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Save, X, AlertCircle, Link as LinkIcon,
    ClipboardCheck, Clock, CheckCircle2, RefreshCcw
} from 'lucide-react';

interface Props {
    evaluacion: {
        id: number;
        contenido?: string;
        fecha_limite?: string;
    } | null;
    entrega?: {
        url: string;
        updated_at: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function TurnIn({ evaluacion, entrega, isOpen, onClose }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        url: entrega?.url || '',
    });

    const [activeField, setActiveField] = useState<string | null>(null);

    // Sync URL cuando cambia la entrega (al abrir con distinto item)
    useEffect(() => {
        setData('url', entrega?.url || '');
    }, [entrega, evaluacion?.id]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!evaluacion) return;
        post(evaluacionesTurnInStore.url(evaluacion.id), {
            onSuccess: () => { reset(); onClose(); },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const isOverdue = evaluacion?.fecha_limite
        ? new Date(evaluacion.fecha_limite) < new Date()
        : false;

    const hasErrors = Object.keys(errors).length > 0;
    const isEditing = !!entrega?.url;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                .ti-overlay {
                    position: fixed; inset: 0; z-index: 50;
                    display: flex; align-items: center; justify-content: center;
                    pointer-events: none;
                    padding: 24px;
                }
                .ti-overlay.open { pointer-events: all; }

                .ti-backdrop {
                    position: absolute; inset: 0;
                    background: rgba(4,11,24,0);
                    backdrop-filter: blur(0px);
                    -webkit-backdrop-filter: blur(0px);
                    transition: background 0.4s ease, backdrop-filter 0.4s ease;
                }
                .ti-overlay.open .ti-backdrop {
                    background: rgba(4,11,24,0.65);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                }

                .ti-modal {
                    position: relative; z-index: 1;
                    width: 100%; max-width: 540px;
                    border-radius: 24px; overflow: hidden;
                    display: flex; flex-direction: column;
                    font-family: 'Inter', sans-serif;
                    background: #ffffff;
                    box-shadow:
                        0 0 0 1px rgba(0,0,0,0.04),
                        0 32px 64px rgba(0,0,0,0.22),
                        0 8px 24px rgba(0,0,0,0.1);
                    transform: scale(0.94) translateY(12px);
                    opacity: 0;
                    transition: transform 0.4s cubic-bezier(0.34,1.26,0.64,1), opacity 0.3s ease;
                    max-height: calc(100vh - 48px);
                }
                .ti-overlay.open .ti-modal {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }

                /* ── HEADER ── */
                .ti-header {
                    background: #0a1a2f;
                    padding: 24px 24px 16px;
                    border-bottom: 1px solid #1e2f45;
                }
                .ti-header-top {
                    display: flex; align-items: flex-start; justify-content: space-between;
                }
                .ti-header-icon {
                    width: 44px; height: 44px; border-radius: 12px;
                    background: #1e2f45;
                    display: flex; align-items: center; justify-content: center;
                    color: #3b82f6;
                }
                .ti-header-close {
                    width: 32px; height: 32px; border-radius: 8px;
                    background: #1e2f45; border: none;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #94a3b8; transition: all 0.15s ease;
                }
                .ti-header-close:hover { background: #2d4059; color: #fff; }

                .ti-status-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 10px; font-weight: 600; letter-spacing: 0.02em;
                    text-transform: uppercase; padding: 4px 10px; border-radius: 99px;
                }
                .ti-status-badge.pending {
                    background: #1e2f45; color: #3b82f6;
                }
                .ti-status-badge.editing {
                    background: rgba(245,158,11,0.15); color: #f59e0b;
                }
                .ti-status-badge.overdue {
                    background: rgba(239,68,68,0.15); color: #f87171;
                }

                /* ── EVALUACION PREVIEW ── */
                .ti-preview {
                    margin: 16px 0 0;
                    background: #0f2540;
                    border: 1px solid #1e3a5f;
                    border-radius: 12px;
                    padding: 12px 14px;
                }
                .ti-preview-text {
                    font-size: 0.8125rem;
                    color: #cbd5e1;
                    line-height: 1.5;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .ti-deadline {
                    display: inline-flex; align-items: center; gap: 5px;
                    margin-top: 8px;
                    font-size: 0.7rem; font-weight: 500;
                    padding: 3px 8px; border-radius: 6px;
                }
                .ti-deadline.ok {
                    background: rgba(245,158,11,0.15);
                    color: #fbbf24;
                }
                .ti-deadline.overdue {
                    background: rgba(239,68,68,0.15);
                    color: #f87171;
                }

                /* ── BODY ── */
                .ti-body {
                    background: #ffffff;
                    flex: 1; overflow-y: auto;
                    padding: 24px;
                }

                .ti-field-label {
                    display: flex; align-items: center; gap: 8px;
                    margin-bottom: 8px;
                    color: #475569; font-size: 0.8rem;
                    font-weight: 600; text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                .ti-field-wrap {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 16px;
                    background: #f8fafc;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                    overflow: hidden;
                }
                .ti-field-wrap.focused {
                    border-color: #3b82f6;
                    background: #ffffff;
                    box-shadow: 0 4px 12px -4px rgba(59, 130, 246, 0.2);
                }
                .ti-field-wrap.has-error {
                    border-color: #ef4444;
                    background: #fff5f5;
                }

                .ti-input {
                    width: 100%;
                    padding: 14px 16px;
                    background: transparent; border: none; outline: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    color: #0f172a;
                }
                .ti-input::placeholder { color: #94a3b8; }

                .ti-last-entry {
                    display: flex; align-items: center; gap: 6px;
                    margin-top: 10px;
                    padding: 10px 12px;
                    background: #f0fdf4;
                    border: 1px solid #bbf7d0;
                    border-radius: 10px;
                    font-size: 0.75rem; color: #166534;
                }
                .ti-last-entry a {
                    color: #16a34a;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    font-weight: 500;
                    word-break: break-all;
                }

                /* ── ERROR BANNER ── */
                .ti-error-banner {
                    border-radius: 12px; padding: 12px 14px;
                    background: #fef2f2; border: 1.5px solid #fee2e2;
                    display: flex; align-items: flex-start; gap: 10px;
                    margin-bottom: 20px;
                }

                /* ── FOOTER ── */
                .ti-footer {
                    background: #ffffff;
                    border-top: 1.5px solid #eef2f6;
                    padding: 16px 24px;
                    display: flex; align-items: center; justify-content: space-between;
                }

                .ti-btn-cancel {
                    padding: 10px 18px; border-radius: 10px;
                    border: 1.5px solid #e2e8f0; background: #ffffff;
                    color: #475569; font-size: 0.875rem; font-weight: 500;
                    font-family: 'Inter', sans-serif; cursor: pointer;
                    transition: all 0.15s ease;
                }
                .ti-btn-cancel:hover {
                    border-color: #3b82f6;
                    background: #eff6ff; color: #0a1a2f;
                }

                .ti-btn-submit {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 22px; border-radius: 10px; border: none;
                    color: #ffffff; font-size: 0.875rem; font-weight: 600;
                    font-family: 'Inter', sans-serif; cursor: pointer;
                    transition: all 0.15s ease;
                }
                .ti-btn-submit.submit-new {
                    background: #2563eb;
                    box-shadow: 0 4px 12px -4px rgba(37, 99, 235, 0.4);
                }
                .ti-btn-submit.submit-new:hover:not(:disabled) {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px -6px rgba(37, 99, 235, 0.5);
                }
                .ti-btn-submit.submit-edit {
                    background: #f59e0b;
                    box-shadow: 0 4px 12px -4px rgba(245,158,11,0.4);
                }
                .ti-btn-submit.submit-edit:hover:not(:disabled) {
                    background: #d97706;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px -6px rgba(245,158,11,0.5);
                }
                .ti-btn-submit:active:not(:disabled) { transform: translateY(0); }
                .ti-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; background: #94a3b8 !important; box-shadow: none !important; }

                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className={`ti-overlay ${isOpen ? 'open' : ''}`}>
                <div className="ti-backdrop" onClick={handleClose} />

                <div className="ti-modal" role="dialog" aria-modal="true" aria-label="Entregar evaluación">

                    {/* ── HEADER ── */}
                    <div className="ti-header">
                        <div className="ti-header-top">
                            <div className="flex items-center gap-3">
                                <div className="ti-header-icon">
                                    <ClipboardCheck size={20} />
                                </div>
                                <div>
                                    <h2 style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600, fontSize: '1.25rem',
                                        color: '#ffffff', letterSpacing: '-0.01em', margin: 0
                                    }}>
                                        {isEditing ? 'Editar Entrega' : 'Realizar Entrega'}
                                    </h2>
                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px', marginBottom: 0 }}>
                                        {isEditing
                                            ? 'Actualiza la URL de tu entrega anterior'
                                            : 'Envía el enlace de tu trabajo al profesor'}
                                    </p>
                                </div>
                            </div>
                            <button className="ti-header-close" onClick={handleClose} aria-label="Cerrar">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Evaluacion preview */}
                        {evaluacion && (
                            <div className="ti-preview">
                                {evaluacion.contenido && (
                                    <p className="ti-preview-text">{evaluacion.contenido}</p>
                                )}
                                {evaluacion.fecha_limite && (
                                    <span className={`ti-deadline ${isOverdue ? 'overdue' : 'ok'}`}>
                                        <Clock size={10} />
                                        {isOverdue ? 'Venció: ' : 'Entrega: '}
                                        {formatDate(evaluacion.fecha_limite)}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── BODY ── */}
                    <div className="ti-body">
                        {hasErrors && (
                            <div className="ti-error-banner">
                                <div style={{
                                    width: 20, height: 20, borderRadius: 6,
                                    background: '#fee2e2',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <AlertCircle size={12} color="#ef4444" />
                                </div>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                    {Object.values(errors).map((e, i) => (
                                        <li key={i} style={{
                                            fontSize: '0.75rem', color: '#dc2626',
                                            display: 'flex', alignItems: 'center', gap: 6
                                        }}>
                                            <span style={{
                                                width: 4, height: 4, borderRadius: '50%',
                                                background: '#fca5a5', flexShrink: 0
                                            }} />
                                            {e}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form id="ti-form" onSubmit={handleSubmit}>
                            <div>
                                <div className="ti-field-label">
                                    <LinkIcon size={14} style={{ color: '#94a3b8' }} />
                                    <span>URL de entrega</span>
                                </div>

                                <div className={`ti-field-wrap ${activeField === 'url' ? 'focused' : ''} ${errors.url ? 'has-error' : ''}`}>
                                    <input
                                        type="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        onFocus={() => setActiveField('url')}
                                        onBlur={() => setActiveField(null)}
                                        className="ti-input"
                                        placeholder="https://drive.google.com/... · github.com/... · docs.google.com/..."
                                        maxLength={500}
                                        autoFocus={isOpen}
                                    />
                                </div>

                                {errors.url && (
                                    <p style={{
                                        display: 'flex', alignItems: 'center', gap: 5,
                                        fontSize: '0.75rem', color: '#ef4444', marginTop: 6
                                    }}>
                                        <AlertCircle size={10} />
                                        {errors.url}
                                    </p>
                                )}

                                {/* Entrega anterior */}
                                {entrega?.url && (
                                    <div className="ti-last-entry">
                                        <CheckCircle2 size={13} style={{ flexShrink: 0 }} />
                                        <span>
                                            Última entrega el {new Date(entrega.updated_at).toLocaleString('es-ES', {
                                                day: '2-digit', month: 'short',
                                                hour: '2-digit', minute: '2-digit'
                                            })}:&nbsp;
                                            <a href={entrega.url} target="_blank" rel="noreferrer">
                                                {entrega.url.length > 50 ? entrega.url.slice(0, 50) + '…' : entrega.url}
                                            </a>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* ── FOOTER ── */}
                    <div className="ti-footer">
                        <button type="button" onClick={handleClose} className="ti-btn-cancel">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="ti-form"
                            disabled={processing}
                            className={`ti-btn-submit ${isEditing ? 'submit-edit' : 'submit-new'}`}
                        >
                            {processing ? (
                                <>
                                    <div style={{
                                        width: 14, height: 14,
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: '#ffffff', borderRadius: '50%',
                                        animation: 'spin 0.6s linear infinite'
                                    }} />
                                    Guardando...
                                </>
                            ) : isEditing ? (
                                <>
                                    <RefreshCcw size={14} />
                                    Actualizar Entrega
                                </>
                            ) : (
                                <>
                                    <Save size={14} />
                                    Entregar Evaluación
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}