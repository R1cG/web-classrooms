import { postsUpdate } from '@/routes';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Save, X, AlertCircle, Type, MessageSquare, Edit3 } from 'lucide-react';

interface Post {
    id: number;
    contenido: string;
    aula_id: number;
}

interface Props {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function PostEdit({ post, isOpen, onClose }: Props) {
    const { data, setData, put, processing, errors, reset, setDefaults } = useForm({
        contenido: post?.contenido ?? '',
        aula_id: post?.aula_id ?? 0,
    });

    const [activeField, setActiveField] = useState<string | null>(null);

    // Sync form data when post changes
    useEffect(() => {
        if (post) {
            setData({
                contenido: post.contenido,
                aula_id: post.aula_id,
            });
        }
    }, [post]);

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
        if (!post) return;
        put(postsUpdate.url({ post: post.id }), {
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

    const getCharColor = () => {
        if (charPct > 90) return '#ef4444';
        if (charPct > 70) return '#f59e0b';
        return '#10b981';
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                .pe-overlay {
                    position: fixed; inset: 0; z-index: 50;
                    display: flex; align-items: center; justify-content: center;
                    pointer-events: none;
                    padding: 24px;
                }
                .pe-overlay.open { pointer-events: all; }

                .pe-backdrop {
                    position: absolute; inset: 0;
                    background: rgba(4,11,24,0);
                    backdrop-filter: blur(0px);
                    -webkit-backdrop-filter: blur(0px);
                    transition: background 0.4s ease, backdrop-filter 0.4s ease;
                }
                .pe-overlay.open .pe-backdrop {
                    background: rgba(4,11,24,0.65);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                }

                .pe-modal {
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
                .pe-overlay.open .pe-modal {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }

                .pe-header {
                    background: #0a1a2f;
                    padding: 24px 24px 16px;
                    border-bottom: 1px solid #1e2f45;
                }

                .pe-header-top {
                    display: flex; align-items: flex-start; justify-content: space-between;
                }

                .pe-header-icon {
                    width: 44px; height: 44px; border-radius: 12px;
                    background: #1e2f45;
                    display: flex; align-items: center; justify-content: center;
                    color: #f59e0b;
                }

                .pe-header-close {
                    width: 32px; height: 32px; border-radius: 8px;
                    background: #1e2f45; border: none;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #94a3b8; transition: all 0.15s ease;
                }
                .pe-header-close:hover { background: #2d4059; color: #fff; }

                .pe-header-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 10px; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase;
                    padding: 4px 10px; border-radius: 99px;
                    background: #1e2f45; color: #f59e0b;
                }

                .pe-body {
                    background: #ffffff;
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px;
                }

                .pe-field-label {
                    display: flex; align-items: center; gap: 8px;
                    margin-bottom: 8px;
                    color: #475569;
                    font-size: 0.8rem; font-weight: 600;
                    text-transform: uppercase; letter-spacing: 0.02em;
                }

                .pe-field-wrap {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 16px;
                    background: #f8fafc;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                    overflow: hidden;
                }
                .pe-field-wrap.focused {
                    border-color: #f59e0b;
                    background: #ffffff;
                    box-shadow: 0 4px 12px -4px rgba(245, 158, 11, 0.2);
                }
                .pe-field-wrap.has-error {
                    border-color: #ef4444;
                    background: #fff5f5;
                }

                .pe-textarea {
                    width: 100%;
                    padding: 16px 18px;
                    background: transparent;
                    border: none; outline: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9375rem;
                    line-height: 1.7;
                    color: #0f172a;
                    resize: vertical;
                    min-height: 200px;
                }
                .pe-textarea::placeholder {
                    color: #94a3b8;
                    font-style: italic;
                }

                .pe-progress-track {
                    height: 3px; background: #e2e8f0;
                    border-radius: 99px; overflow: hidden; flex: 1;
                }
                .pe-progress-fill {
                    height: 100%; border-radius: 99px;
                    transition: width 0.25s ease;
                }

                .pe-error-banner {
                    border-radius: 12px; padding: 12px 14px;
                    background: #fef2f2; border: 1.5px solid #fee2e2;
                    display: flex; align-items: flex-start; gap: 10px;
                    margin-bottom: 20px;
                }

                .pe-footer {
                    background: #ffffff;
                    border-top: 1.5px solid #eef2f6;
                    padding: 16px 24px;
                    display: flex; align-items: center; justify-content: space-between;
                }

                .pe-btn-cancel {
                    padding: 10px 18px;
                    border-radius: 10px;
                    border: 1.5px solid #e2e8f0;
                    background: #ffffff; color: #475569;
                    font-size: 0.875rem; font-weight: 500;
                    font-family: 'Inter', sans-serif;
                    cursor: pointer; transition: all 0.15s ease;
                }
                .pe-btn-cancel:hover {
                    border-color: #94a3b8; background: #f8fafc; color: #0f172a;
                }

                .pe-btn-submit {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 22px;
                    border-radius: 10px; border: none;
                    background: #f59e0b;
                    color: #ffffff;
                    font-size: 0.875rem; font-weight: 600;
                    font-family: 'Inter', sans-serif;
                    cursor: pointer; transition: all 0.15s ease;
                    box-shadow: 0 4px 12px -4px rgba(245,158,11,0.4);
                }
                .pe-btn-submit:hover:not(:disabled) {
                    background: #d97706;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px -6px rgba(245,158,11,0.5);
                }
                .pe-btn-submit:active:not(:disabled) { transform: translateY(0); }
                .pe-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className={`pe-overlay ${isOpen ? 'open' : ''}`}>
                <div className="pe-backdrop" onClick={handleClose} />

                <div className="pe-modal" role="dialog" aria-modal="true" aria-label="Editar post">

                    {/* HEADER */}
                    <div className="pe-header">
                        <div className="pe-header-top">
                            <div className="flex items-center gap-3">
                                <div className="pe-header-icon">
                                    <Edit3 size={20} />
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
                                        Editar Post
                                    </h2>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: '#94a3b8',
                                        marginTop: '2px',
                                        marginBottom: 0
                                    }}>
                                        Modifica el contenido de tu publicación
                                    </p>
                                </div>
                            </div>
                            <button className="pe-header-close" onClick={handleClose} aria-label="Cerrar">
                                <X size={14} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                            <span className="pe-header-badge">
                                <MessageSquare size={9} />
                                Aula #{post?.aula_id}
                            </span>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="pe-body">
                        {hasErrors && (
                            <div className="pe-error-banner">
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

                        <form id="pe-form" onSubmit={handleSubmit}>
                            <div>
                                <div className="pe-field-label">
                                    <Type size={14} style={{ color: '#94a3b8' }} />
                                    <span>Contenido del post</span>
                                </div>

                                <div className={`pe-field-wrap ${activeField === 'contenido' ? 'focused' : ''} ${errors.contenido ? 'has-error' : ''}`}>
                                    <textarea
                                        value={data.contenido}
                                        onChange={(e) => setData('contenido', e.target.value)}
                                        onFocus={() => setActiveField('contenido')}
                                        onBlur={() => setActiveField(null)}
                                        className="pe-textarea"
                                        maxLength={2000}
                                        placeholder="Edita tu post aquí..."
                                    />
                                </div>

                                {/* Contador */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                                    <div className="pe-progress-track">
                                        <div
                                            className="pe-progress-fill"
                                            style={{ width: `${charPct}%`, background: getCharColor() }}
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
                    <div className="pe-footer">
                        <button type="button" onClick={handleClose} className="pe-btn-cancel">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="pe-form"
                            disabled={processing}
                            className="pe-btn-submit"
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
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save size={14} />
                                    Actualizar post
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}