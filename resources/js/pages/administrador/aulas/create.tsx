import { Head, useForm,usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { aulasStore } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Aula',
        href: '/aulas/create',
    },
];

interface User {
    cedula: string;
    nombre: string;
    apellido: string;
}

interface Materia {
    codigo: string;
    nombre: string;
}

interface PageProps {
    profesores: User[];
    estudiantes: User[];
    materias: Materia[];
}

export default function Create() {
    const { profesores, estudiantes, materias } = usePage().props as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        semestre: '',
        materia_codigo: '',
        profesor_cedula: '',
        estudiantes: [] as string[], // Multi-select
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(aulasStore.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Aula" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="text-red-500">
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    {/* Semestre */}
                    <div>
                        <Label htmlFor="semestre">Semestre</Label>
                        <input
                            type="text"
                            id="semestre"
                            value={data.semestre}
                            onChange={(e) => setData('semestre', e.target.value)}
                            placeholder="2025-I"
                            className="border rounded-md p-2 w-full"
                        />
                    </div>

                    {/* Materia */}
                    <div>
                        <Label htmlFor="materia_codigo">Materia</Label>
                        <select
                            id="materia_codigo"
                            value={data.materia_codigo}
                            onChange={(e) => setData('materia_codigo', e.target.value)}
                            className="border rounded-md p-2 w-full"
                        >
                            <option value="">Seleccione una materia</option>
                            {materias.map((m) => (
                                <option key={m.codigo} value={m.codigo}>
                                    {m.nombre} ({m.codigo})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Profesor */}
                    <div>
                        <Label htmlFor="profesor_cedula">Profesor</Label>
                        <select
                            id="profesor_cedula"
                            value={data.profesor_cedula}
                            onChange={(e) => setData('profesor_cedula', e.target.value)}
                            className="border rounded-md p-2 w-full"
                        >
                            <option value="">Seleccione un profesor</option>
                            {profesores.map((p) => (
                                <option key={p.cedula} value={p.cedula}>
                                    {p.nombre} {p.apellido} ({p.cedula})
                                </option>
                            ))}
                        </select>
                    </div>

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
                                            setData('estudiantes', checked
                                                ? [...data.estudiantes, s.cedula]
                                                : data.estudiantes.filter(c => c !== s.cedula)
                                            );
                                        }}
                                    />
                                    <span>{s.nombre} {s.apellido} ({s.cedula})</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button disabled={processing} type="submit" className="mt-4">
                        Crear Aula
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}