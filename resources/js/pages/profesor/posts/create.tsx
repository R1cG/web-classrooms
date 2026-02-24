import { postsStore } from '@/routes';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Save, X, AlertCircle, Type, MessageSquare, Image, Link2, Smile, Paperclip } from 'lucide-react';

interface Props {
    aulaId: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function PostCreate({ aulaId, isOpen, onClose }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        contenido: '',
        aula_id: aulaId,
    });

    const [activeField, setActiveField] = useState<string | null>(null);

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
        post(postsStore.url(), {
            onSuccess: () => { reset(); onClose(); },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const charLen = data.contenido.length;
    const charPct = (charLen / 2000) * 100;
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                .pc-overlay {
                    position: fixed; inset: 0; z-index: 50;
                    display: flex; align-items: center; justify-content: center;
                    pointer-events: none;
                    padding: 24px;
                }
                .pc-overlay.open { pointer-events: all; }

                .pc-backdrop {
                    position: absolute; inset: 0;
                    background: rgba(4,11,24,0);
                    backdrop-filter: blur(0px);
                    -webkit-backdrop-filter: blur(0px);
                    transition: background 0.4s ease, backdrop-filter 0.4s ease;
                }
                .pc-overlay.open .pc-backdrop {
                    background: rgba(4,11,24,0.65);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                }

                .pc-modal {
                    position: relative; z-index: 1;
                    width: 100%; max-width: 560px;
                    border-radius: 24px; overflow: hidden;
                    display: flex; flex-direction: column;
                    font-family: 'Inter', sans-serif;
                    background: #ffffff;
                    box-shadow:
                        0 0 0 1px rgba(0,0,0,0.04),
                        0 32px 64px rgba(0,0,0,0.2),
                        0 8px 24px rgba(0,0,0,0.1);
                    transform: scale(0.94) translateY(12px);
                    opacity: 0;
                    transition: transform 0.4s cubic-bezier(0.34,1.26,0.64,1), opacity 0.3s ease;
                    max-height: calc(100vh - 48px);
                }
                .pc-overlay.open .pc-modal {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }

                .pc-header {
                    background: #0a1a2f;
                    padding: 24px 24px 16px;
                    border-bottom: 1px solid #1e2f45;
                }

                .pc-header-top {
                    display: flex; align-items: flex-start; justify-content: space-between;
                }

                .pc-header-icon {
                    width: 44px; height: 44px; border-radius: 12px;
                    background: #1e2f45;
                    display: flex; align-items: center; justify-content: center;
                    color: #f59e0b;
                }

                .pc-header-close {
                    width: 32px; height: 32px; border-radius: 8px;
                    background: #1e2f45; border: none;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #94a3b8; transition: all 0.15s ease;
                }
                .pc-header-close:hover { background: #2d4059; color: #fff; }

                .pc-header-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 10px; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase;
                    padding: 4px 10px; border-radius: 99px;
                    background: #1e2f45; color: #f59e0b;
                }

                .pc-body {
                    background: #ffffff;
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px;
                }

                .pc-field-wrap {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 16px;
                    background: #f8fafc;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                    overflow: hidden;
                }
                .pc-field-wrap.focused {
                    border-color: #f59e0b;
                    background: #ffffff;
                    box-shadow: 0 4px 12px -4px rgba(245, 158, 11, 0.2);
                }
                .pc-field-wrap.has-error {
                    border-color: #ef4444;
                    background: #fff5f5;
                }

                .pc-field-label {
                    display: flex; align-items: center; gap: 8px;
                    margin-bottom: 8px;
                    color: #475569;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                .pc-textarea {
                    width: 100%;
                    padding: 16px 18px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9375rem;
                    line-height: 1.6;
                    color: #0f172a;
                    resize: vertical;
                    min-height: 180px;
                }
                .pc-textarea::placeholder {
                    color: #94a3b8;
                    font-style: italic;
                }

                .pc-quick-actions {
                    display: flex; align-items: center; gap: 8px;
                    padding: 12px 18px;
                    background: #f8fafc;
                    border-top: 1.5px dashed #e2e8f0;
                }

                .pc-quick-action {
                    width: 34px; height: 34px;
                    border-radius: 10px;
                    background: white;
                    border: 1.5px solid #e2e8f0;
                    display: flex; align-items: center; justify-content: center;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .pc-quick-action:hover {
                    border-color: #f59e0b;
                    color: #f59e0b;
                    background: #fff9f0;
                    transform: translateY(-1px);
                }

                .pc-progress-track {
                    height: 3px;
                    background: #e2e8f0;
                    border-radius: 99px;
                    overflow: hidden;
                    flex: 1;
                }
                .pc-progress-fill {
                    height: 100%;
                    border-radius: 99px;
                    transition: width 0.25s ease;
                }

                .pc-error-banner {
                    border-radius: 12px; padding: 12px 14px;
                    background: #fef2f2; border: 1.5px solid #fee2e2;
                    display: flex; align-items: flex-start; gap: 10px;
                    margin-bottom: 20px;
                }

                .pc-footer {
                    background: #ffffff;
                    border-top: 1.5px solid #eef2f6;
                    padding: 16px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .pc-btn-cancel {
                    padding: 10px 18px;
                    border-radius: 10px;
                    border: 1.5px solid #e2e8f0;
                    background: #ffffff;
                    color: #475569;
                    font-size: 0.875rem;
                    font-weight: 500;
                    font-family: 'Inter', sans-serif;
                    cursor: pointer;
                    transition: all 0.15s ease;
                }
                .pc-btn-cancel:hover {
                    border-color: #f59e0b;
                    background: #fff9f0;
                    color: #0a1a2f;
                }

                .pc-btn-submit {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 22px;
                    border-radius: 10px; border: none;
                    background: #f59e0b;
                    color: #ffffff;
                    font-size: 0.875rem; font-weight: 600;
                    font-family: 'Inter', sans-serif;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    box-shadow: 0 4px 12px -4px rgba(245, 158, 11, 0.4);
                }
                .pc-btn-submit:hover:not(:disabled) {
                    background: #d97706;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px -6px rgba(245, 158, 11, 0.5);
                }
                .pc-btn-submit:active:not(:disabled) { transform: translateY(0); }
                .pc-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; background: #94a3b8; }

                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className={`pc-overlay ${isOpen ? 'open' : ''}`}>
                <div className="pc-backdrop" onClick={handleClose} />

                <div className="pc-modal" role="dialog" aria-modal="true" aria-label="Crear post">

                    {/* HEADER */}
                    <div className="pc-header">
                        <div className="pc-header-top">
                            <div className="flex items-center gap-3">
                                <div className="pc-header-icon">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h2 style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: '1.25rem',
                                        color: '#ffffff',
                                        letterSpacing: '-0.01em',
                                        margin: 0
                                    }}>
                                        Nuevo Post
                                    </h2>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: '#94a3b8',
                                        marginTop: '2px',
                                        marginBottom: 0
                                    }}>
                                        Comparte información importante con tu aula
                                    </p>
                                </div>
                            </div>
                            <button className="pc-header-close" onClick={handleClose} aria-label="Cerrar">
                                <X size={14} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                            <span className="pc-header-badge">
                                Aula #{aulaId}
                            </span>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="pc-body">
                        {hasErrors && (
                            <div className="pc-error-banner">
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

                        <form id="pc-form" onSubmit={handleSubmit}>
                            <div>
                                <div className="pc-field-label">
                                    <Type size={14} style={{ color: '#94a3b8' }} />
                                    <span>Contenido del post</span>
                                </div>

                                <div className={`pc-field-wrap ${activeField === 'contenido' ? 'focused' : ''} ${errors.contenido ? 'has-error' : ''}`}>
                                    <textarea
                                        value={data.contenido}
                                        onChange={(e) => setData('contenido', e.target.value)}
                                        onFocus={() => setActiveField('contenido')}
                                        onBlur={() => setActiveField(null)}
                                        className="pc-textarea"
                                        maxLength={2000}
                                        placeholder="¿Qué quieres compartir con tu aula? Escribe aquí tus ideas, anuncios, preguntas o reflexiones..."
                                        autoFocus={isOpen}
                                    />

                                    {/* Quick actions */}
                                    <div className="pc-quick-actions">
                                        <button type="button" className="pc-quick-action" title="Añadir imagen">
                                            <Image size={14} />
                                        </button>
                                        <button type="button" className="pc-quick-action" title="Añadir enlace">
                                            <Link2 size={14} />
                                        </button>
                                        <button type="button" className="pc-quick-action" title="Añadir archivo">
                                            <Paperclip size={14} />
                                        </button>
                                        <button type="button" className="pc-quick-action" title="Añadir emoji">
                                            <Smile size={14} />
                                        </button>
                                        <span style={{
                                            marginLeft: 'auto',
                                            fontSize: '0.7rem',
                                            color: '#94a3b8',
                                            fontStyle: 'italic'
                                        }}>
                                            Funciones próximamente
                                        </span>
                                    </div>
                                </div>

                                {/* Contador */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                                    <div className="pc-progress-track">
                                        <div
                                            className="pc-progress-fill"
                                            style={{
                                                width: `${charPct}%`,
                                                background: charPct > 90 ? '#ef4444' : charPct > 70 ? '#f59e0b' : '#0a1a2f'
                                            }}
                                        />
                                    </div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        fontFamily: 'monospace',
                                        color: charPct > 90 ? '#ef4444' : '#64748b',
                                        fontWeight: charPct > 90 ? 600 : 400
                                    }}>
                                        {charLen}/2000
                                    </span>
                                </div>

                                {errors.contenido && (
                                    <p style={{
                                        display: 'flex', alignItems: 'center', gap: 5,
                                        fontSize: '0.75rem', color: '#ef4444', marginTop: 6
                                    }}>
                                        <AlertCircle size={10} />
                                        {errors.contenido}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* FOOTER */}
                    <div className="pc-footer">
                        <button type="button" onClick={handleClose} className="pc-btn-cancel">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="pc-form"
                            disabled={processing}
                            className="pc-btn-submit"
                        >
                            {processing ? (
                                <>
                                    <div style={{
                                        width: 14, height: 14,
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: '#ffffff',
                                        borderRadius: '50%',
                                        animation: 'spin 0.6s linear infinite'
                                    }} />
                                    Publicando...
                                </>
                            ) : (
                                <>
                                    <Save size={14} />
                                    Publicar post
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}