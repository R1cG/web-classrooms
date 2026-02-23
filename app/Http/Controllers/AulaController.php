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

        if ($user->rol === 'A') {
            $aulas = Aula::with(['materia', 'profesor'])->
                withCount('estudiantes as cantidad_estudiantes')->get();
            $directory = 'administrador';
        } else if ($user->rol === 'P') {
            $aulas = Aula::where('profesor_cedula', $user->cedula)
                ->with('materia:codigo,nombre')
                ->withCount('estudiantes as cantidad_estudiantes')
                ->get(['id', 'semestre', 'materia_codigo']);
            $directory = 'profesor';
        } else if ($user->rol === 'E') {
            $aulas = $user->aulas()
                ->with([
                    'materia:codigo,nombre',
                    'profesor:cedula,nombre,apellido'
                ])
                ->get(['aulas.id', 'semestre', 'materia_codigo', 'profesor_cedula']);
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

        $aula->load([
            'materia',
            'profesor:cedula,nombre,apellido',
            'estudiantes:cedula,nombre,apellido'
        ]);

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
            ]
        );
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

    public function access($id)
    {

        $user = auth()->user();

        $aula = Aula::with([
            'materia:codigo,nombre',
            'posts' => function ($query) {
                $query->latest();
            },
            'evaluaciones' => function ($query) {
                $query->latest();
            }
        ])->findOrFail($id);

        if (
            ($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula) &&
            $user->rol !== 'A' &&
            ($user->rol !== 'E' || !$user->aulas()->where('aula_id', $aula->id)->exists())
        ) {
            abort(403, 'Acceso no autorizado');
        }
        ;

        if ($user->rol === 'A') {
            $directory = 'administrador';
        } else if ($user->rol === 'P') {
            $directory = 'profesor';
        } else {
            $directory = 'estudiante';
        }

        $postCollection = $aula->posts->map(function ($post) {
            return [
                'id' => $post->id,
                'tipo' => 'post',
                'contenido' => $post->contenido,
                'created_at' => $post->created_at,
            ];
        });

        $evaluacionCollection = $aula->evaluaciones->map(function ($evaluacion) {
            return [
                'id' => $evaluacion->id,
                'tipo' => 'evaluacion',
                'contenido' => $evaluacion->descripcion,
                'fecha_limite' => $evaluacion->fecha_limite,
                'created_at' => $evaluacion->created_at,
            ];
        });

        $timeline = $postCollection->concat($evaluacionCollection)->sortByDesc('created_at')->values()->all();

        return Inertia::render($directory . '/aulas/access', [
            'aula' => [
                'id' => $aula->id,
                'semestre' => $aula->semestre,
                'materia_nombre' => $aula->materia->nombre,
                'materia_codigo' => $aula->materia_codigo,
            ],
            'timeline' => $timeline,
        ]);
    }
}
