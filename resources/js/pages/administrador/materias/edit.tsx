import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { materiasUpdate } from '@/routes';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { 
    BookOpen, 
    Save, 
    Sparkles, 
    ArrowLeft,
    AlertCircle,
    Hash,
    Type,
    Edit3
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Materia {
    codigo: string;
    nombre: string;
}

interface Mat {
    materia: Materia;
}

export default function Edit({ materia }: Mat) {
    const { data, setData, put, processing, errors } = useForm({
        codigo: materia.codigo,
        nombre: materia.nombre,
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(materiasUpdate.url(materia.codigo));
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400
        focus:border-[#f59e0b] focus:shadow-md
        ${errors[field as keyof typeof errors] ? 'border-red-300 focus:border-red-400' : 'border-slate-200'}`;

    const labelClass = "text-slate-600 text-sm font-medium flex items-center gap-1.5 mb-1.5";

    return (
        <AppLayout breadcrumbs={[
            { title: 'Materias', href: '/materias' },
            { title: 'Editar Materia', href: '#' },
        ]}>
            <Head title="Editar Materia — UDO" />

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
                                    Editar materia
                                </h1>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
                                    Modifica los datos de la materia
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

                    {/* Tarjeta de información de la materia */}
                    <div className="mb-5">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                                    <BookOpen size={22} className="text-[#f59e0b]" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Materia a editar</p>
                                    <p className="font-semibold text-slate-800 text-base">{materia.nombre}</p>
                                    <p className="text-xs text-slate-400 font-mono mt-0.5">{materia.codigo}</p>
                                </div>
                            </div>
                            <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                                <span className="text-xs font-medium text-[#f59e0b] flex items-center gap-1.5">
                                    <Edit3 size={12} />
                                    Editando
                                </span>
                            </div>
                        </div>
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
                                <Edit3 size={18} className="text-[#f59e0b]" />
                                Información de la materia
                            </h2>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-5">
                            {/* Código (no editable) */}
                            <div>
                                <label htmlFor="codigo" className={labelClass}>
                                    <Hash size={14} className="text-slate-400" />
                                    Código de la materia
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="codigo"
                                        value={data.codigo}
                                        onChange={(e) => setData('codigo', e.target.value)}
                                        className={inputClass('codigo')}
                                        placeholder="Ej: MAT101, FIS202, QUIM301"
                                    />
                                    {materia.codigo === data.codigo && (
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                                            Original: {materia.codigo}
                                        </span>
                                    )}
                                </div>
                                {errors.codigo && (
                                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                        <AlertCircle size={10} />
                                        {errors.codigo}
                                    </p>
                                )}
                                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                    <AlertCircle size={10} className="text-slate-400" />
                                    Modificar el código puede afectar las aulas que usan esta materia
                                </p>
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
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    className={inputClass('nombre')}
                                    placeholder="Ej: Matemáticas I, Física General, Química Orgánica"
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
                                        <p className="text-sm font-medium text-slate-700">Información importante</p>
                                        <ul className="text-xs text-slate-600 mt-2 space-y-1.5">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                                Al cambiar el código, asegúrate de que sea único
                                            </li>
                                            
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-[#f59e0b] rounded-full"></span>
                                                Los cambios se reflejarán inmediatamente en el sistema
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
                                            <span>Actualizar materia</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Vista previa de los cambios */}
                    {(data.codigo !== materia.codigo || data.nombre !== materia.nombre) && (
                        <div className="mt-5 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-3">
                                <Sparkles size={18} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Vista previa de cambios</p>
                                    <div className="mt-3 space-y-2">
                                        {data.codigo !== materia.codigo && (
                                            <div className="flex items-center gap-3 text-xs">
                                                <span className="text-slate-500 w-16">Código:</span>
                                                <span className="text-slate-400 line-through">{materia.codigo}</span>
                                                <span className="text-[#f59e0b] font-mono font-semibold">{data.codigo}</span>
                                            </div>
                                        )}
                                        {data.nombre !== materia.nombre && (
                                            <div className="flex items-center gap-3 text-xs">
                                                <span className="text-slate-500 w-16">Nombre:</span>
                                                <span className="text-slate-400 line-through">{materia.nombre}</span>
                                                <span className="text-[#f59e0b] font-semibold">{data.nombre}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}