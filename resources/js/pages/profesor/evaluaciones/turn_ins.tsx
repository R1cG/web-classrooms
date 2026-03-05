import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface TurnIn {
    cedula: string;
    nombre: string;
    apellido: string;
    url: string;
    submitted_at: string;
    on_time: boolean;
}

interface Props {
    evaluacion: {
        id: number;
        descripcion: string;
        fecha_limite: string;
    };
    turn_ins: TurnIn[];
}

export default function TurnIns({ evaluacion, turn_ins }: Props) {
    return (
        <AppLayout>
            <Head title="Entregas de Evaluación" />

            <div className="max-w-4xl mx-auto p-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {evaluacion.descripcion}
                    </h1>

                    <p className="text-muted-foreground">
                        Fecha límite:{' '}
                        {new Date(evaluacion.fecha_limite).toLocaleString()}
                    </p>
                </div>

                {/* Turn-ins List */}
                <div className="space-y-4">
                    {turn_ins.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm border p-6 text-center text-muted-foreground">
                            No hay entregas registradas.
                        </div>
                    )}

                    {turn_ins.map((turn) => (
                        <div
                            key={turn.cedula}
                            className="bg-white rounded-xl shadow-sm border p-6 flex justify-between items-center"
                        >
                            {/* Student Info */}
                            <div>
                                <h2
                                    className={`text-lg font-semibold ${turn.on_time
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        }`}
                                >
                                    {turn.nombre} {turn.apellido}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Cédula: {turn.cedula}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Entregado: {new Date(turn.submitted_at).toLocaleString()}
                                </p>
                            </div>

                            {/* Status + URL */}
                            <div className="text-right space-y-2">
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full
                                        ${turn.on_time
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {turn.on_time ? 'A tiempo' : 'Tarde'}
                                </span>

                                <div>
                                    <a
                                        href={turn.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Ver Entrega
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}