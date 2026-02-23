import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    LayoutDashboard, 
    BookOpen, 
    CalendarRange, 
    User 
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

interface Profesor {
    nombre: string;
    apellido: string;
    cedula: string;
}

interface Aula {
    id: number;
    semestre: string;
    materia_codigo: string;
    materia: Materia;
    profesor: Profesor;
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
                            <h1 className="text-2xl font-bold text-[#0b1f3a]">
                                Mis Aulas
                            </h1>
                            <p className="text-sm text-slate-500">
                                {aulas?.length ?? 0} aula{(aulas?.length ?? 0) !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    {!aulas?.length ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <LayoutDashboard size={32} className="text-slate-300" />
                            <p className="text-slate-500 text-base font-medium">
                                No estás inscrito en ninguna aula
                            </p>
                        </div>
                    ) : (
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

                                        {/* Profesor */}
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                                <User size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Profesor</p>
                                                <p className="font-semibold text-slate-800 text-sm">
                                                    {aula.profesor
                                                        ? `${aula.profesor.nombre} ${aula.profesor.apellido}`
                                                        : '—'}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    C.I: {aula.profesor?.cedula ?? '—'}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}