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

        $user = auth()->user();

        if($user->rol === 'A') {
            $aulas = Aula::with(['materia', 'profesor'])->
            withCount('estudiantes as cantidad_estudiantes')->get();
            $directory = 'administrador';
        } else if($user->rol === 'P') {
            $aulas = Aula::with(['materia', 'profesor'])->
            withCount('estudiantes as cantidad_estudiantes')
            ->where('profesor_cedula', $user->cedula)
            ->get();
            $directory = 'profesor';
        } else if($user->rol === 'E') {
            $aulas = $user->aulas()->with(['materia', 'profesor'])->get();
            $directory = 'estudiante';
        } else {
            abort(403, 'Acceso no autorizado');
        }


        return Inertia::render($directory . '/aulas/index', compact('aulas'));
    }

    public function create()
{

    $user = auth()->user();

    if ($user->rol !== 'A') {
        abort(403, 'Acceso no autorizado');
    }

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

    $user = auth()->user();

    if ($user->rol !== 'A') {
        abort(403, 'Acceso no autorizado');
    }
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

    $user = auth()->user();

    if ($user->rol !== 'A') {
        abort(403, 'Acceso no autorizado');
    }

        $aula->load(['materia', 
        'profesor:cedula,nombre,apellido', 
        'estudiantes:cedula,nombre,apellido']);

        $estudiantes = User::where('rol', 'E')
            ->select('cedula', 'nombre', 'apellido')
            ->get();

        return Inertia::render(
            'administrador/aulas/edit', 
            [
                'aula' => [
                    'id' => $aula->id,
                    'semestre' => $aula->semestre,
                    'materia' => $aula->materia->nombre . ' (' . $aula->materia_codigo . ')',
                    'profesor' => $aula->profesor->nombre . ' ' . $aula->profesor->apellido . ' (' . $aula->profesor_cedula . ')',
                ],
                'estudiantes' => $estudiantes,
                'estudiantesInscritos' => $aula->estudiantes->pluck('cedula'),
            ]);
    }

    public function update(Request $request, Aula $aula)
    {

    $user = auth()->user();

    if ($user->rol !== 'A') {
        abort(403, 'Acceso no autorizado');
    }
        $request->validate([
            'estudiantes' => ['nullable', 'array'],
            'estudiantes.*' => ['exists:users,cedula'],
        ]);

        $aula->estudiantes()->sync($request->estudiantes ?? []);    

        return redirect()->route('aulasIndex')->with('message', 'Aula actualizada exitosamente.');
    }

    public function destroy($id)
    {

    $user = auth()->user();

    if ($user->rol !== 'A') {
        abort(403, 'Acceso no autorizado');
    }
        $aula = Aula::findOrFail($id);
        $aula->delete();

        return redirect()->route('aulasIndex')->with('message', 'Aula eliminada exitosamente.');
    }
}
