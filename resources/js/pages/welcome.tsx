import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenido — UDO Aulas Virtuales">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                    :root {
                        --navy:    #0b1f3a;
                        --navy2:   #132d52;
                        --gold:    #c9952a;
                        --gold2:   #e8b84b;
                        --cream:   #f5f0e8;
                        --cream2:  #fffdf9;
                        --text:    #1a1a2e;
                        --muted:   #5a6a82;
                    }

                    html, body { height: 100%; }

                    .udo-page {
                        min-height: 100vh;
                        background-color: var(--cream2);
                        font-family: 'DM Sans', sans-serif;
                        color: var(--text);
                        display: flex;
                        flex-direction: column;
                        overflow-x: hidden;
                    }

                    /* ── top bar ── */
                    .topbar {
                        position: fixed;
                        top: 0; left: 0; right: 0;
                        z-index: 100;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 2.5rem;
                        height: 64px;
                        background: rgba(11, 31, 58, 0.96);
                        backdrop-filter: blur(8px);
                        border-bottom: 1px solid rgba(201,149,42,0.25);
                    }
                    .topbar-brand {
                        display: flex;
                        align-items: center;
                        gap: 0.65rem;
                        text-decoration: none;
                    }
                    .topbar-logo {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        border: 2px solid var(--gold);
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--navy2);
                        flex-shrink: 0;
                    }
                    .topbar-logo img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .topbar-logo-placeholder {
                        font-family: 'Playfair Display', serif;
                        font-size: 14px;
                        color: var(--gold);
                        font-weight: 700;
                    }
                    .topbar-name {
                        font-family: 'DM Sans', sans-serif;
                        font-size: 0.82rem;
                        font-weight: 500;
                        color: #c8d8f0;
                        letter-spacing: 0.04em;
                        text-transform: uppercase;
                    }
                    .topbar-nav {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                    }
                    .btn-outline {
                        padding: 0.45rem 1.2rem;
                        border: 1px solid rgba(201,149,42,0.5);
                        border-radius: 4px;
                        color: var(--gold2);
                        font-size: 0.82rem;
                        font-weight: 500;
                        text-decoration: none;
                        letter-spacing: 0.03em;
                        transition: border-color 0.2s, background 0.2s, color 0.2s;
                    }
                    .btn-outline:hover {
                        border-color: var(--gold2);
                        background: rgba(201,149,42,0.1);
                        color: #fff;
                    }
                    .btn-solid {
                        padding: 0.45rem 1.4rem;
                        background: var(--gold);
                        border: 1px solid var(--gold);
                        border-radius: 4px;
                        color: var(--navy);
                        font-size: 0.82rem;
                        font-weight: 600;
                        text-decoration: none;
                        letter-spacing: 0.03em;
                        transition: background 0.2s, border-color 0.2s;
                    }
                    .btn-solid:hover {
                        background: var(--gold2);
                        border-color: var(--gold2);
                    }

                    /* ── hero ── */
                    .hero {
                        margin-top: 64px;
                        position: relative;
                        display: grid;
                        grid-template-columns: 1fr 420px;
                        min-height: calc(100vh - 64px);
                        overflow: hidden;
                    }

                    /* decorative diagonal band */
                    .hero::before {
                        content: '';
                        position: absolute;
                        top: 0; right: 380px; bottom: 0;
                        width: 120px;
                        background: linear-gradient(to bottom right, var(--navy2), var(--navy));
                        transform: skewX(-3deg);
                        transform-origin: top right;
                        z-index: 1;
                    }

                    .hero-left {
                        position: relative;
                        z-index: 2;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding: 5rem 5rem 5rem 5rem;
                        background: var(--cream2);
                    }
                    .hero-eyebrow {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-size: 0.72rem;
                        letter-spacing: 0.14em;
                        text-transform: uppercase;
                        color: var(--gold);
                        font-weight: 600;
                        margin-bottom: 1.25rem;
                    }
                    .hero-eyebrow::before {
                        content: '';
                        display: block;
                        width: 28px;
                        height: 2px;
                        background: var(--gold);
                    }
                    .hero-title {
                        font-family: 'Playfair Display', serif;
                        font-size: clamp(2.6rem, 4.5vw, 4.2rem);
                        font-weight: 900;
                        line-height: 1.08;
                        color: var(--navy);
                        margin-bottom: 1.5rem;
                    }
                    .hero-title em {
                        font-style: normal;
                        color: var(--gold);
                    }
                    .hero-desc {
                        max-width: 480px;
                        font-size: 1rem;
                        line-height: 1.75;
                        color: var(--muted);
                        margin-bottom: 2.5rem;
                        font-weight: 300;
                    }
                    .hero-actions {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        flex-wrap: wrap;
                    }
                    .btn-hero-primary {
                        display: inline-block;
                        padding: 0.85rem 2.2rem;
                        background: var(--navy);
                        color: var(--gold2);
                        border: 2px solid var(--navy);
                        border-radius: 4px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        text-decoration: none;
                        letter-spacing: 0.04em;
                        transition: background 0.22s, border-color 0.22s, color 0.22s;
                    }
                    .btn-hero-primary:hover {
                        background: var(--navy2);
                        border-color: var(--navy2);
                        color: #fff;
                    }
                    .btn-hero-secondary {
                        display: inline-block;
                        padding: 0.85rem 2.2rem;
                        background: transparent;
                        color: var(--navy);
                        border: 2px solid var(--navy);
                        border-radius: 4px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        text-decoration: none;
                        letter-spacing: 0.04em;
                        transition: background 0.22s, color 0.22s;
                    }
                    .btn-hero-secondary:hover {
                        background: var(--navy);
                        color: var(--cream2);
                    }
                    .hero-note {
                        margin-top: 1.5rem;
                        font-size: 0.78rem;
                        color: var(--muted);
                    }

                    /* ── hero right panel ── */
                    .hero-right {
                        position: relative;
                        z-index: 2;
                        background: linear-gradient(160deg, var(--navy) 0%, var(--navy2) 100%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 3rem 2.5rem;
                        gap: 2rem;
                    }

                    /* UDO crest placeholder */
                    .crest-ring {
                        width: 130px;
                        height: 130px;
                        border-radius: 50%;
                        border: 3px solid var(--gold);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        box-shadow: 0 0 40px rgba(201,149,42,0.25);
                    }
                    .crest-ring::after {
                        content: '';
                        position: absolute;
                        inset: -8px;
                        border-radius: 50%;
                        border: 1px solid rgba(201,149,42,0.2);
                    }
                    .crest-inner {
                        font-family: 'Playfair Display', serif;
                        font-size: 2.4rem;
                        font-weight: 900;
                        color: var(--gold);
                        text-align: center;
                        line-height: 1;
                    }
                    .crest-sub {
                        font-size: 0.55rem;
                        letter-spacing: 0.1em;
                        color: var(--gold2);
                        text-transform: uppercase;
                        margin-top: 2px;
                    }

                    .panel-title {
                        font-family: 'Playfair Display', serif;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--cream);
                        text-align: center;
                        line-height: 1.3;
                    }
                    .panel-divider {
                        width: 50px;
                        height: 2px;
                        background: var(--gold);
                        margin: 0 auto;
                    }

                    /* feature cards inside right panel */
                    .feature-list {
                        display: flex;
                        flex-direction: column;
                        gap: 0.9rem;
                        width: 100%;
                    }
                    .feature-item {
                        display: flex;
                        align-items: flex-start;
                        gap: 0.75rem;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(201,149,42,0.18);
                        border-radius: 6px;
                        padding: 0.85rem 1rem;
                    }
                    .feature-icon {
                        width: 32px;
                        height: 32px;
                        flex-shrink: 0;
                        border-radius: 6px;
                        background: rgba(201,149,42,0.15);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1rem;
                    }
                    .feature-text strong {
                        display: block;
                        font-size: 0.82rem;
                        font-weight: 600;
                        color: var(--cream);
                        margin-bottom: 2px;
                    }
                    .feature-text span {
                        font-size: 0.74rem;
                        color: rgba(200,215,240,0.65);
                        line-height: 1.4;
                    }

                    /* ── stats strip ── */
                    .stats-strip {
                        background: var(--navy);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0;
                        padding: 2.5rem 4rem;
                        flex-wrap: wrap;
                    }
                    .stat-item {
                        flex: 1;
                        min-width: 160px;
                        text-align: center;
                        padding: 0.5rem 2rem;
                        border-right: 1px solid rgba(201,149,42,0.2);
                    }
                    .stat-item:last-child { border-right: none; }
                    .stat-number {
                        font-family: 'Playfair Display', serif;
                        font-size: 2.2rem;
                        font-weight: 900;
                        color: var(--gold2);
                        line-height: 1;
                    }
                    .stat-label {
                        font-size: 0.72rem;
                        letter-spacing: 0.1em;
                        text-transform: uppercase;
                        color: rgba(200,215,240,0.55);
                        margin-top: 0.4rem;
                        font-weight: 500;
                    }

                    /* ── roles section ── */
                    .roles-section {
                        padding: 5rem 4rem;
                        background: var(--cream);
                    }
                    .section-header {
                        text-align: center;
                        margin-bottom: 3rem;
                    }
                    .section-eyebrow {
                        font-size: 0.72rem;
                        letter-spacing: 0.14em;
                        text-transform: uppercase;
                        color: var(--gold);
                        font-weight: 600;
                        margin-bottom: 0.75rem;
                    }
                    .section-title {
                        font-family: 'Playfair Display', serif;
                        font-size: 2.2rem;
                        font-weight: 900;
                        color: var(--navy);
                        line-height: 1.15;
                    }
                    .roles-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1.5rem;
                        max-width: 900px;
                        margin: 0 auto;
                    }
                    .role-card {
                        background: var(--cream2);
                        border: 1px solid rgba(11,31,58,0.1);
                        border-top: 3px solid var(--gold);
                        border-radius: 6px;
                        padding: 2rem 1.75rem;
                        transition: box-shadow 0.25s, transform 0.25s;
                    }
                    .role-card:hover {
                        box-shadow: 0 8px 30px rgba(11,31,58,0.1);
                        transform: translateY(-3px);
                    }
                    .role-emoji {
                        font-size: 2rem;
                        margin-bottom: 1rem;
                        display: block;
                    }
                    .role-name {
                        font-family: 'Playfair Display', serif;
                        font-size: 1.2rem;
                        font-weight: 700;
                        color: var(--navy);
                        margin-bottom: 0.6rem;
                    }
                    .role-desc {
                        font-size: 0.83rem;
                        line-height: 1.7;
                        color: var(--muted);
                    }

                    /* ── footer ── */
                    .footer {
                        background: var(--navy);
                        padding: 2rem 4rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        gap: 1rem;
                        border-top: 2px solid var(--gold);
                    }
                    .footer-brand {
                        font-family: 'Playfair Display', serif;
                        font-size: 1rem;
                        font-weight: 700;
                        color: var(--gold2);
                    }
                    .footer-brand span {
                        display: block;
                        font-family: 'DM Sans', sans-serif;
                        font-size: 0.7rem;
                        font-weight: 400;
                        color: rgba(200,215,240,0.5);
                        letter-spacing: 0.06em;
                        text-transform: uppercase;
                        margin-top: 2px;
                    }
                    .footer-copy {
                        font-size: 0.72rem;
                        color: rgba(200,215,240,0.4);
                    }

                    /* ── responsive ── */
                    @media (max-width: 900px) {
                        .hero {
                            grid-template-columns: 1fr;
                        }
                        .hero::before { display: none; }
                        .hero-left { padding: 3rem 2rem; }
                        .hero-right { padding: 3rem 2rem; }
                        .roles-grid { grid-template-columns: 1fr; }
                        .roles-section { padding: 3rem 2rem; }
                        .stats-strip { padding: 2rem; }
                        .stat-item { border-right: none; border-bottom: 1px solid rgba(201,149,42,0.2); }
                        .stat-item:last-child { border-bottom: none; }
                        .topbar { padding: 0 1.25rem; }
                        .footer { padding: 1.5rem 1.5rem; }
                    }
                `}</style>
            </Head>

            <div className="udo-page">

                {/* ── Top bar ── */}
                <header className="topbar">
                    <a href="#" className="topbar-brand">
                        <div className="topbar-logo">
                            <span className="topbar-logo-placeholder">U</span>
                        </div>
                        <span className="topbar-name">UDO · Aulas Virtuales</span>
                    </a>
                    <nav className="topbar-nav">
                        {auth.user ? (
                            <Link href={dashboard()} className="btn-solid">
                                Mi panel
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="btn-outline">
                                    Iniciar sesión
                                </Link>
                                {canRegister && (
                                    <Link href={register()} className="btn-solid">
                                        Registrarse
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                {/* ── Hero ── */}
                <section className="hero">
                    {/* Left */}
                    <div className="hero-left">
                        <p className="hero-eyebrow">Universidad de Oriente · Anzoátegui</p>
                        <h1 className="hero-title">
                            Tu espacio de<br />
                            aprendizaje <em>virtual</em>
                        </h1>
                        <p className="hero-desc">
                            Plataforma de aulas virtuales del Departamento de Computación y Sistemas.
                            Gestiona evaluaciones, consulta documentación y sigue tu progreso académico
                            desde un solo lugar.
                        </p>
                        <div className="hero-actions">
                            {auth.user ? (
                                <Link href={dashboard()} className="btn-hero-primary">
                                    Ir a mi panel →
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()} className="btn-hero-primary">
                                        Iniciar sesión
                                    </Link>
                                    {canRegister && (
                                        <Link href={register()} className="btn-hero-secondary">
                                            Crear cuenta
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                        <p className="hero-note">
                            Ingresa con tu cédula de identidad y contraseña registrada.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="hero-right">
                        <div className="crest-ring">
                            <div className="crest-inner">
                                UDO
                                <div className="crest-sub">Venezuela</div>
                            </div>
                        </div>
                        <p className="panel-title">Sistema de<br />Aulas Virtuales</p>
                        <div className="panel-divider" />
                        <div className="feature-list">
                            <div className="feature-item">
                                
                                <div className="feature-text">
                                    <strong>Gestión de evaluaciones</strong>
                                    <span>Crea, entrega y revisa evaluaciones con fecha límite.</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                
                                <div className="feature-text">
                                    <strong>Documentación por materia</strong>
                                    <span>Accede a los posts y materiales publicados por el profesor.</span>
                                </div>
                            </div>
                            <div className="feature-item">
                              
                                <div className="feature-text">
                                    <strong>Progreso de pensum</strong>
                                    <span>Visualiza gráficamente tu avance en la carrera.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Stats strip ── */}
                <div className="stats-strip">
                
                    <div className="stat-item">
                        <div className="stat-number">∞</div>
                        <div className="stat-label">Aulas virtuales</div>
                    </div>
                 
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Acceso en línea</div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <footer className="footer">
                    <div className="footer-brand">
                        UDO · Aulas Virtuales
                        <span>Departamento de Computación y Sistemas — Anzoátegui</span>
                    </div>
                    <p className="footer-copy">
                        © {new Date().getFullYear()} Universidad de Oriente. Proyecto académico.
                    </p>
                </footer>

            </div>
        </>
    );
}