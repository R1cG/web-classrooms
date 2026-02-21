import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import {
    BookOpen, ClipboardList, GraduationCap,
    KeyRound, LogIn, Shield, TrendingUp, UserPlus,
} from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Iniciar sesión — UDO Aulas Virtuales">
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
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center">
                                <GraduationCap size={20} className="text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm leading-none">UDO · Aulas Virtuales</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">Anzoátegui</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-white text-4xl xl:text-5xl font-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Bienvenido de<br /><span className="text-yellow-400">vuelta</span>
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed mt-4 max-w-xs font-light">
                                Accede a tus aulas virtuales, evaluaciones y material académico del Departamento de Computación y Sistemas.
                            </p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { icon: ClipboardList, label: 'Gestión de evaluaciones y entregas' },
                                { icon: BookOpen,      label: 'Documentación por materia y aula'  },
                                { icon: TrendingUp,    label: 'Progreso gráfico de pensum'         },
                             
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-3 bg-white/5 border border-yellow-500/10 rounded-xl px-4 py-3">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                        <Icon size={14} className="text-yellow-400" />
                                    </div>
                                    <span className="text-slate-300 text-sm">{label}</span>
                                </div>
                            ))}
                        </div>
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
                    <div className="lg:hidden bg-[#0b1f3a] px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center">
                            <GraduationCap size={15} className="text-yellow-400" />
                        </div>
                        <p className="text-white font-semibold text-sm">UDO · Aulas Virtuales</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-6 py-12">
                        <div className="w-full max-w-md">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                                <div className="mb-7">
                                    <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center mb-4">
                                        <KeyRound size={20} className="text-yellow-400" />
                                    </div>
                                    <h2 className="text-[#0b1f3a] text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Iniciar sesión
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1 font-light">Ingresa tu correo y contraseña para acceder</p>
                                </div>

                                {status && (
                                    <div className="mb-5 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3">
                                        <Shield size={14} />{status}
                                    </div>
                                )}

                                <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-5">
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Correo electrónico</Label>
                                                <Input id="email" type="email" name="email" required autoFocus tabIndex={1} autoComplete="email" placeholder="correo@ejemplo.com" className="h-11 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                <InputError message={errors.email} className="text-xs text-red-500" />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Contraseña</Label>
                                                    {canResetPassword && (
                                                        <TextLink href={request()} className="text-xs text-yellow-600 hover:text-yellow-700 font-medium" tabIndex={5}>
                                                            ¿Olvidaste tu contraseña?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <Input id="password" type="password" name="password" required tabIndex={2} autoComplete="current-password" placeholder="••••••••" className="h-11 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                <InputError message={errors.password} className="text-xs text-red-500" />
                                            </div>

                                            <div className="flex items-center gap-2.5">
                                                <Checkbox id="remember" name="remember" tabIndex={3} />
                                                <Label htmlFor="remember" className="text-slate-600 text-sm font-normal cursor-pointer">Mantener sesión iniciada</Label>
                                            </div>

                                            <Button type="submit" tabIndex={4} disabled={processing} data-test="login-button" className="w-full h-11 bg-[#0b1f3a] hover:bg-[#132d52] text-yellow-400 hover:text-yellow-300 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
                                                {processing ? <Spinner /> : <LogIn size={16} />}
                                                Ingresar al sistema
                                            </Button>

                                            {canRegister && (
                                                <p className="text-center text-sm text-slate-500 pt-1 border-t border-slate-100">
                                                    ¿No tienes cuenta?{' '}
                                                    <TextLink href={register()} tabIndex={5} className="text-yellow-600 hover:text-yellow-700 font-semibold inline-flex items-center gap-1">
                                                        <UserPlus size={13} /> Regístrate aquí
                                                    </TextLink>
                                                </p>
                                            )}
                                        </>
                                    )}
                                </Form>
                            </div>
                            <p className="text-center text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
                                <Shield size={11} /> Acceso con cédula de identidad y contraseña registrada
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#0b1f3a] border-t-2 border-yellow-600 px-6 py-3 flex items-center justify-between">
                        <p className="text-yellow-400 text-xs font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>UDO · Aulas Virtuales</p>
                        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Universidad de Oriente</p>
                    </div>
                </div>

            </div>
        </>
    );
}