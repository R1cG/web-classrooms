import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { materiasUpdate } from '@/routes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

interface Materia {
    codigo: string;
    nombre: string;
}

interface Mat {
    materia: Materia;
}

export default function Edit({materia}: Mat) {

    const { data, setData, put, processing, errors } = useForm({
        codigo: materia.codigo,
        nombre: materia.nombre,
        remember: false,
    })

    const hadleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(materiasUpdate(materia.codigo));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Editar Materia', href: `/materias/${materia.codigo}/editar`}]}>
            <Head title="Editar Materia" />
            <div className='w-8/12 p-4'>
                <form onSubmit={hadleUpdate} className='space-y-4'>
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
                    <Button disabled={processing} type='submit' className='mt-4'>Actualizar Materia</Button>
                </form>
            </div>
        </AppLayout>
    );
}
