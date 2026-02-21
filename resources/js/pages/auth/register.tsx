import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            {/* Cedula */}
                            <div className="grid gap-2">
                                <Label htmlFor="cedula">Cédula</Label>
                                <Input
                                    id="cedula"
                                    name="cedula"
                                    type="text"
                                    required
                                    maxLength={9}
                                />
                                <InputError message={errors.cedula} />
                            </div>

                            {/* Nombre */}
                            <div className="grid gap-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    required
                                    maxLength={30}
                                />
                                <InputError message={errors.nombre} />
                            </div>

                            {/* Apellido */}
                            <div className="grid gap-2">
                                <Label htmlFor="apellido">Apellido</Label>
                                <Input
                                    id="apellido"
                                    name="apellido"
                                    type="text"
                                    required
                                    maxLength={30}
                                />
                                <InputError message={errors.apellido} />
                            </div>

                            {/* Fecha nacimiento */}
                            <div className="grid gap-2">
                                <Label htmlFor="fecha_nacimiento">
                                    Fecha de nacimiento
                                </Label>
                                <Input
                                    id="fecha_nacimiento"
                                    name="fecha_nacimiento"
                                    type="date"
                                />
                                <InputError message={errors.fecha_nacimiento} />
                            </div>

                            {/* Rol */}
                            <div className="grid gap-2">
                                <Label htmlFor="rol">Rol</Label>
                                <select
                                    id="rol"
                                    name="rol"
                                    required
                                    className="border rounded-md p-2 bg-background"
                                >
                                    <option value="">Select role</option>
                                    <option value="A">Admin</option>
                                    <option value="E">Estudiante</option>
                                    <option value="P">Profesor</option>
                                </select>
                                <InputError message={errors.rol} />
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="mt-2 w-full">
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login()}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}