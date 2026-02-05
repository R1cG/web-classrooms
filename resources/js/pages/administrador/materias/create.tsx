import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { materiasStore } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Materia Nueva',
        href: '/materias/crear',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        codigo: '',
        nombre: '',
        remember: false,
    })

    const hadleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(materiasStore.url());
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Materia Nueva" />
            <div className='w-8/12 p-4'>
                <form onSubmit={hadleSubmit} className='space-y-4'>
                    @csrf
                    {/*Mostrar errores de validacion*/}
                    {Object.keys(errors).length > 0 && (
                        <div className='text-red-500'>
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    <div className='gap-1.5'>
                        <Label htmlFor='Codigo de materia'>Codigo</Label>
                        <input onChange={(e) => setData('codigo', e.target.value)} value={data.codigo} placeholder='Codigo de la materia a crear' type="text" name='codigo' id='codigo' className='border rounded-md p-2 w-full'/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='Nombre de materia'>Nombre</Label>
                        <input onChange={(e) => setData('nombre', e.target.value)} value={data.nombre} placeholder='Nombre de la materia a crear' type="text" name='nombre' id='nombre' className='border rounded-md p-2 w-full'/>
                    </div>
                    <Button disabled={processing} type='submit' className='mt-4'>Crear Materia</Button>
                </form>
            </div>
        </AppLayout>
    );
}
