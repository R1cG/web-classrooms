import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';
import {
    ArrowLeft,
    BookOpen,
    ClipboardList,
    GraduationCap,
    KeyRound,
    LoaderCircle,
    Mail,
    Shield,
    TrendingUp,
} from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Recuperar contraseña — UDO Aulas Virtuales">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen grid lg:grid-cols-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>

                {/* LEFT — info */}
                <div className="hidden lg:flex flex-col bg-[#0b1f3a] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl" />

                    <div className="relative z-10 flex flex-col flex-1 justify-center px-12 py-16 gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center">
                                <GraduationCap size={20} className="text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm leading-none">UDO · Aulas Virtuales</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">Anzoátegui</p>
                            </div>
                        </div>

                        {/* Heading */}
                        <div>
                            <h1 className="text-white text-4xl xl:text-5xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                ¿Olvidaste tu<br /><span className="text-yellow-400">contraseña?</span>
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed mt-4 max-w-xs font-light">
                                No te preocupes. Ingresa tu correo electrónico y te enviaremos
                                un enlace para restablecer tu acceso de forma segura.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-3">
                            {[
                                { icon: Mail,          label: 'Ingresa tu correo registrado'           },
                                { icon: KeyRound,      label: 'Recibe el enlace de recuperación'        },
                                { icon: Shield,        label: 'Crea una nueva contraseña segura'        },
                                { icon: GraduationCap, label: 'Accede de vuelta a tus aulas virtuales'  },
                            ].map(({ icon: Icon, label }, i) => (
                                <div key={label} className="flex items-center gap-3 bg-white/5 border border-yellow-500/10 rounded-xl px-4 py-3">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 relative">
                                        <Icon size={14} className="text-yellow-400" />
                                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-yellow-500 text-[#0b1f3a] text-[9px] font-black flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <span className="text-slate-300 text-sm">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Badge */}
                        <div className="mt-auto">
                            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2">
                                <Shield size={12} className="text-yellow-400" />
                                <span className="text-yellow-400 text-xs font-medium">Universidad de Oriente · Venezuela</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — form */}
                <div className="flex flex-col bg-slate-50">
                    {/* Mobile bar */}
                    <div className="lg:hidden bg-[#0b1f3a] px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center">
                            <GraduationCap size={15} className="text-yellow-400" />
                        </div>
                        <p className="text-white font-semibold text-sm">UDO · Aulas Virtuales</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-6 py-12">
                        <div className="w-full max-w-md">

                            {/* Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

                                {/* Header */}
                                <div className="mb-7">
                                    <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center mb-4">
                                        <KeyRound size={20} className="text-yellow-400" />
                                    </div>
                                    <h2 className="text-[#0b1f3a] text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Recuperar acceso
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1 font-light">
                                        Ingresa tu correo y te enviaremos un enlace de recuperación
                                    </p>
                                </div>

                                {/* Status */}
                                {status && (
                                    <div className="mb-5 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3">
                                        <Shield size={14} className="flex-shrink-0" />
                                        {status}
                                    </div>
                                )}

                                {/* Form */}
                                <Form {...email.form()} className="flex flex-col gap-5">
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="email" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                    <Mail size={13} className="text-slate-400" />
                                                    Correo electrónico
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    autoFocus
                                                    placeholder="correo@ejemplo.com"
                                                    className="h-11 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm"
                                                />
                                                <InputError message={errors.email} className="text-xs text-red-500" />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                data-test="email-password-reset-link-button"
                                                className="w-full h-11 bg-[#0b1f3a] hover:bg-[#132d52] text-yellow-400 hover:text-yellow-300 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                                            >
                                                {processing
                                                    ? <LoaderCircle size={16} className="animate-spin" />
                                                    : <Mail size={16} />
                                                }
                                                Enviar enlace de recuperación
                                            </Button>

                                            <p className="text-center text-sm text-slate-500 pt-1 border-t border-slate-100">
                                                <TextLink
                                                    href={login()}
                                                    className="text-yellow-600 hover:text-yellow-700 font-semibold inline-flex items-center gap-1"
                                                >
                                                    <ArrowLeft size={13} />
                                                    Volver a iniciar sesión
                                                </TextLink>
                                            </p>
                                        </>
                                    )}
                                </Form>
                            </div>

                            <p className="text-center text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
                                <Shield size={11} />
                                El enlace de recuperación expira en 60 minutos
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#0b1f3a] border-t-2 border-yellow-600 px-6 py-3 flex items-center justify-between">
                        <p className="text-yellow-400 text-xs font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>UDO · Aulas Virtuales</p>
                        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Universidad de Oriente</p>
                    </div>
                </div>

            </div>
        </>
    );
}