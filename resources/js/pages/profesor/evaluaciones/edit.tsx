import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { evaluacionesUpdate } from '@/routes';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Save, ArrowLeft, AlertCircle, CalendarDays, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    evaluacion: {
        id: number;
        fecha_limite: string;
        descripcion: string;
    };
}

export default function EvaluacionEdit({ evaluacion }: Props) {

    // Convert "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DDTHH:MM"
    const formatFecha = (fecha: string) => {
        if (!fecha) return '';
        return fecha.replace(' ', 'T').slice(0, 16);
    };

    const { data, setData, put, processing, errors } = useForm({
        fecha_limite: formatFecha(evaluacion.fecha_limite),
        descripcion: evaluacion.descripcion || '',
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(evaluacionesUpdate(evaluacion.id));
    };

    const inputClass =
        'w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#f59e0b] focus:shadow-md border-slate-200';

    const labelClass =
        'text-slate-600 text-sm font-medium flex items-center gap-1.5 mb-1.5';

    return (
        <AppLayout>
            <Head title="Editar Evaluación" />

            <div
                className={`min-h-screen bg-slate-50 p-4 md:p-8 transition-opacity duration-700 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1
                            className="text-2xl font-bold text-[#0b1f3a]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Editar Evaluación
                        </h1>

                        <a
                            href="javascript:history.back()"
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm shadow-sm"
                        >
                            <ArrowLeft size={16} className="text-slate-600" />
                            <span className="text-slate-600 font-medium">
                                Volver
                            </span>
                        </a>
                    </div>

                    {/* Global Errors */}
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

                    {/* Form */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">

                            {/* Fecha límite */}
                            <div>
                                <label htmlFor="fecha_limite" className={labelClass}>
                                    <CalendarDays size={14} className="text-slate-400" />
                                    Fecha límite
                                </label>

                                <input
                                    type="datetime-local"
                                    id="fecha_limite"
                                    value={data.fecha_limite}
                                    onChange={(e) =>
                                        setData('fecha_limite', e.target.value)
                                    }
                                    className={inputClass}
                                />

                                {errors.fecha_limite && (
                                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                        <AlertCircle size={10} />
                                        {errors.fecha_limite}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label htmlFor="descripcion" className={labelClass}>
                                    <Type size={14} className="text-slate-400" />
                                    Descripción
                                </label>

                                <textarea
                                    id="descripcion"
                                    value={data.descripcion}
                                    onChange={(e) =>
                                        setData('descripcion', e.target.value)
                                    }
                                    className={inputClass + ' h-40 resize-none'}
                                    maxLength={2000}
                                />

                                <div className="flex justify-between items-center mt-1.5">
                                    {errors.descripcion ? (
                                        <p className="text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle size={10} />
                                            {errors.descripcion}
                                        </p>
                                    ) : (
                                        <span className="text-xs text-slate-400">
                                            {data.descripcion.length}/2000
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 rounded-xl bg-[#f59e0b] text-white text-sm font-medium hover:bg-[#e68a00] hover:shadow-md transition-all border-0 cursor-pointer flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Actualizando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            <span>Actualizar Evaluación</span>
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