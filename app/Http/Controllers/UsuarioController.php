<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    //funcion para tener indice de los usuarios, un listado
    public function index()
    {
        $user = auth()->user();

        if ($user->rol !== 'A') {
            abort(403, 'Acceso no autorizado');
        }

        //Obtener todos los usuarios
        $usuarios = User::all();

        //Retornar la vista con los usuarios
        return Inertia::render('administrador/usuarios/index', compact('usuarios'));
    }

    public function create()
    {
        $user = auth()->user();

        if ($user->rol !== 'A') {
            abort(403, 'Acceso no autorizado');
        }

        return Inertia::render(component: 'administrador/usuarios/create');
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        if ($user->rol !== 'A') {
            abort(403, 'Acceso no autorizado');
        }

        $validated = $request->validate([
            'cedula' => ['required', 'max_digits:9', 'unique:users,cedula'],
            'nombre' => ['required', 'string', 'max:30'],
            'apellido' => ['required', 'string', 'max:30'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'rol' => ['required', 'string', 'in:administrador,profesor,estudiante, Estudiante, Profesor, Administrador,p,a,e,A,P,E'],
            'fecha_nacimiento' => ['required', 'date'],
        ]);

        // Normalize role (convert full names to letters)
        $roleMap = [
            'administrador' => 'A',
            'profesor' => 'P',
            'estudiante' => 'E',
            'Estudiante' => 'E',
            'Profesor' => 'P',
            'Administrador' => 'A',
            'a' => 'A',
            'p' => 'P',
            'e' => 'E',
            'A' => 'A',
            'P' => 'P',
            'E' => 'E',
        ];

        $validated['rol'] = $roleMap[$validated['rol']];

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()
            ->route('usuariosIndex')
            ->with('message', 'Usuario creado exitosamente.');
    }

    public function destroy($cedula)
    {
        $user = auth()->user();

        if ($user->rol !== 'A') {
            abort(403, 'Acceso no autorizado');
        }

        $usuario = User::findOrFail($cedula);
        $usuario->delete();

        return redirect()->route('usuariosIndex')->with('message', 'Usuario eliminado exitosamente.');
    }

    public function edit(User $usuario)
    {
        $user = auth()->user();

        if ($user->rol !== 'A') {
            abort(403, 'Acceso no autorizado');
        }

        return Inertia::render('administrador/usuarios/edit', compact('usuario'));
    }

    public function update(Request $request, User $usuario)
    {
        $user = auth()->user();

        if ($user->rol !== 'A') {
            abort(403, 'Acceso no autorizado');
        }
        
        $request->validate([
            'nombre' => ['required', 'string', 'max:30'],
            'apellido' => ['required', 'string', 'max:30'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $usuario->cedula . ',cedula'],
            'password' => ['nullable', 'string', 'min:8'],
            'rol' => ['required', 'string', 'in:administrador,profesor,estudiante, Estudiante, Profesor, Administrador,p,a,e,A,P,E'],
            'fecha_nacimiento' => ['required', 'date'],
        ]);

        $roleMap = [
            'administrador' => 'A',
            'profesor' => 'P',
            'estudiante' => 'E',
            'Estudiante' => 'E',
            'Profesor' => 'P',
            'Administrador' => 'A',
            'a' => 'A',
            'p' => 'P',
            'e' => 'E',
            'A' => 'A',
            'P' => 'P',
            'E' => 'E',
        ];

        $request['rol'] = $roleMap[$request['rol']];

        $data = [
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'rol' => $request->rol,
            'fecha_nacimiento' => $request->fecha_nacimiento,
        ];

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $usuario->update($data);

        return redirect()->route('usuariosIndex')->with('message', 'Usuario actualizado exitosamente.');
    }
}
