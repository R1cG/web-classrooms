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
    materia: {
        nombre: string;
    };
    profesor: {
        nombre: string;
        apellido: string;
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

interface TimelineItem {
    id: number;
    tipo: 'post' | 'evaluacion';
    contenido: string;
    created_at: string;
}

interface Props {
    aulas: Aula[];
    cantidadAulas: number;
    evaluacionesTurnedIn: number;
    evaluacionesNoTurnedIn: number;
    evaluacionesOnTime: Evaluacion[];
    timeline: TimelineItem[];
}

export default function Dashboard({
    aulas,
    cantidadAulas,
    evaluacionesTurnedIn,
    evaluacionesNoTurnedIn,
    evaluacionesOnTime,
    timeline,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estudiante Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">

                {/* STATS */}
                <div className="grid gap-4 md:grid-cols-3">

                    <div className="rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Aulas inscritas</h2>
                        <p className="text-3xl">{cantidadAulas}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Evaluaciones entregadas</h2>
                        <p className="text-3xl text-green-600">{evaluacionesTurnedIn}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Evaluaciones pendientes</h2>
                        <p className="text-3xl text-red-600">{evaluacionesNoTurnedIn}</p>
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

                                <p className="text-sm text-gray-600">
                                    Profesor: {aula.profesor.nombre} {aula.profesor.apellido}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Semestre: {aula.semestre}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

                {/* UPCOMING EVALUACIONES */}
                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-xl font-semibold">Próximas Evaluaciones</h2>

                    {evaluacionesOnTime.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No hay evaluaciones próximas.
                        </p>
                    )}

                    {evaluacionesOnTime.map((ev) => (
                        <div key={ev.id} className="mb-2 border-b pb-2">

                            <p className="font-medium">{ev.descripcion}</p>

                            <p className="text-sm text-gray-500">
                                {ev.aula.materia.nombre}
                            </p>

                            <p className="text-sm text-gray-500">
                                Fecha límite: {new Date(ev.fecha_limite).toLocaleDateString()}
                            </p>

                        </div>
                    ))}
                </div>

                {/* TIMELINE */}
                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-xl font-semibold">Actividad Reciente</h2>

                    {timeline.map((item) => (
                        <div key={`${item.tipo}-${item.id}`} className="mb-2 border-b pb-2">

                            <p className="font-medium">
                                {item.tipo === 'post' ? 'Post' : 'Evaluación'}
                            </p>

                            <p>{item.contenido}</p>

                            <p className="text-xs text-gray-500">
                                {new Date(item.created_at).toLocaleString()}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}