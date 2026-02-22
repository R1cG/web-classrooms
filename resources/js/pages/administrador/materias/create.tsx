import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { materiasStore } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { 
    BookOpen, 
    Save, 
    Sparkles, 
    ArrowLeft,
    AlertCircle,
    Hash,
    Type
} from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Materias', href: '/materias' },
    { title: 'Crear Materia', href: '/materias/crear' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        codigo: '',
        nombre: '',
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(materiasStore.url());
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400
        focus:border-[#f59e0b] focus:shadow-md
        ${errors[field as keyof typeof errors] ? 'border-red-300 focus:border-red-400' : 'border-slate-200'}`;

    const labelClass = "text-slate-600 text-sm font-medium flex items-center gap-1.5 mb-1.5";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Materia — UDO" />

            <div className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-2xl mx-auto">
                    {/* Header simple */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center shadow-md">
                                <BookOpen size={22} className="text-[#f59e0b]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#0b1f3a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Crear nueva materia
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    Registra una nueva materia en el sistema
                                </p>
                            </div>
                        </div>
                        <a
                            href="/materias"
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm shadow-sm"
                        >
                            <ArrowLeft size={16} className="text-slate-600" />
                            <span className="text-slate-600 font-medium">Volver</span>
                        </a>
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
                                <BookOpen size={18} className="text-[#f59e0b]" />
                                Información de la materia
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Código */}
                            <div>
                                <label htmlFor="codigo" className={labelClass}>
                                    <Hash size={14} className="text-slate-400" />
                                    Código de la materia
                                </label>
                                <input
                                    type="text"
                                    id="codigo"
                                    name="codigo"
                                    value={data.codigo}
                                    onChange={(e) => setData('codigo', e.target.value)}
                                    className={inputClass('codigo')}
                                   
                                />
                                {errors.codigo && (
                                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                        <AlertCircle size={10} />
                                        {errors.codigo}
                                    </p>
                                )}
                            </div>

                            {/* Nombre */}
                            <div>
                                <label htmlFor="nombre" className={labelClass}>
                                    <Type size={14} className="text-slate-400" />
                                    Nombre de la materia
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    className={inputClass('nombre')}
                                    placeholder="Ej: Matemáticas I, Física"
                                />
                                {errors.nombre && (
                                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                        <AlertCircle size={10} />
                                        {errors.nombre}
                                    </p>
                                )}
                            </div>

                            {/* Información adicional */}
                            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Sparkles size={18} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">Consejos para el registro</p>
                                        <ul className="text-xs text-slate-600 mt-2 space-y-1.5">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                                El código debe ser único y de 7 digitos
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                                El nombre debe ser descriptivo y completo
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                                Una vez creada, podrás asignarla a múltiples aulas
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex justify-end gap-3 pt-2">
                                <a
                                    href="/materias"
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
                                            <span>Crear materia</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    
                   
                </div>
            </div>
        </AppLayout>
    );
}