import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { 
    CircleCheck, LayoutDashboard, Pencil, Plus, Trash2, 
    Users, BookOpen, CalendarRange, GraduationCap, Sparkles,
    UserCheck
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { aulasCreate, aulasEdit, aulasDestroy } from '@/routes';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Aulas', href: '/aulas' },
];

interface Profesor {
    nombre: string;
    apellido: string;
    cedula: string;
}

interface Materia {
    nombre: string;
    codigo: string;
}

interface Aula {
    id: number;
    semestre: string;
    profesor_cedula: string;
    materia_codigo: string;
    profesor: Profesor;
    materia: Materia;
    cantidad_estudiantes: number;
}

interface PageProps {
    flash: { message?: string };
    aulas: Aula[];
}

export default function Index() {
    const { aulas, flash } = usePage().props as unknown as PageProps;
    const { processing, delete: destroy } = useForm();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDelete = (id: number, nombreProfesor: string) => {
        if (confirm(`¿Eliminar el aula del profesor ${nombreProfesor}?`)) {
            destroy(aulasDestroy(id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aulas — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    {/* Header simple */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                                <LayoutDashboard size={20} className="text-[#f59e0b]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Gestión de aulas
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    {aulas?.length ?? 0} aula{(aulas?.length ?? 0) !== 1 ? 's' : ''} registrada{(aulas?.length ?? 0) !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        <Link href={aulasCreate()}>
                            <Button className="h-10 px-5 bg-[#0b1f3a] hover:bg-[#1a3a5f] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors border-0 cursor-pointer shadow-sm hover:shadow">
                                <Plus size={16} />
                                Crear aula
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

                    {/* Grid de aulas */}
                    {!aulas?.length ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
                                <LayoutDashboard size={32} className="text-slate-300" />
                            </div>
                            <p className="text-slate-500 text-base font-medium">No hay aulas registradas</p>
                            <p className="text-slate-400 text-sm">Crea la primera aula con el botón de arriba.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {aulas.map((aula) => (
                                    <div
                                        key={aula.id}
                                        className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* Header de la tarjeta */}
                                        <div className="bg-[#0b1f3a] px-5 py-4 flex justify-between items-center">
                                            <div className="flex items-center gap-2.5">
                                                <CalendarRange size={16} className="text-[#f59e0b]" />
                                                <span className="text-white text-sm font-semibold">{aula.semestre}</span>
                                            </div>
                                            <div className="bg-amber-500/20 px-3 py-1 rounded-full">
                                                <span className="text-xs font-medium text-[#f59e0b]">Activo</span>
                                            </div>
                                        </div>

                                        {/* Contenido de la tarjeta */}
                                        <div className="p-5 space-y-4">
                                            {/* Materia */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <BookOpen size={16} className="text-[#f59e0b]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-slate-500 mb-0.5">Materia</p>
                                                    <p className="font-semibold text-slate-800 text-base truncate">
                                                        {aula.materia?.nombre ?? '—'}
                                                    </p>
                                                    {aula.materia?.codigo && (
                                                        <p className="text-xs text-slate-400 font-mono mt-0.5">{aula.materia.codigo}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Profesor */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <GraduationCap size={16} className="text-[#f59e0b]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-slate-500 mb-0.5">Profesor</p>
                                                    <div className="flex items-center gap-2.5 mb-1">
                                                        <div className="w-7 h-7 rounded-full bg-[#0b1f3a] flex items-center justify-center text-[#f59e0b] text-xs font-bold">
                                                            {aula.profesor?.nombre?.charAt(0)}{aula.profesor?.apellido?.charAt(0)}
                                                        </div>
                                                        <span className="font-medium text-slate-700 text-sm truncate">
                                                            {aula.profesor?.nombre} {aula.profesor?.apellido}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 font-mono">
                                                        {aula.profesor?.cedula ?? '—'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Estadísticas */}
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <Users size={14} className="text-slate-400" />
                                                    <span className="text-sm text-slate-600">
                                                        <span className="font-semibold text-[#f59e0b]">{aula.cantidad_estudiantes || 0}</span> estudiantes
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <UserCheck size={14} className="text-slate-300" />
                                                    <span className="text-xs text-slate-400">inscritos</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer con acciones */}
                                        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                                            <Link href={aulasEdit(aula.id).url}>
                                                <button
                                                    disabled={processing}
                                                    className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 transition-colors disabled:opacity-50"
                                                    title="Editar aula"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                            </Link>
                                            <button
                                                disabled={processing}
                                                onClick={() => handleDelete(aula.id, aula.profesor?.nombre ?? '')}
                                                className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-600 transition-colors disabled:opacity-50"
                                                title="Eliminar aula"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer con total */}
                            <div className="mt-6 px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Total: <span className="font-semibold text-[#0b1f3a] text-base">{aulas.length}</span> aula{aulas.length !== 1 ? 's' : ''}
                                </p>
                                <p className="text-xs text-slate-400">UDO · Aulas Virtuales</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}