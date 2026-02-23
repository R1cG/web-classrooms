import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    LayoutDashboard, 
    BookOpen, 
    CalendarRange, 
    Users 
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { aulasAccess } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mis Aulas', href: '/aulas' },
];

interface Materia {
    nombre: string;
    codigo: string;
}

interface Aula {
    id: number;
    semestre: string;
    materia_codigo: string;
    materia: Materia;
    cantidad_estudiantes: number;
}

interface PageProps {
    aulas: Aula[];
}

export default function Index() {
    const { aulas } = usePage().props as unknown as PageProps;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDoubleClick = (id: number) => {
        router.get(aulasAccess(id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis Aulas — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                            <LayoutDashboard size={20} className="text-[#f59e0b]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Mis Aulas
                            </h1>
                            <p className="text-sm text-slate-500">
                                {aulas?.length ?? 0} aula{(aulas?.length ?? 0) !== 1 ? 's' : ''} asignada{(aulas?.length ?? 0) !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    {!aulas?.length ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <LayoutDashboard size={32} className="text-slate-300" />
                            <p className="text-slate-500 text-base font-medium">
                                No tienes aulas asignadas
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {aulas.map((aula) => (
                                    <div
                                        key={aula.id}
                                        onDoubleClick={() => handleDoubleClick(aula.id)}
                                        className="cursor-pointer bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
                                        title="Doble clic para acceder al aula"
                                    >
                                        {/* Header */}
                                        <div className="bg-[#0b1f3a] px-5 py-4 flex justify-between items-center">
                                            <div className="flex items-center gap-2.5">
                                                <CalendarRange size={16} className="text-[#f59e0b]" />
                                                <span className="text-white text-sm font-semibold">
                                                    {aula.semestre}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 space-y-4">

                                            {/* Materia */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                                                    <BookOpen size={16} className="text-[#f59e0b]" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500">Materia</p>
                                                    <p className="font-semibold text-slate-800 text-base">
                                                        {aula.materia?.nombre ?? '—'}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-mono">
                                                        {aula.materia_codigo}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Cantidad estudiantes */}
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <Users size={14} className="text-slate-400" />
                                                    <span className="text-sm text-slate-600">
                                                        <span className="font-semibold text-[#f59e0b]">
                                                            {aula.cantidad_estudiantes || 0}
                                                        </span> estudiantes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Total: <span className="font-semibold text-[#0b1f3a] text-base">
                                        {aulas.length}
                                    </span> aula{aulas.length !== 1 ? 's' : ''}
                                </p>
                                <p className="text-xs text-slate-400">
                                    Doble clic en una tarjeta para acceder
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}