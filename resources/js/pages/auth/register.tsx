import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import {
    BookOpen, CalendarDays, ClipboardList, GraduationCap,
    IdCard, LogIn, Mail, Shield, TrendingUp, UserCheck, UserPlus, UserRound,
} from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Registro — UDO Aulas Virtuales">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen grid lg:grid-cols-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>

                {/* LEFT — form */}
                <div className="flex flex-col bg-slate-50">
                    <div className="lg:hidden bg-[#0b1f3a] px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-yellow-500 bg-[#132d52] flex items-center justify-center">
                            <GraduationCap size={15} className="text-yellow-400" />
                        </div>
                        <p className="text-white font-semibold text-sm">UDO · Aulas Virtuales</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-6 py-10">
                        <div className="w-full max-w-md">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                                <div className="mb-7">
                                    <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center mb-4">
                                        <UserPlus size={20} className="text-yellow-400" />
                                    </div>
                                    <h2 className="text-[#0b1f3a] text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Crear cuenta
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1 font-light">Completa los datos para registrarte en la plataforma</p>
                                </div>

                                <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} disableWhileProcessing className="flex flex-col gap-4">
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="cedula" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                        <IdCard size={13} className="text-slate-400" /> Cédula
                                                    </Label>
                                                    <Input id="cedula" name="cedula" type="text" required maxLength={9} placeholder="V-00000000" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                    <InputError message={errors.cedula} className="text-xs text-red-500" />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="rol" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                        <UserCheck size={13} className="text-slate-400" /> Rol
                                                    </Label>
                                                    <select id="rol" name="rol" required className="h-10 w-full border border-slate-200 rounded-lg px-3 text-sm bg-white text-slate-700 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors">
                                                        <option value="">Seleccionar…</option>
                                                        <option value="E">Estudiante</option>
                                                        <option value="P">Profesor</option>
                                                    </select>
                                                    <InputError message={errors.rol} className="text-xs text-red-500" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="nombre" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                        <UserRound size={13} className="text-slate-400" /> Nombre
                                                    </Label>
                                                    <Input id="nombre" name="nombre" type="text" required maxLength={30} placeholder="Juan" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                    <InputError message={errors.nombre} className="text-xs text-red-500" />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="apellido" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                        <UserRound size={13} className="text-slate-400" /> Apellido
                                                    </Label>
                                                    <Input id="apellido" name="apellido" type="text" required maxLength={30} placeholder="Pérez" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                    <InputError message={errors.apellido} className="text-xs text-red-500" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="fecha_nacimiento" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                    <CalendarDays size={13} className="text-slate-400" /> Fecha de nacimiento
                                                </Label>
                                                <Input id="fecha_nacimiento" name="fecha_nacimiento" type="date" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                <InputError message={errors.fecha_nacimiento} className="text-xs text-red-500" />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="email" className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                                                    <Mail size={13} className="text-slate-400" /> Correo electrónico
                                                </Label>
                                                <Input id="email" name="email" type="email" required placeholder="correo@ejemplo.com" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                <InputError message={errors.email} className="text-xs text-red-500" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Contraseña</Label>
                                                    <Input id="password" name="password" type="password" required placeholder="••••••••" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                    <InputError message={errors.password} className="text-xs text-red-500" />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="password_confirmation" className="text-slate-700 text-sm font-medium">Confirmar</Label>
                                                    <Input id="password_confirmation" name="password_confirmation" type="password" required placeholder="••••••••" className="h-10 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg text-sm" />
                                                    <InputError message={errors.password_confirmation} className="text-xs text-red-500" />
                                                </div>
                                            </div>

                                            <Button type="submit" disabled={processing} className="w-full h-11 bg-[#0b1f3a] hover:bg-[#132d52] text-yellow-400 hover:text-yellow-300 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors mt-1">
                                                {processing ? <Spinner /> : <UserPlus size={16} />}
                                                Crear cuenta
                                            </Button>

                                            <p className="text-center text-sm text-slate-500 pt-1 border-t border-slate-100">
                                                ¿Ya tienes cuenta?{' '}
                                                <TextLink href={login()} className="text-yellow-600 hover:text-yellow-700 font-semibold inline-flex items-center gap-1">
                                                    <LogIn size={13} /> Iniciar sesión
                                                </TextLink>
                                            </p>
                                        </>
                                    )}
                                </Form>
                            </div>
                            <p className="text-center text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
                                <Shield size={11} /> Tu información se almacena de forma segura y cifrada
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#0b1f3a] border-t-2 border-yellow-600 px-6 py-3 flex items-center justify-between">
                        <p className="text-yellow-400 text-xs font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>UDO · Aulas Virtuales</p>
                        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Universidad de Oriente</p>
                    </div>
                </div>

                {/* RIGHT — info */}
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
                                Únete a la<br /><span className="text-yellow-400">plataforma</span>
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed mt-4 max-w-xs font-light">
                                Crea tu cuenta para acceder a tus aulas virtuales, gestionar evaluaciones y hacer seguimiento de tu pensum académico.
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

            </div>
        </>
    );
}