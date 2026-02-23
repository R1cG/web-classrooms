import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    LayoutDashboard, 
    BookOpen, 
    CalendarRange, 
    Users,
    GraduationCap,
    Sparkles,
    ChevronRight,
    Search,
    AlertCircle
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { aulasAccess } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mis Aulas', href: '/mis-aulas' },
];

interface Materia {
    nombre: string;
    codigo: string;
}

interface Profesor {
    nombre: string;
    apellido: string;
}

interface Aula {
    id: number;
    semestre: string;
    materia_codigo: string;
    materia: Materia;
    profesor?: Profesor;
    cantidad_estudiantes: number;
    ultima_actividad?: string;
}

interface PageProps {
    aulas: Aula[];
    userRol?: string;
}

export default function Index() {
    const { aulas, userRol } = usePage().props as unknown as PageProps;
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filteredAulas = aulas.filter(aula => {
        const searchTerm = search.toLowerCase();
        return (
            aula.semestre.toLowerCase().includes(searchTerm) ||
            aula.materia.nombre.toLowerCase().includes(searchTerm) ||
            aula.materia.codigo.toLowerCase().includes(searchTerm) ||
            aula.profesor?.nombre.toLowerCase().includes(searchTerm) ||
            aula.profesor?.apellido.toLowerCase().includes(searchTerm)
        );
    });

    const handleDoubleClick = (id: number) => {
        router.get(aulasAccess(id).url);
    };

    const formatActividad = (fecha?: string) => {
        if (!fecha) return 'Sin actividad reciente';
        const days = Math.floor((new Date().getTime() - new Date(fecha).getTime()) / (1000 * 3600 * 24));
        if (days === 0) return 'Hoy';
        if (days === 1) return 'Ayer';
        if (days < 7) return `Hace ${days} días`;
        return `Hace ${Math.floor(days / 7)} semanas`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis Aulas — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">

                    {/* Header mejorado */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                                <LayoutDashboard size={24} className="text-[#f59e0b]" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Mis Aulas
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    {filteredAulas.length} de {aulas.length} aula{aulas.length !== 1 ? 's' : ''} disponible{aulas.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Badge de rol si existe */}
                        {userRol && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <GraduationCap size={16} className="text-[#f59e0b]" />
                                <span className="text-sm text-slate-600">
                                    {userRol === 'E' ? 'Estudiante' : userRol === 'P' ? 'Profesor' : 'Administrador'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Barra de búsqueda */}
                    {aulas.length > 0 && (
                        <div className="mb-6">
                            <div className="relative max-w-md">
                                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por materia, código o semestre..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#f59e0b] focus:shadow-md transition-all duration-300 text-sm text-slate-900 placeholder:text-slate-400"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {!aulas?.length ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                                <LayoutDashboard size={32} className="text-slate-400" />
                            </div>
                            <p className="text-slate-600 text-lg font-medium">
                                No tienes aulas asignadas
                            </p>
                            <p className="text-slate-400 text-sm max-w-md text-center">
                                {userRol === 'E' 
                                    ? 'Cuando un administrador te inscriba en un aula, aparecerá aquí.'
                                    : userRol === 'P'
                                    ? 'Cuando te asignen como profesor de un aula, aparecerá aquí.'
                                    : 'No hay aulas disponibles en este momento.'}
                            </p>
                        </div>
                    ) : filteredAulas.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                                <Search size={32} className="text-slate-400" />
                            </div>
                            <p className="text-slate-600 text-lg font-medium">
                                No se encontraron aulas
                            </p>
                            <p className="text-slate-400 text-sm">
                                Intenta con otros términos de búsqueda
                            </p>
                            <button
                                onClick={() => setSearch('')}
                                className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAulas.map((aula) => (
                                    <div
                                        key={aula.id}
                                        onDoubleClick={() => handleDoubleClick(aula.id)}
                                        onMouseEnter={() => setHoveredId(aula.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className="cursor-pointer bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                        title="Doble clic para acceder al aula"
                                    >
                                        {/* Header con indicador de hover */}
                                        <div className="bg-[#0b1f3a] px-5 py-4 flex justify-between items-center">
                                            <div className="flex items-center gap-2.5">
                                                <CalendarRange size={16} className="text-[#f59e0b]" />
                                                <span className="text-white text-sm font-semibold">
                                                    {aula.semestre}
                                                </span>
                                            </div>
                                            {hoveredId === aula.id && (
                                                <ChevronRight size={18} className="text-[#f59e0b] animate-pulse" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 space-y-4">

                                            {/* Materia con código destacado */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <BookOpen size={16} className="text-[#f59e0b]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-slate-500 mb-0.5">Materia</p>
                                                    <p className="font-semibold text-slate-800 text-base truncate">
                                                        {aula.materia?.nombre ?? '—'}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                                                        {aula.materia_codigo}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Profesor (si está disponible) */}
                                            {aula.profesor && (
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <GraduationCap size={16} className="text-[#f59e0b]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-slate-500 mb-0.5">Profesor</p>
                                                        <p className="font-medium text-slate-700 text-sm truncate">
                                                            {aula.profesor.nombre} {aula.profesor.apellido}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Estadísticas y actividad */}
                                            <div className="pt-3 border-t border-slate-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Users size={14} className="text-slate-400" />
                                                        <span className="text-sm text-slate-600">
                                                            <span className="font-semibold text-[#f59e0b]">
                                                                {aula.cantidad_estudiantes || 0}
                                                            </span> estudiantes
                                                        </span>
                                                    </div>
                                                    {aula.ultima_actividad && (
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-[10px] text-slate-400">
                                                                {formatActividad(aula.ultima_actividad)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Overlay en hover */}
                                        {hoveredId === aula.id && (
                                            <div className="absolute inset-0 bg-[#0b1f3a]/5 pointer-events-none" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Footer mejorado */}
                            <div className="mt-6 px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-slate-500">
                                        Mostrando <span className="font-semibold text-[#0b1f3a]">{filteredAulas.length}</span> de{' '}
                                        <span className="font-semibold text-[#0b1f3a]">{aulas.length}</span> aulas
                                    </p>
                                    <Sparkles size={14} className="text-[#f59e0b]" />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <AlertCircle size={12} />
                                    <span>Doble clic en cualquier tarjeta para acceder al aula</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}