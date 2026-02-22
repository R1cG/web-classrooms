import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import {
    AlertCircle, BookOpen, CalendarRange, Check,
    GraduationCap, LayoutDashboard, Save, Search, Users,
    Sparkles, UserCheck, ArrowLeft
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Aulas', href: '/aulas' },
    { title: 'Editar Aula', href: '#' },
];

interface User {
    cedula: string;
    nombre: string;
    apellido: string;
}

interface AulaData {
    id: number;
    semestre: string;
    materia: string;
    profesor: string;
}

interface PageProps {
    aula: AulaData;
    estudiantes: User[];
    estudiantesInscritos: string[];
}

export default function Edit() {
    const { aula, estudiantes, estudiantesInscritos } = usePage().props as unknown as PageProps;

    const { data, setData, put, processing, errors } = useForm({
        estudiantes: estudiantesInscritos || [],
    });

    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filtered = estudiantes.filter(s =>
        `${s.nombre} ${s.apellido} ${s.cedula}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/aulas/${aula.id}`);
    };

    const toggleEstudiante = (cedula: string, checked: boolean) => {
        setData('estudiantes', checked
            ? [...data.estudiantes, cedula]
            : data.estudiantes.filter(c => c !== cedula)
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Aula — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="relative mb-8">
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-[#0b1f3a] rounded-2xl flex items-center justify-center shadow-md">
                                        <LayoutDashboard size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-3xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            Editar aula
                                        </h1>
                                        <Sparkles size={20} className="text-[#f59e0b]" />
                                    </div>
                                    <p className="text-slate-500 text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                        Modifica los estudiantes inscritos en el aula
                                    </p>
                                </div>
                                <a
                                    href="/aulas"
                                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors"
                                >
                                    <ArrowLeft size={16} className="text-slate-600" />
                                    <span className="text-sm font-medium text-slate-600">Volver</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Info del aula (read only) */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-[#0b1f3a] px-6 py-3">
                                <h2 className="text-white font-medium flex items-center gap-2">
                                    <LayoutDashboard size={16} />
                                    Información del aula
                                </h2>
                            </div>
                            <div className="p-6 grid md:grid-cols-3 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                                        <CalendarRange size={14} className="text-[#f59e0b]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Semestre</p>
                                        <p className="font-semibold text-[#0b1f3a]">{aula.semestre}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                                        <BookOpen size={14} className="text-[#f59e0b]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Materia</p>
                                        <p className="font-semibold text-[#0b1f3a]">{aula.materia}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                                        <GraduationCap size={14} className="text-[#f59e0b]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Profesor</p>
                                        <p className="font-semibold text-[#0b1f3a]">{aula.profesor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Errores */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 animate-slide-down">
                            <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 shadow-lg">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-red-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <AlertCircle size={16} className="text-red-600" />
                                    </div>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {Object.values(errors).map((e, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                                {e}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Formulario de estudiantes */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-[#0b1f3a] px-6 py-3 flex justify-between items-center">
                                <h2 className="text-white font-medium flex items-center gap-2">
                                    <Users size={16} />
                                    Estudiantes inscritos
                                </h2>
                                <span className="bg-amber-100 text-[#f59e0b] text-xs font-medium px-2.5 py-1 rounded-lg">
                                    {data.estudiantes.length} seleccionados
                                </span>
                            </div>

                            <div className="p-6">
                                {/* Buscador */}
                                <div className="group relative mb-4">
                                    <div className="relative">
                                        <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#f59e0b] transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Buscar estudiante por nombre o cédula..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-[#f59e0b] focus:shadow-lg transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>

                                {/* Lista de estudiantes */}
                                <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
                                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                                        {filtered.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                    <Users size={24} className="text-slate-400" />
                                                </div>
                                                <p className="text-slate-500">No se encontraron estudiantes</p>
                                            </div>
                                        ) : (
                                            filtered.map((s, index) => {
                                                const checked = data.estudiantes.includes(s.cedula);
                                                return (
                                                    <label
                                                        key={s.cedula}
                                                        style={{ animationDelay: `${index * 30}ms` }}
                                                        className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all duration-200 animate-fade-in-up
                                                            ${checked ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                                                    >
                                                        <div className="relative">
                                                            <input
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={e => toggleEstudiante(s.cedula, e.target.checked)}
                                                                className="sr-only"
                                                            />
                                                            <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-200
                                                                ${checked
                                                                    ? 'bg-[#f59e0b] border-[#f59e0b] scale-110'
                                                                    : 'border-slate-300 bg-white'}`}>
                                                                {checked && <Check size={14} className="text-white animate-scale-in" />}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-slate-800">{s.nombre} {s.apellido}</p>
                                                            <p className="text-xs text-slate-500">{s.cedula}</p>
                                                        </div>
                                                        {checked && (
                                                            <span className="text-xs font-medium text-[#f59e0b] bg-amber-100 px-3 py-1 rounded-xl">
                                                                Inscrito
                                                            </span>
                                                        )}
                                                    </label>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-3">
                            <a
                                href="/aulas"
                                className="px-6 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center gap-2"
                            >
                                Cancelar
                            </a>
                            <Button
                                disabled={processing}
                                type="submit"
                                className="px-8 py-3 rounded-xl bg-[#f59e0b] text-white font-medium hover:bg-[#e68a00] hover:shadow-lg transition-all duration-300 flex items-center gap-2 border-0 cursor-pointer"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Guardando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>Actualizar Estudiantes</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Resumen de selección */}
                    {data.estudiantes.length > 0 && (
                        <div className="mt-6 p-5 bg-white rounded-2xl border border-slate-200 animate-slide-up">
                            <p className="text-xs font-medium text-slate-500 mb-3">RESUMEN DE INSCRITOS</p>
                            <div className="flex flex-wrap gap-2">
                                {estudiantes
                                    .filter(s => data.estudiantes.includes(s.cedula))
                                    .slice(0, 5)
                                    .map(s => (
                                        <div key={s.cedula} className="px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200">
                                            <span className="text-xs text-[#f59e0b] font-medium">
                                                {s.nombre} {s.apellido}
                                            </span>
                                        </div>
                                    ))}
                                {data.estudiantes.length > 5 && (
                                    <div className="px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200">
                                        <span className="text-xs text-slate-600 font-medium">
                                            +{data.estudiantes.length - 5} más
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                    opacity: 0;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out forwards;
                }
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out forwards;
                }
            `}</style>
        </AppLayout>
    );
}