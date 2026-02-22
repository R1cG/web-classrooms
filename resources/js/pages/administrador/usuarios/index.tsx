import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usuariosCreate, usuariosDestroy, usuariosEdit } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    CircleCheck,
    IdCard,
    Mail,
    Pencil,
    Shield,
    Trash2,
    UserPlus,
    Users,
    CalendarDays,
    UserRound,
    Search
} from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usuarios', href: '/usuarios' },
];

interface User {
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    fecha_nacimiento?: string;
}

interface PageProps {
    flash: { message?: string };
    usuarios: User[];
}

const ROL_LABEL: Record<string, string> = {
    A: 'Administrador',
    P: 'Profesor',
    E: 'Estudiante',
};

const ROL_STYLE: Record<string, string> = {
    A: 'bg-purple-100 text-purple-700 border border-purple-200',
    P: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    E: 'bg-blue-100 text-blue-700 border border-blue-200',
};

const ROL_ICON: Record<string, React.ReactElement> = {
    A: <Shield size={12} className="text-purple-600" />,
    P: <UserRound size={12} className="text-emerald-600" />,
    E: <Users size={12} className="text-blue-600" />,
};

export default function Index() {
    const { usuarios, flash } = usePage().props as unknown as PageProps;
    const { processing, delete: destroy } = useForm();
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDelete = (cedula: string, nombre: string) => {
        if (confirm(`¿Eliminar al usuario ${nombre} con cédula ${cedula}?`)) {
            destroy(usuariosDestroy(cedula).url);
        }
    };

    const formatDate = (date?: string) => {
        if (!date) return '—';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Filtrar usuarios por búsqueda
    const filteredUsuarios = usuarios.filter(usuario => {
        const searchTerm = search.toLowerCase();
        return (
            usuario.cedula.toLowerCase().includes(searchTerm) ||
            usuario.nombre.toLowerCase().includes(searchTerm) ||
            usuario.apellido.toLowerCase().includes(searchTerm) ||
            usuario.email.toLowerCase().includes(searchTerm) ||
            `${usuario.nombre} ${usuario.apellido}`.toLowerCase().includes(searchTerm) ||
            ROL_LABEL[usuario.rol]?.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    {/* Header simple */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                                <Users size={22} className="text-[#f59e0b]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Gestión de usuarios
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''} registrado{usuarios.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        <Link href={usuariosCreate()}>
                            <Button className="h-10 px-5 bg-[#0b1f3a] hover:bg-[#1a3a5f] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors border-0 cursor-pointer shadow-sm hover:shadow">
                                <UserPlus size={16} />
                                Crear usuario
                            </Button>
                        </Link>
                    </div>

                    {/* Flash message */}
                    {flash.message && (
                        <div className="mb-5">
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-5 py-3 shadow-sm">
                                <CircleCheck size={18} className="flex-shrink-0" />
                                <span>{flash.message}</span>
                            </div>
                        </div>
                    )}

                    {/* Barra de búsqueda */}
                    <div className="mb-5">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por cédula, nombre, correo o rol..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#f59e0b] focus:shadow-md transition-all duration-300 text-sm text-slate-900 placeholder:text-slate-400"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabla de usuarios */}
                    {!filteredUsuarios?.length ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
                                {search ? <Search size={32} className="text-slate-300" /> : <Users size={32} className="text-slate-300" />}
                            </div>
                            <p className="text-slate-500 text-base font-medium">
                                {search ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                            </p>
                            <p className="text-slate-400 text-sm">
                                {search 
                                    ? 'Intenta con otros términos de búsqueda' 
                                    : 'Crea el primer usuario con el botón de arriba.'}
                            </p>
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
                                >
                                    Limpiar búsqueda
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#0b1f3a]">
                                            <th className="px-5 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                                    <IdCard size={12} /> Cédula
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider">
                                                    Usuario
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                                    <Mail size={12} /> Correo
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                                    <Shield size={12} /> Rol
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                                    <CalendarDays size={12} /> Nacimiento
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 text-right">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider">
                                                    Acciones
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUsuarios.map((usuario, index) => (
                                            <tr 
                                                key={usuario.cedula} 
                                                className={`hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                                            >
                                                {/* Cédula */}
                                                <td className="px-5 py-4">
                                                    <span className="font-mono text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                                                        {usuario.cedula}
                                                    </span>
                                                </td>

                                                {/* Nombre completo con avatar */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-[#0b1f3a] flex items-center justify-center text-[#f59e0b] text-sm font-bold shadow-sm">
                                                            {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {usuario.nombre} {usuario.apellido}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                                                            <Mail size={12} className="text-[#f59e0b]" />
                                                        </div>
                                                        <span className="text-slate-600 text-sm">{usuario.email}</span>
                                                    </div>
                                                </td>

                                                {/* Rol con badge */}
                                                <td className="px-5 py-4">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${ROL_STYLE[usuario.rol]}`}>
                                                        {ROL_ICON[usuario.rol]}
                                                        {ROL_LABEL[usuario.rol]}
                                                    </div>
                                                </td>

                                                {/* Fecha de nacimiento */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                                                            <CalendarDays size={12} className="text-[#f59e0b]" />
                                                        </div>
                                                        <span className="text-slate-600 text-sm">
                                                            {formatDate(usuario.fecha_nacimiento)}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Acciones */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={usuariosEdit(usuario.cedula).url}>
                                                            <button
                                                                disabled={processing}
                                                                className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 transition-colors disabled:opacity-50"
                                                                title="Editar usuario"
                                                            >
                                                                <Pencil size={14} />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            disabled={processing}
                                                            onClick={() => handleDelete(usuario.cedula, usuario.nombre)}
                                                            className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-600 transition-colors disabled:opacity-50"
                                                            title="Eliminar usuario"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer con total y resultados */}
                            <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Mostrando <span className="font-semibold text-[#0b1f3a]">{filteredUsuarios.length}</span> de{' '}
                                    <span className="font-semibold text-[#0b1f3a]">{usuarios.length}</span> usuario{usuarios.length !== 1 ? 's' : ''}
                                </p>
                                <p className="text-xs text-slate-400">UDO · Aulas Virtuales</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}