import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { entregaCreate } from '@/routes';

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
    };
    timeline: Item[];
}

export default function AulaAccess({ aula, timeline }: Props) {

    return (
        <AppLayout>
            <Head title={`Aula ${aula.materia_nombre}`} />

            <div className="max-w-4xl mx-auto p-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        {aula.materia_nombre}
                    </h1>
                    <p className="text-muted-foreground">
                        {aula.materia_codigo} • {aula.semestre}
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    {timeline.length === 0 && (
                        <div className="text-center text-muted-foreground py-12">
                            No hay publicaciones ni evaluaciones todavía.
                        </div>
                    )}

                    {timeline.map((item) => (
                        <div
                            key={`${item.tipo}-${item.id}`}
                            className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border p-6"
                        >
                            {/* Type Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full
                                    ${item.tipo === 'post'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {item.tipo === 'post' ? 'Post' : 'Evaluación'}
                                </span>

                                {/* Entrega Button (only for evaluaciones) */}
                                {item.tipo === 'evaluacion' && (
                                    <button
                                        onClick={() => router.get(entregaCreate(item.id))}
                                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Entregar
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            {item.tipo === 'post' ? (
                                <p className="text-lg">{item.contenido}</p>
                            ) : (
                                <>
                                    <p className="text-lg font-medium mb-2">
                                        {item.contenido}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Fecha límite: {item.fecha_limite}
                                    </p>
                                </>
                            )}

                            <p className="text-xs text-muted-foreground mt-4">
                                Publicado: {new Date(item.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}