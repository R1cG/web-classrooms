import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usuariosStore } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Usuario',
        href: '/usuarios/create',
    },
];

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        cedula: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: '',
        fecha_nacimiento: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(usuariosStore.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>

                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className='text-red-500'>
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    {/* Cedula */}
                    <div>
                        <Label htmlFor='cedula'>Cédula</Label>
                        <input
                            type="text"
                            id='cedula'
                            name='cedula'
                            maxLength={9}
                            value={data.cedula}
                            onChange={(e) => setData('cedula', e.target.value)}
                            className='border rounded-md p-2 w-full'
                            placeholder='123456789'
                        />
                    </div>

                    {/* Nombre */}
                    <div>
                        <Label htmlFor='nombre'>Nombre</Label>
                        <input
                            type="text"
                            id='nombre'
                            name='nombre'
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className='border rounded-md p-2 w-full'
                            placeholder='Nombre'
                        />
                    </div>

                    {/* Apellido */}
                    <div>
                        <Label htmlFor='apellido'>Apellido</Label>
                        <input
                            type="text"
                            id='apellido'
                            name='apellido'
                            value={data.apellido}
                            onChange={(e) => setData('apellido', e.target.value)}
                            className='border rounded-md p-2 w-full'
                            placeholder='Apellido'
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className='border rounded-md p-2 w-full'
                            placeholder='correo@ejemplo.com'
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor='password'>Password</Label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className='border rounded-md p-2 w-full'
                            placeholder='********'
                        />
                    </div>

                    {/* Rol */}
                    <div>
                        <Label htmlFor='rol'>Rol</Label>
                        <select
                            id='rol'
                            name='rol'
                            value={data.rol}
                            onChange={(e) => setData('rol', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="A">Administrador</option>
                            <option value="P">Profesor</option>
                            <option value="E">Estudiante</option>
                        </select>
                    </div>

                    {/* Fecha Nacimiento */}
                    <div>
                        <Label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</Label>
                        <input
                            type="date"
                            id='fecha_nacimiento'
                            name='fecha_nacimiento'
                            value={data.fecha_nacimiento}
                            onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        />
                    </div>

                    <Button disabled={processing} type='submit' className='mt-4'>
                        Crear Usuario
                    </Button>

                </form>
            </div>
        </AppLayout>
    );
}