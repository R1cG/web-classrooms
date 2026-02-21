import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usuariosCreate, usuariosDestroy, usuariosEdit } from '@/routes';
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
        title: 'Usuarios',
        href: '/usuarios',
    },
];

interface User {
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    fecha_nacimiento?: string;
}

interface PageProps {
    flash: {
        message?: string
    }
    usuarios: User[]
}

export default function Index() {

    const { usuarios, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (cedula: string, nombre: string) => {

        if (confirm(`¿Eliminar al usuario ${nombre} con cédula ${cedula}?`)) {
            destroy(usuariosDestroy(cedula).url);
        }
    }

    const formatRole = (rol: string) => {
        switch (rol) {
            case 'A': return 'Admin';
            case 'P': return 'Profesor';
            case 'E': return 'Estudiante';
            default: return rol;
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className='m-4'>
                <Link href={usuariosCreate()}>
                    <Button>Crear Usuario</Button>
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

            {usuarios.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>Listado de usuarios.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Fecha Nacimiento</TableHead>
                                <TableHead className="text-right">Acción</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {usuarios.map((usuario) => (
                                <TableRow key={usuario.cedula}>
                                    <TableCell className="font-medium">
                                        {usuario.cedula}
                                    </TableCell>

                                    <TableCell>
                                        {usuario.nombre} {usuario.apellido}
                                    </TableCell>

                                    <TableCell>
                                        {usuario.email}
                                    </TableCell>

                                    <TableCell>
                                        {formatRole(usuario.rol)}
                                    </TableCell>

                                    <TableCell>
                                        {usuario.fecha_nacimiento ?? '-'}
                                    </TableCell>

                                    <TableCell className="text-right space-x-2">
                                        <Link href={usuariosEdit(usuario.cedula).url}>
                                            <Button
                                                disabled={processing}
                                                className='bg-blue-500 hover:bg-blue-700'
                                            >
                                                <Pencil />
                                            </Button>
                                        </Link>

                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(usuario.cedula, usuario.nombre)}
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