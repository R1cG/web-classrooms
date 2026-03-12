import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Aula {
    id: number;
    semestre: string;
    cantidad_estudiantes: number;
    materia: {
        nombre: string;
    };
}

interface Evaluacion {
    id: number;
    descripcion: string;
    fecha_limite: string;
    aula: {
        materia: {
            nombre: string;
        };
    };
}

interface Props {
    cantidadAulas: number;
    cantidadEvaluaciones: number;
    cantidadEstudiantes: number;
    aulas: Aula[];
    evaluacionesRecientes: Evaluacion[];
}

export default function Dashboard({
    cantidadAulas,
    cantidadEvaluaciones,
    cantidadEstudiantes,
    aulas,
    evaluacionesRecientes,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profesor Dashboard" />

            <div className="flex flex-col gap-6 p-4">

                {/* STATS */}
                <div className="grid gap-4 md:grid-cols-3">

                    <div className="rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Aulas</h2>
                        <p className="text-3xl">{cantidadAulas}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Evaluaciones</h2>
                        <p className="text-3xl">{cantidadEvaluaciones}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Estudiantes únicos</h2>
                        <p className="text-3xl">{cantidadEstudiantes}</p>
                    </div>

                </div>

                {/* AULAS */}
                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-xl font-semibold">Mis Aulas</h2>

                    <div className="grid gap-3 md:grid-cols-2">

                        {aulas.map((aula) => (
                            <div key={aula.id} className="rounded-lg border p-3">

                                <h3 className="font-semibold">
                                    {aula.materia.nombre}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Semestre: {aula.semestre}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Estudiantes: {aula.cantidad_estudiantes}
                                </p>

                            </div>
                        ))}

                    </div>
                </div>

                {/* RECENT EVALUACIONES */}
                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-xl font-semibold">
                        Últimas Evaluaciones
                    </h2>

                    {evaluacionesRecientes.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No hay evaluaciones recientes.
                        </p>
                    )}

                    {evaluacionesRecientes.map((ev) => (
                        <div key={ev.id} className="border-b pb-2 mb-2">

                            <p className="font-medium">
                                {ev.descripcion}
                            </p>

                            <p className="text-sm text-gray-500">
                                {ev.aula.materia.nombre}
                            </p>

                            <p className="text-sm text-gray-500">
                                Fecha límite: {new Date(ev.fecha_limite).toLocaleDateString()}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </AppLayout>
    );
}