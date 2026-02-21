import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usuariosUpdate } from '@/routes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

interface User {
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    fecha_nacimiento?: string;
}

interface Props {
    usuario: User;
}

export default function Edit({ usuario }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        fecha_nacimiento: usuario.fecha_nacimiento ?? '',
        password: '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(usuariosUpdate(usuario.cedula));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Editar Usuario', href: `/usuarios/${usuario.cedula}/edit` }
            ]}
        >
            <Head title="Editar Usuario" />

            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>

                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className='text-red-500'>
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}

                    {/* Cedula (readonly) */}
                    <div>
                        <Label>Cédula</Label>
                        <input
                            type="text"
                            value={usuario.cedula}
                            disabled
                            className='border rounded-md p-2 w-full bg-gray-100'
                        />
                    </div>

                    {/* Nombre */}
                    <div>
                        <Label htmlFor='nombre'>Nombre</Label>
                        <input
                            type="text"
                            id='nombre'
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        />
                    </div>

                    {/* Apellido */}
                    <div>
                        <Label htmlFor='apellido'>Apellido</Label>
                        <input
                            type="text"
                            id='apellido'
                            value={data.apellido}
                            onChange={(e) => setData('apellido', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <input
                            type="email"
                            id='email'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        />
                    </div>

                    {/* Rol */}
                    <div>
                        <Label htmlFor='rol'>Rol</Label>
                        <select
                            id='rol'
                            value={data.rol}
                            onChange={(e) => setData('rol', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        >
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
                            value={data.fecha_nacimiento}
                            onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                            className='border rounded-md p-2 w-full'
                        />
                    </div>

                    {/* Optional Password Change */}
                    <div>
                        <Label htmlFor='password'>
                            Nueva Contraseña (opcional)
                        </Label>
                        <input
                            type="password"
                            id='password'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className='border rounded-md p-2 w-full'
                            placeholder='Dejar vacío para no cambiar'
                        />
                    </div>

                    <Button disabled={processing} type='submit' className='mt-4'>
                        Actualizar Usuario
                    </Button>

                </form>
            </div>
        </AppLayout>
    );
}