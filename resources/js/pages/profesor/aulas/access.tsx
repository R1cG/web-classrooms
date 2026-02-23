import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    BookOpen, 
    CalendarRange, 
    Clock, 
    Edit3, 
    FileText, 
    GraduationCap,
    LayoutDashboard,
    Plus,
    Sparkles,
    Trash2,
    Users,
    AlertCircle,
    ChevronLeft,
    CalendarDays
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { postsCreate, postsEdit, postsDestroy, evaluacionesCreate, evaluacionesEdit, evaluacionesDestroy } from '@/routes';

interface Item {
    id: number;
    tipo: 'post' | 'evaluacion';
    contenido?: string;
    fecha_limite?: string;
    created_at: string;
}

interface Props {
    aula: {
        id: number;
        semestre: string;
        materia_nombre: string;
        materia_codigo: string;
        profesor?: {
            nombre: string;
            apellido: string;
        };
        cantidad_estudiantes?: number;
    };
    timeline: Item[];
}

export default function AulaAccess({ aula, timeline }: Props) {
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDelete = async (item: Item) => {
        if (!confirm('¿Estás seguro que deseas eliminar esto?')) return;
        if (!confirm('Esta acción no se puede deshacer. Confirmar nuevamente.')) return;

        setLoadingDelete(item.id);

        try {
            if (item.tipo === 'post') {
                await router.delete(postsDestroy(item.id));
            } else {
                await router.delete(evaluacionesDestroy(item.id));
            }
        } finally {
            setLoadingDelete(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout>
            <Head title={`${aula.materia_nombre} — UDO`} />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-5xl mx-auto">

                    {/* Botón volver */}
                    <a
                        href="/mis-aulas"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs"
                    >
                        <ChevronLeft size={14} className="text-slate-600" />
                        <span className="text-slate-600">Volver a Mis Aulas</span>
                    </a>

                    {/* Header con información del aula */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden mb-6">
                        <div className="bg-[#0b1f3a] px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                    <LayoutDashboard size={22} className="text-[#f59e0b]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {aula.materia_nombre}
                                    </h1>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full">
                                            {aula.materia_codigo}
                                        </span>
                                        <span className="text-xs text-slate-300 flex items-center gap-1">
                                            <CalendarRange size={12} />
                                            {aula.semestre}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información adicional del aula */}
                        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-4">
                            {aula.profesor && (
                                <div className="flex items-center gap-2">
                                    <GraduationCap size={14} className="text-slate-400" />
                                    <span className="text-xs text-slate-600">
                                        Prof. {aula.profesor.nombre} {aula.profesor.apellido}
                                    </span>
                                </div>
                            )}
                            {aula.cantidad_estudiantes !== undefined && (
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-slate-400" />
                                    <span className="text-xs text-slate-600">
                                        {aula.cantidad_estudiantes} estudiantes
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Acciones rápidas */}
                        <div className="px-6 py-4 bg-slate-50 flex flex-wrap gap-3">
                            <button
                                onClick={() => router.get(evaluacionesCreate(aula.id))}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} />
                                Crear Evaluación
                            </button>
                            <button
                                onClick={() => router.get(postsCreate(aula.id))}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} />
                                Crear Post
                            </button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                        {timeline.length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-md flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                                    <FileText size={32} className="text-slate-400" />
                                </div>
                                <p className="text-slate-600 text-lg font-medium">
                                    No hay contenido en el aula
                                </p>
                                <p className="text-slate-400 text-sm max-w-md text-center">
                                    Comienza creando un post o una evaluación para tus estudiantes.
                                </p>
                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => router.get(evaluacionesCreate(aula.id))}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Crear Evaluación
                                    </button>
                                    <button
                                        onClick={() => router.get(postsCreate(aula.id))}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Crear Post
                                    </button>
                                </div>
                            </div>
                        ) : (
                            timeline.map((item, index) => (
                                <div
                                    key={`${item.tipo}-${item.id}`}
                                    className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    {/* Header del item */}
                                    <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                                                ${item.tipo === 'post' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                                                {item.tipo === 'post' ? (
                                                    <FileText size={14} className="text-emerald-600" />
                                                ) : (
                                                    <CalendarDays size={14} className="text-blue-600" />
                                                )}
                                            </div>
                                            <div>
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                                                    ${item.tipo === 'post'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.tipo === 'post' ? 'Post' : 'Evaluación'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    item.tipo === 'post'
                                                        ? router.get(postsEdit(item.id))
                                                        : router.get(evaluacionesEdit(item.id))
                                                }
                                                className="w-8 h-8 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 transition-colors"
                                                title="Editar"
                                            >
                                                <Edit3 size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                disabled={loadingDelete === item.id}
                                                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-600 transition-colors disabled:opacity-50"
                                                title="Eliminar"
                                            >
                                                {loadingDelete === item.id ? (
                                                    <div className="w-3 h-3 border border-red-600 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 size={12} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-5">
                                        {item.tipo === 'post' ? (
                                            <div className="space-y-3">
                                                <p className="text-slate-800 text-base leading-relaxed">
                                                    {item.contenido}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <p className="text-slate-800 font-medium text-base">
                                                    {item.contenido}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                                    <Clock size={14} className="text-[#f59e0b]" />
                                                    <span className="text-slate-600">
                                                        Fecha límite: <span className="font-semibold text-[#f59e0b]">
                                                            {formatDate(item.fecha_limite || '')}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fecha de publicación */}
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                                            <Clock size={12} className="text-slate-400" />
                                            <p className="text-[10px] text-slate-400">
                                                Publicado el {formatDate(item.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer con información */}
                    {timeline.length > 0 && (
                        <div className="mt-6 px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Total: <span className="font-semibold text-[#0b1f3a]">{timeline.length}</span> elemento{timeline.length !== 1 ? 's' : ''} en el aula
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Sparkles size={12} className="text-[#f59e0b]" />
                                <span>Timeline del aula</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}