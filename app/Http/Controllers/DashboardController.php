<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Evaluacion;
use App\Models\Post;
use App\Models\Aula;
use App\Models\User;
use App\Models\Materia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        if ($user->rol === 'A') {
            $totalUsuarios = User::count();

            $totalEstudiantes = User::where('rol', 'E')->count();
            $totalProfesores = User::where('rol', 'P')->count();
            $totalAdmins = User::where('rol', 'A')->count();

            $totalAulas = Aula::count();

            $totalEvaluaciones = Evaluacion::count();

            $totalMaterias = Materia::count();

            return Inertia::render('administrador/dashboard', [
                'totalUsuarios' => $totalUsuarios,
                'totalEstudiantes' => $totalEstudiantes,
                'totalProfesores' => $totalProfesores,
                'totalAdmins' => $totalAdmins,
                'totalAulas' => $totalAulas,
                'totalEvaluaciones' => $totalEvaluaciones,
                'totalMaterias' => $totalMaterias
            ]);
        } else if ($user->rol === 'P') {
            $aulas = Aula::where('profesor_cedula', $user->cedula)
                ->with('materia:codigo,nombre')
                ->withCount('estudiantes as cantidad_estudiantes')
                ->get(['id', 'materia_codigo', 'semestre', 'profesor_cedula']);

            $cantidadAulas = $aulas->count();

            $aulaIds = $aulas->pluck('id');

            $cantidadEvaluaciones = Evaluacion::whereIn('aula_id', $aulaIds)->count();

            $cantidadEstudiantes = \DB::table('aula_usuario')
                ->whereIn('aula_id', $aulaIds)
                ->distinct()
                ->count('usuario_cedula');

            $evaluacionesRecientes = Evaluacion::whereIn('aula_id', $aulaIds)
                ->with('aula.materia:codigo,nombre')
                ->latest()
                ->limit(10)
                ->get();

            return Inertia::render('profesor/dashboard', [
                'cantidadAulas' => $cantidadAulas,
                'cantidadEvaluaciones' => $cantidadEvaluaciones,
                'cantidadEstudiantes' => $cantidadEstudiantes,
                'aulas' => $aulas,
                'evaluacionesRecientes' => $evaluacionesRecientes
            ]);

        } else if ($user->rol === 'E') {

            $aulas = $user->aulas()
                ->with([
                    'materia:codigo,nombre',
                    'profesor:cedula,nombre,apellido'
                ])->get(['aulas.id', 'materia_codigo', 'profesor_cedula', 'semestre']);

            $cantidadAulas = $aulas->count();

            $aulaIds = $aulas->pluck('id');

            $evaluaciones = Evaluacion::whereIn('aula_id', $aulaIds)
                ->with(['aula.materia:codigo,nombre'])
                ->with([
                    'usuarios' => function ($q) use ($user) {
                        $q->where('usuario_cedula', $user->cedula);
                    }
                ])->get();

            $evaluacionesTurnedIn = $evaluaciones->filter(function ($ev) {
                return $ev->usuarios->isNotEmpty();
            })->count();

            $evaluacionesNoTurnedIn = $evaluaciones->filter(function ($ev) {
                return $ev->usuarios->isEmpty();
            })->count();

            $evaluacionesOnTime = Evaluacion::whereIn('aula_id', $aulaIds)
                ->where('fecha_limite', '>', now())
                ->with('aula.materia:codigo,nombre')
                ->orderBy('fecha_limite')
                ->limit(10)
                ->get();

            $posts = Post::whereIn('aula_id', $aulaIds)
                ->latest()
                ->limit(10)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'tipo' => 'post',
                        'contenido' => $post->contenido,
                        'created_at' => $post->created_at,
                    ];
                });

            $evaluacionesTimeLine = Evaluacion::whereIn('aula_id', $aulaIds)
                ->latest()
                ->limit(10)
                ->get()
                ->map(function ($ev) {
                    return [
                        'id' => $ev->id,
                        'tipo' => 'evaluacion',
                        'contenido' => $ev->descripcion,
                        'created_at' => $ev->created_at,
                        'fecha_limite' => $ev->fecha_limite,
                    ];
                });

            $timeline = $posts
                ->concat($evaluacionesTimeLine)
                ->sortByDesc('created_at')
                ->take(10)
                ->values()
                ->all();


            return Inertia::render('estudiante/dashboard', [
                'aulas' => $aulas,
                'cantidadAulas' => $cantidadAulas,
                'evaluacionesTurnedIn' => $evaluacionesTurnedIn,
                'evaluacionesNoTurnedIn' => $evaluacionesNoTurnedIn,
                'evaluacionesOnTime' => $evaluacionesOnTime,
                'timeline' => $timeline
            ]);

        } else {
            abort(403, message: 'Acceso no autorizado');
        }
    }
}
