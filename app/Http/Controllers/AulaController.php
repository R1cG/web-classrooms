<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Aula;
use Inertia\Inertia;
use App\Models\Materia;

class AulaController extends Controller
{
    public function index()
    {
        $aulas = Aula::with(['materia', 'profesor'])->get();
        return Inertia::render('administrador/aulas/index', compact('aulas'));
    }

    public function create()
{
    // Professors
    $profesores = User::where('rol', 'P')
        ->select('cedula', 'nombre', 'apellido')
        ->get();

    // Students
    $estudiantes = User::where('rol', 'E')
        ->select('cedula', 'nombre', 'apellido')
        ->get();

    // Materias
    $materias = Materia::all();

    return Inertia::render('administrador/aulas/create', [
        'profesores' => $profesores,
        'estudiantes' => $estudiantes,
        'materias' => $materias,
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'semestre' => ['required', 'string', 'max:10'],
            'materia_codigo' => ['required', 'exists:materias,codigo'],
            'profesor_cedula' => ['required', 'exists:users,cedula'],
            'estudiantes' => ['nullable', 'array'],
            'estudiantes.*' => ['exists:users,cedula'],
        ]);

        $aula = Aula::create([
            'semestre' => $request->semestre,
            'materia_codigo' => $request->materia_codigo,
            'profesor_cedula' => $request->profesor_cedula,
        ]);

        if ($request->has('estudiantes')) {
            $aula->estudiantes()->attach($request->estudiantes);
        }

        return redirect()->route('aulasIndex')->with('message', 'Aula creada exitosamente.');
    }

    public function edit(Aula $aula)
    {
        $profesores = User::where('rol', 'P')->get();
        $materias = Materia::all();
        return Inertia::render('administrador/aulas/edit', compact('aula', 'profesores', 'materias'));
    }

    public function update(Request $request, Aula $aula)
    {
        $request->validate([
            'semestre' => ['required', 'string', 'max:10'],
            'materia_codigo' => ['required', 'exists:materias,codigo'],
            'profesor_cedula' => ['required', 'exists:users,cedula'],
        ]);

        $aula->update([
            'semestre' => $request->semestre,
            'materia_codigo' => $request->materia_codigo,
            'profesor_cedula' => $request->profesor_cedula,
        ]);

        return redirect()->route('aulasIndex')->with('message', 'Aula actualizada exitosamente.');
    }

    public function destroy($id)
    {
        $aula = Aula::findOrFail($id);
        $aula->delete();

        return redirect()->route('aulasIndex')->with('message', 'Aula eliminada exitosamente.');
    }
}
