import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usuariosUpdate } from '@/routes';
import { Button } from '@/components/ui/button';
import {
    AlertCircle,
    CalendarDays,
    IdCard,
    KeyRound,
    Mail,
    Save,
    UserCheck,
    UserPen,
    UserRound,
    ArrowLeft,
    Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface User {
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    fecha_nacimiento?: string;
}

const ROL_STYLE: Record<string, string> = {
    A: 'bg-purple-100 text-purple-700 border-purple-200',
    P: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    E: 'bg-blue-100 text-blue-700 border-blue-200',
};

const ROL_LABEL: Record<string, string> = {
    A: 'Administrador', 
    P: 'Profesor', 
    E: 'Estudiante',
};

export default function Edit({ usuario }: { usuario: User }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre:           usuario.nombre,
        apellido:         usuario.apellido,
        email:            usuario.email,
        rol:              usuario.rol,
        fecha_nacimiento: usuario.fecha_nacimiento ?? '',
        password:         '',
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(usuariosUpdate.url({ usuario: usuario.cedula }));
    };

    const inputClass = (field?: string) =>
        `w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400
        focus:border-[#f59e0b] focus:shadow-md
        ${field && errors[field as keyof typeof errors] ? 'border-red-300 focus:border-red-400' : 'border-slate-200'}`;

    const labelClass = "text-slate-600 text-sm font-medium flex items-center gap-1.5 mb-1.5";

    return (
        <AppLayout breadcrumbs={[
            { title: 'Usuarios', href: '/usuarios' },
            { title: 'Editar Usuario', href: '#' },
        ]}>
            <Head title="Editar Usuario — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-3xl mx-auto">
                    {/* Header simple */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                                <UserPen size={22} className="text-[#f59e0b]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Editar usuario
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    Modifica los datos del usuario registrado
                                </p>
                            </div>
                        </div>
                        <a
                            href="/usuarios"
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm shadow-sm"
                        >
                            <ArrowLeft size={16} className="text-slate-600" />
                            <span className="text-slate-600 font-medium">Volver</span>
                        </a>
                    </div>

                    {/* Tarjeta de información del usuario */}
                    <div className="mb-5">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#0b1f3a] flex items-center justify-center text-[#f59e0b] text-lg font-bold shadow-sm">
                                    {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-base">{usuario.nombre} {usuario.apellido}</p>
                                    <p className="text-xs text-slate-500">{usuario.email}</p>
                                </div>
                            </div>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${ROL_STYLE[usuario.rol]}`}>
                                {ROL_LABEL[usuario.rol]}
                            </div>
                        </div>
                    </div>

                    {/* Errores globales */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-5">
                            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-7 h-7 bg-red-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertCircle size={14} className="text-red-600" />
                                    </div>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {Object.values(errors).map((e, i) => (
                                            <li key={i} className="flex items-center gap-1.5">
                                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                                {e}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Formulario */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
                        <div className="bg-[#0b1f3a] px-5 py-4">
                            <h2 className="text-white text-base font-medium flex items-center gap-2">
                                <UserPen size={18} className="text-[#f59e0b]" />
                                Información del usuario
                            </h2>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-5">
                            {/* Cédula (no editable) y Rol */}
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <IdCard size={14} className="text-slate-400" />
                                        Cédula
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={usuario.cedula}
                                            disabled
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                                            No editable
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="rol" className={labelClass}>
                                        <UserCheck size={14} className="text-slate-400" />
                                        Rol
                                    </label>
                                    <select
                                        id="rol"
                                        value={data.rol}
                                        onChange={e => setData('rol', e.target.value)}
                                        className={inputClass('rol')}
                                    >
                                        <option value="A">Administrador</option>
                                        <option value="P">Profesor</option>
                                        <option value="E">Estudiante</option>
                                    </select>
                                </div>
                            </div>

                            {/* Nombre y Apellido */}
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="nombre" className={labelClass}>
                                        <UserRound size={14} className="text-slate-400" />
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={data.nombre}
                                        onChange={e => setData('nombre', e.target.value)}
                                        className={inputClass('nombre')}
                                        placeholder="Juan"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="apellido" className={labelClass}>
                                        <UserRound size={14} className="text-slate-400" />
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        value={data.apellido}
                                        onChange={e => setData('apellido', e.target.value)}
                                        className={inputClass('apellido')}
                                        placeholder="Pérez"
                                    />
                                </div>
                            </div>

                            {/* Fecha de nacimiento y Email */}
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="fecha_nacimiento" className={labelClass}>
                                        <CalendarDays size={14} className="text-slate-400" />
                                        Fecha de nacimiento
                                    </label>
                                    <input
                                        type="date"
                                        id="fecha_nacimiento"
                                        value={data.fecha_nacimiento}
                                        onChange={e => setData('fecha_nacimiento', e.target.value)}
                                        className={inputClass('fecha_nacimiento')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        <Mail size={14} className="text-slate-400" />
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={inputClass('email')}
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>
                            </div>

                            {/* Contraseña (opcional) */}
                            <div>
                                <label htmlFor="password" className={labelClass}>
                                    <KeyRound size={14} className="text-slate-400" />
                                    Nueva contraseña
                                    <span className="text-xs text-slate-400 font-normal ml-1">(opcional)</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={inputClass('password')}
                                    placeholder="Dejar vacío para no cambiar"
                                />
                            </div>

                            {/* Botones de acción */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <a
                                    href="/usuarios"
                                    className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                                >
                                    Cancelar
                                </a>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 rounded-xl bg-[#f59e0b] text-white text-sm font-medium hover:bg-[#e68a00] hover:shadow-md transition-all border-0 cursor-pointer flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Guardando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            <span>Guardar cambios</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Info adicional */}
                    <div className="mt-5 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-3">
                            <Sparkles size={18} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-700">Información importante</p>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    La cédula no puede ser modificada. Si necesitas cambiar la contraseña, 
                                    escribe una nueva en el campo correspondiente. De lo contrario, déjalo vacío.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}