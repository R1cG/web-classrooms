import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleCheck, Pencil, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { BreadcrumbItem } from '@/types';
import { aulasCreate, aulasEdit, aulasDestroy } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aulas',
        href: '/aulas',
    },
];

interface Profesor {
    nombre: string;
    apellido: string;
    cedula: string;
}

interface Materia {
    nombre: string;
    codigo: string;
}

interface Aula {
    id: number;
    semestre: string;
    profesor_cedula: string;
    materia_codigo: string;
    profesor: Profesor;
    materia: Materia;
    cantidad_estudiantes: number;
}

interface PageProps {
    flash: { message?: string };
    aulas: Aula[];
}

export default function Index() {
    const { aulas, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, nombreProfesor: string) => {
        if (confirm(`¿Eliminar el aula del profesor ${nombreProfesor}?`)) {
            destroy(aulasDestroy(id).url);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aulas" />

            <div className='m-4'>
                <Link href={aulasCreate()}>
                    <Button>Crear Aula</Button>
                </Link>
            </div>

            <div className='m-4'>
                {flash.message && (
                    <Alert>
                        <CircleCheck className="h-4 w-4" />
                        <AlertTitle>Notificación</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {aulas?.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>Listado de aulas.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Semestre</TableHead>
                                <TableHead>Materia</TableHead>
                                <TableHead>Profesor</TableHead>
                                <TableHead>Cédula Profesor</TableHead>
                                <TableHead>Estudiantes</TableHead>
                                <TableHead className="text-right">Acción</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {aulas.map((aula) => (
                                <TableRow key={aula.id}>
                                    <TableCell>{aula.semestre}</TableCell>
                                    <TableCell>{aula.materia?.nombre ?? '-'}</TableCell>
                                    <TableCell>
                                        {aula.profesor?.nombre} {aula.profesor?.apellido}
                                    </TableCell>
                                    <TableCell>{aula.profesor?.cedula}</TableCell>
                                    <TableCell>{aula.cantidad_estudiantes}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={aulasEdit(aula.id).url}>
                                            <Button disabled={processing} className='bg-blue-500 hover:bg-blue-700'>
                                                <Pencil />
                                            </Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(aula.id, aula.profesor?.nombre ?? '')}
                                            className='bg-red-500 hover:bg-red-700'
                                        >
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}