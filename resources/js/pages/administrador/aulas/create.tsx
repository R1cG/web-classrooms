import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { aulasStore } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import {
    AlertCircle, BookOpen, CalendarRange, Check,
    ChevronLeft, ChevronRight, GraduationCap,
    LayoutDashboard, Save, Search, UserCheck, Users,
    Sparkles, ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Aulas', href: '/aulas' },
    { title: 'Crear Aula', href: '/aulas/create' },
];

interface User { cedula: string; nombre: string; apellido: string; }
interface Materia { codigo: string; nombre: string; }
interface PageProps { profesores: User[]; estudiantes: User[]; materias: Materia[]; }

const STEPS = [
    { id: 1, label: 'Info del aula', icon: LayoutDashboard },
    { id: 2, label: 'Profesor', icon: UserCheck },
    { id: 3, label: 'Estudiantes', icon: Users },
];

export default function Create() {
    const { profesores, estudiantes, materias } = usePage().props as unknown as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        semestre: '',
        materia_codigo: '',
        profesor_cedula: '',
        estudiantes: [] as string[],
    });

    const [step, setStep] = useState(1);
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filtered = estudiantes.filter(s =>
        `${s.nombre} ${s.apellido} ${s.cedula}`.toLowerCase().includes(search.toLowerCase())
    );

    const toggle = (cedula: string, checked: boolean) =>
        setData('estudiantes', checked
            ? [...data.estudiantes, cedula]
            : data.estudiantes.filter(c => c !== cedula)
        );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(aulasStore.url());
    };

    const selectedMateria = materias.find(m => m.codigo === data.materia_codigo);
    const selectedProfesor = profesores.find(p => p.cedula === data.profesor_cedula);

    const canNext = step === 1
        ? data.semestre.trim() !== '' && data.materia_codigo !== ''
        : step === 2
        ? data.profesor_cedula !== ''
        : true;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Aula — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-4xl mx-auto">
                    {/* Header sin gradientes */}
                    <div className="relative mb-10">
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
                                            Crear nueva aula
                                        </h1>
                                        <Sparkles size={20} className="text-[#f59e0b]" />
                                    </div>
                                    <p className="text-slate-500 text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                        Completa los pasos para configurar el aula
                                    </p>
                                </div>
                                <div className="hidden md:block px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                                    <span className="text-xs font-medium text-[#f59e0b]">Nuevo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stepper mejorado */}
                    <div className="relative mb-12">
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200"></div>
                        <div className="relative flex justify-between">
                            {STEPS.map((s, i) => {
                                const done = step > s.id;
                                const active = step === s.id;
                                const Icon = s.icon;
                                return (
                                    <div key={s.id} className="flex flex-col items-center">
                                        <button
                                            type="button"
                                            onClick={() => done && setStep(s.id)}
                                            className={`group relative transition-all duration-300 ${done ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 transform
                                                ${done ? 'border-[#f59e0b] bg-[#f59e0b] scale-110 shadow-lg' : ''}
                                                ${active ? 'border-[#0b1f3a] bg-white scale-110 shadow-lg' : ''}
                                                ${!done && !active ? 'border-slate-200 bg-white hover:border-[#f59e0b]' : ''}
                                                ${done && 'hover:scale-125'}`}
                                            >
                                                {done ? (
                                                    <Check size={20} className="text-white animate-bounce-small" />
                                                ) : (
                                                    <Icon size={18} className={active ? 'text-[#0b1f3a]' : 'text-slate-400'} />
                                                )}
                                            </div>
                                            <span className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300
                                                ${active ? 'text-[#0b1f3a] scale-110' : done ? 'text-[#f59e0b]' : 'text-slate-400'}`}>
                                                {s.label}
                                            </span>
                                        </button>
                                        {i < STEPS.length - 1 && (
                                            <div className={`absolute hidden md:block transition-all duration-700 delay-300
                                                ${step > s.id ? 'opacity-100' : 'opacity-30'}`}
                                                style={{ left: `${(i + 1) * 33}%`, top: '1.2rem' }}>
                                                <ArrowRight size={16} className={step > s.id ? 'text-[#f59e0b]' : 'text-slate-300'} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Errores con animación */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-8 animate-slide-down">
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

                    {/* STEP 1 - Info del aula */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="group relative">
                                <div className="bg-[#0b1f3a] rounded-3xl p-8 shadow-lg">
                                    <p className="text-amber-200 text-xs mb-2 flex items-center gap-1.5">
                                        <CalendarRange size={12} /> Semestre académico
                                    </p>
                                    <input
                                        type="text"
                                        value={data.semestre}
                                        onChange={e => setData('semestre', e.target.value)}
                                        placeholder="2025-I"
                                        className="w-full bg-transparent text-white text-4xl font-light outline-none border-b-2 border-amber-400/50 focus:border-amber-300 placeholder:text-amber-300/50 transition-all duration-300"
                                    />
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-amber-400/20 rounded-xl px-3 py-1">
                                            <span className="text-xs text-amber-200">Ej: 2025-I, 2024-II</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {materias.map((m, index) => (
                                    <button
                                        key={m.codigo}
                                        type="button"
                                        onClick={() => setData('materia_codigo', m.codigo)}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                        className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-500 animate-fade-in-up
                                            ${data.materia_codigo === m.codigo
                                                ? 'border-[#f59e0b] bg-amber-50 shadow-xl scale-[1.02]'
                                                : 'border-slate-200 bg-white hover:border-[#f59e0b] hover:shadow-lg hover:-translate-y-1'}`}
                                    >
                                        {data.materia_codigo === m.codigo && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#f59e0b] rounded-xl flex items-center justify-center animate-bounce-small">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                                                ${data.materia_codigo === m.codigo
                                                    ? 'bg-[#f59e0b] scale-110'
                                                    : 'bg-slate-100 group-hover:bg-amber-100'}`}>
                                                <BookOpen size={16} className={data.materia_codigo === m.codigo ? 'text-white' : 'text-slate-600'} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{m.nombre}</p>
                                                <p className="text-xs text-slate-500 mt-1">{m.codigo}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2 - Profesor */}
                    {step === 2 && (
                        <div className="space-y-3 animate-fade-in">
                            {profesores.map((p, index) => (
                                <button
                                    key={p.cedula}
                                    type="button"
                                    onClick={() => setData('profesor_cedula', p.cedula)}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    className={`group relative w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 animate-fade-in-up
                                        ${data.profesor_cedula === p.cedula
                                            ? 'border-[#f59e0b] bg-amber-50 shadow-xl scale-[1.01]'
                                            : 'border-slate-200 bg-white hover:border-[#f59e0b] hover:shadow-lg hover:-translate-y-0.5'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                                            ${data.profesor_cedula === p.cedula
                                                ? 'bg-[#f59e0b] scale-110'
                                                : 'bg-slate-100 group-hover:bg-amber-100'}`}>
                                            <GraduationCap size={20} className={data.profesor_cedula === p.cedula ? 'text-white' : 'text-slate-600'} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-800">{p.nombre} {p.apellido}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Cédula: {p.cedula}</p>
                                        </div>
                                        {data.profesor_cedula === p.cedula && (
                                            <div className="w-8 h-8 bg-[#f59e0b] rounded-xl flex items-center justify-center animate-scale-in">
                                                <Check size={16} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* STEP 3 - Estudiantes */}
                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                            <div className="group relative">
                                <div className="relative">
                                    <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#f59e0b] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Buscar estudiante por nombre o cédula..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-[#f59e0b] focus:shadow-lg transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
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
                                                            onChange={e => toggle(s.cedula, e.target.checked)}
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
                                                            Seleccionado
                                                        </span>
                                                    )}
                                                </label>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="bg-slate-50 px-5 py-3 border-t border-slate-200">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-[#f59e0b]">{data.estudiantes.length}</span> estudiantes seleccionados
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Navegación mejorada */}
                    <div className="mt-10 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => setStep(s => s - 1)}
                            disabled={step === 1}
                            className={`group px-6 py-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2
                                ${step === 1
                                    ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                                    : 'border-[#0b1f3a] bg-[#0b1f3a] text-white hover:bg-[#1a3a5f] hover:shadow-lg hover:-translate-x-1'}`}
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Anterior</span>
                        </button>

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={() => setStep(s => s + 1)}
                                disabled={!canNext}
                                className={`group px-8 py-3 rounded-xl bg-[#0b1f3a] text-white font-medium transition-all duration-300 flex items-center gap-2
                                    ${!canNext
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#1a3a5f] hover:shadow-lg hover:scale-105 hover:-translate-y-0.5'}`}
                            >
                                <span>Siguiente</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={processing}
                                className={`group px-8 py-3 rounded-xl bg-[#f59e0b] text-white font-medium transition-all duration-300 flex items-center gap-2
                                    ${processing
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#e68a00] hover:shadow-lg hover:scale-105'}`}
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Guardando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>Crear aula</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Resumen visual de la selección */}
                    {(data.semestre || data.materia_codigo || data.profesor_cedula) && step < 3 && (
                        <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-200 animate-slide-up">
                            <p className="text-xs font-medium text-slate-500 mb-3">RESUMEN DE SELECCIÓN</p>
                            <div className="flex flex-wrap gap-3">
                                {data.semestre && (
                                    <div className="px-4 py-2 bg-[#0b1f3a]/5 rounded-xl border border-[#0b1f3a]/10">
                                        <span className="text-xs text-[#0b1f3a] font-medium">Semestre: {data.semestre}</span>
                                    </div>
                                )}
                                {selectedMateria && (
                                    <div className="px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                                        <span className="text-xs text-[#f59e0b] font-medium">Materia: {selectedMateria.nombre}</span>
                                    </div>
                                )}
                                {selectedProfesor && (
                                    <div className="px-4 py-2 bg-[#0b1f3a]/5 rounded-xl border border-[#0b1f3a]/10">
                                        <span className="text-xs text-[#0b1f3a] font-medium">Profesor: {selectedProfesor.nombre}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes bounce-small {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .animate-bounce-small {
                    animation: bounce-small 1s infinite;
                }
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