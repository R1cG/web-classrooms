import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Editar Aula',
        href: '#',
    },
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
    const { aula, estudiantes, estudiantesInscritos } = usePage().props as PageProps;

    const { data, setData, put, processing, errors } = useForm({
        estudiantes: estudiantesInscritos || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/aulas/${aula.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Aula" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Aula Info (Read Only) */}
                    <div className="bg-gray-100 p-4 rounded-md space-y-2">
                        <div>
                            <Label>Semestre</Label>
                            <p className="font-semibold">{aula.semestre}</p>
                        </div>

                        <div>
                            <Label>Materia</Label>
                            <p className="font-semibold">{aula.materia}</p>
                        </div>

                        <div>
                            <Label>Profesor</Label>
                            <p className="font-semibold">{aula.profesor}</p>
                        </div>
                    </div>

                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="text-red-500">
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    {/* Estudiantes multi-select */}
                    <div>
                        <Label>Estudiantes</Label>
                        <div className="border rounded-md p-2 max-h-64 overflow-y-auto">
                            {estudiantes.map((s) => (
                                <label key={s.cedula} className="flex items-center space-x-2 mb-1">
                                    <input
                                        type="checkbox"
                                        value={s.cedula}
                                        checked={data.estudiantes.includes(s.cedula)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;

                                            setData(
                                                'estudiantes',
                                                checked
                                                    ? [...data.estudiantes, s.cedula]
                                                    : data.estudiantes.filter(
                                                          (c) => c !== s.cedula
                                                      )
                                            );
                                        }}
                                    />
                                    <span>
                                        {s.nombre} {s.apellido} ({s.cedula})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button disabled={processing} type="submit">
                        Actualizar Estudiantes
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}