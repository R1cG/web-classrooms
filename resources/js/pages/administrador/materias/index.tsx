import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { materiasCreate, materiasDestroy, materiasEdit } from '@/routes';
import type { BreadcrumbItem } from '@/types';
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
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Materias',
        href: '/materias',
    },
];

interface Materia {
    codigo: string;
    nombre: string;
}

interface PageProps {
    flash: {
        message?: string
    }
    materias: Materia[]
}

export default function Index() {

    const { materias, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (codigo: string, nombre: string) => {

        if (confirm(`¿Estás seguro de que deseas eliminar la materia ${nombre} con código ${codigo}?`)) {
            destroy(materiasDestroy(codigo).url);
        }
    }

return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Materias" />
        <div className='m-4'>
            <Link href={materiasCreate()}><Button>Crear Materia</Button></Link>
        </div>
        <div className='m-4'>
            {flash.message && (
                <Alert>
                    <CircleCheck className="h-4 w-4" />
                    <AlertTitle>Notificacion</AlertTitle>
                    <AlertDescription>
                        {flash.message}
                    </AlertDescription>
                </Alert>
            )}
        </div>
        {materias.length > 0 && (
            <div className='m-4'>
                <Table>
                    <TableCaption>Listado de materias.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Codigo</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="text-right">Accion</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {materias.map((materia) => (
                            <TableRow>
                                <TableCell className="font-medium">{materia.codigo}</TableCell>
                                <TableCell>{materia.nombre}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={materiasEdit(materia.codigo).url}><Button disabled={processing} className='bg-blue-500 hover:bg-blue-700'><Pencil /></Button></Link>
                                    <Button disabled={processing} onClick={() => handleDelete(materia.codigo, materia.nombre)} className='bg-red-500 hover:bg-red-700'><Trash2 /></Button>
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
