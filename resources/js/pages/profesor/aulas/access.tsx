import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { postsCreate, postsEdit, postsDestroy, evaluacionesCreate, evaluacionesEdit, evaluacionesDestroy  } from '@/routes';

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
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

    const handleDelete = async (item: Item) => {
        if (!confirm('¿Estás seguro que deseas eliminar esto?')) return;
        if (!confirm('Esta acción no se puede deshacer. Confirmar nuevamente.')) return;

        setLoadingDelete(item.id);

        try{
            if (item.tipo === 'post') {
                await router.delete(postsDestroy(item.id));
            } else {
                await router.delete(evaluacionesDestroy(item.id));
            }
        }finally{
            setLoadingDelete(null);
        }
    };

    return (
        <AppLayout>
            <Head title={`Aula ${aula.materia_nombre}`} />

            <div className="max-w-4xl mx-auto p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {aula.materia_nombre}
                        </h1>
                        <p className="text-muted-foreground">
                            {aula.materia_codigo} • {aula.semestre}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => router.get(evaluacionesCreate(aula.id))}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Crear Evaluación
                        </button>

                        <button
                            onClick={() => router.get(postsCreate(aula.id))}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Crear Post
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
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

                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            item.tipo === 'post'
                                                ? router.get(postsEdit(item.id))
                                                : router.get(evaluacionesEdit(item.id))
                                        }
                                        className="text-sm text-yellow-600 hover:underline"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item)}
                                        disabled={loadingDelete === item.id}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </div>
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