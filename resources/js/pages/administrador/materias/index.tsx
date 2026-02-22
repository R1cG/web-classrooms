import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { materiasCreate, materiasDestroy, materiasEdit } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { 
    CircleCheck, Pencil, Trash2, BookOpen, Plus, 
    Sparkles, Search, ArrowLeft 
} from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Materias',
        href: '/materias',
    },
];

interface Materia {
    codigo: string;
    nombre: string;
}

interface PageProps {
    flash: {
        message?: string
    }
    materias: Materia[]
}

export default function Index() {
    const { materias, flash } = usePage().props as unknown as PageProps;
    const { processing, delete: destroy } = useForm();
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDelete = (codigo: string, nombre: string) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la materia ${nombre} con código ${codigo}?`)) {
            destroy(materiasDestroy(codigo).url);
        }
    };

    // Filtrar materias por búsqueda
    const filteredMaterias = materias.filter(materia => {
        const searchTerm = search.toLowerCase();
        return (
            materia.codigo.toLowerCase().includes(searchTerm) ||
            materia.nombre.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Materias — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-5xl mx-auto">
                    {/* Header simple */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                                <BookOpen size={22} className="text-[#f59e0b]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Gestión de materias
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    {materias.length} materia{materias.length !== 1 ? 's' : ''} registrada{materias.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        <Link href={materiasCreate()}>
                            <Button className="h-10 px-5 bg-[#0b1f3a] hover:bg-[#1a3a5f] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors border-0 cursor-pointer shadow-sm hover:shadow">
                                <Plus size={16} />
                                Crear materia
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
                                placeholder="Buscar por código o nombre de materia..."
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

                    {/* Tabla de materias */}
                    {!filteredMaterias?.length ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center">
                                {search ? <Search size={32} className="text-slate-300" /> : <BookOpen size={32} className="text-slate-300" />}
                            </div>
                            <p className="text-slate-500 text-base font-medium">
                                {search ? 'No se encontraron materias' : 'No hay materias registradas'}
                            </p>
                            <p className="text-slate-400 text-sm">
                                {search 
                                    ? 'Intenta con otros términos de búsqueda' 
                                    : 'Crea la primera materia con el botón de arriba.'}
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
                                            <th className="px-6 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                                                    <BookOpen size={12} /> Código
                                                </span>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider">
                                                    Nombre de la materia
                                                </span>
                                            </th>
                                            <th className="px-6 py-4 text-right">
                                                <span className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider">
                                                    Acciones
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredMaterias.map((materia, index) => (
                                            <tr 
                                                key={materia.codigo} 
                                                className={`hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                                            >
                                                {/* Código */}
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                                                        {materia.codigo}
                                                    </span>
                                                </td>

                                                {/* Nombre */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                                                            <BookOpen size={16} className="text-[#f59e0b]" />
                                                        </div>
                                                        <span className="font-medium text-slate-800">
                                                            {materia.nombre}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Acciones */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={materiasEdit(materia.codigo).url}>
                                                            <button
                                                                disabled={processing}
                                                                className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 transition-colors disabled:opacity-50"
                                                                title="Editar materia"
                                                            >
                                                                <Pencil size={14} />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            disabled={processing}
                                                            onClick={() => handleDelete(materia.codigo, materia.nombre)}
                                                            className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-600 transition-colors disabled:opacity-50"
                                                            title="Eliminar materia"
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
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Mostrando <span className="font-semibold text-[#0b1f3a]">{filteredMaterias.length}</span> de{' '}
                                    <span className="font-semibold text-[#0b1f3a]">{materias.length}</span> materia{materias.length !== 1 ? 's' : ''}
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