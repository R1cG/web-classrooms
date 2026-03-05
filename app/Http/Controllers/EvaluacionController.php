<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluacion;
use Inertia\Inertia;
use App\Models\Aula;
use Carbon\Carbon;

class EvaluacionController extends Controller
{
    public function create($aulaId)
    {

        $user = auth()->user();

        $aula = Aula::findOrFail($aulaId);

        if (($user->rol !== 'A') && ($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        if ($user->rol === 'A') {
            $directory = 'administrador';
        } else {
            $directory = 'profesor';
        }


        return Inertia::render("{$directory}/evaluaciones/create", [
            'aulaId' => $aulaId,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'aula_id' => 'required|exists:aulas,id',
            'fecha_limite' => 'required|date',
            'descripcion' => 'required|string|max:2000',
            'user_timezone' => 'required|string',
        ]);

        $user = auth()->user();

        $aula = Aula::findOrFail($request->aula_id);

        if (($user->rol !== 'A') && ($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        $localTime = $request->fecha_limite;
        $userTimezone = $request->user_timezone;
        $utcTime = Carbon::parse(
            $request->fecha_limite,
            $request->user_timezone
        )->utc();

        Evaluacion::create([
            'aula_id' => $request->aula_id,
            'fecha_limite' => $utcTime,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('aulasAccess', ['id' => $request->aula_id])
            ->with('success', 'Evaluación creada exitosamente.');
    }

    public function edit($evaluacionId)
    {

        $evaluacion = Evaluacion::findOrFail($evaluacionId);

        $user = auth()->user();

        $aula = Aula::findOrFail($evaluacion->aula_id);

        if (($user->rol !== 'A') && ($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        if ($user->rol === 'A') {
            $directory = 'administrador';
        } else {
            $directory = 'profesor';
        }

        return Inertia::render("{$directory}/evaluaciones/edit", [
            'evaluacion' => [
                'id' => $evaluacion->id,
                'fecha_limite' => $evaluacion->fecha_limite,
                'descripcion' => $evaluacion->descripcion,
            ],
        ]);
    }

    public function update(Request $request, $evaluacionId)
    {

        $evaluacion = Evaluacion::findOrFail($evaluacionId);

        $user = auth()->user();

        $aula = Aula::findOrFail($evaluacion->aula_id);

        if (($user->rol !== 'A') && ($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        $request->validate([
            'fecha_limite' => 'required|date',
            'descripcion' => 'required|string|max:2000',
        ]);

        $evaluacion->update([
            'fecha_limite' => $request->fecha_limite,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('aulasAccess', ['id' => $evaluacion->aula_id])
            ->with('success', 'Evaluación actualizada exitosamente.');
    }

    public function destroy($evaluacionId)
    {
        $evaluacion = Evaluacion::findOrFail($evaluacionId);

        $user = auth()->user();

        $aula = Aula::findOrFail($evaluacion->aula_id);

        if (($user->rol !== 'A') && ($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        $aulaId = $evaluacion->aula_id;
        $evaluacion->delete();

        return redirect()->route('aulasAccess', ['id' => $aulaId])
            ->with('success', 'Evaluación eliminada exitosamente.');
    }

    public function turn_in($evaluacionId)
    {
        $user = auth()->user();

        if ($user->rol !== 'E')
            abort(403, 'Acceso no autorizado');

        $evaluacion = Evaluacion::with('aula')->findOrFail($evaluacionId);

        $aula = $evaluacion->aula;

        $inscrito = $user->aulas()
            ->where('aulas.id', $aula->id)
            ->exists();

        if (!$inscrito)
            abort(403, 'Acceso no autorizado');

        $entrega = $evaluacion->usuarios()
            ->where('usuario_cedula', $user->cedula)
            ->first();

        return Inertia::render('estudiante/evaluaciones/turn_in', [
            'evaluacion' => [
                'id' => $evaluacion->id,
                'descripcion' => $evaluacion->descripcion,
                'fecha_limite' => $evaluacion->fecha_limite,
            ],
            'entrega' => $entrega ? [
                'url' => $entrega->pivot->url,
                'updated_at' => $entrega->pivot->updated_at,
            ] : null,
        ]);
    }

    public function turn_in_store(Request $request, $evaluacionId)
    {
        $user = auth()->user();
        if ($user->rol !== 'E')
            abort(403, 'Acceso no autorizado');

        $evaluacion = Evaluacion::with('aula')
            ->findOrFail($evaluacionId);
        $aula = $evaluacion->aula;

        $inscrito = $user->aulas()->where('aulas.id', $aula->id)->exists();
        if (!$inscrito)
            abort(403, 'Acceso no autorizado');

        $request->validate([
            'url' => 'required|string|max:500',
        ]);

        $existing = $evaluacion->usuarios()->where('usuario_cedula', $user->cedula)->exists();


        if ($existing)
            $evaluacion->usuarios()->updateExistingPivot($user->cedula, [
                'url' => $request->url,
            ]);
        else
            $evaluacion->usuarios()->attach(
                $user->cedula,
                [
                    'url' => $request->url,
                ]
            );

        $aulaId = $evaluacion->aula_id;

        return redirect()->route('aulasAccess', ['id' => $aulaId])
            ->with('success', 'Entrega registrada exitosamente.');

    }

    public function turn_ins($evaluacionId)
    {

        $user = auth()->user();

        $evaluacion = Evaluacion::with(['aula', 'usuarios'])
            ->findOrFail($evaluacionId);

        $aula = $evaluacion->aula;

        if ($aula->profesor_cedula !== $user->cedula && $user->rol === 'P')
            abort(403, 'Acceso no autorizado');

        $turnIns = $evaluacion->usuarios->map(function($student) use ($evaluacion){
            $sumittedAt = $student->pivot->updated_at;
            $deadline = $evaluacion->fecha_limite;

            return [
                'cedula' => $student->cedula,
                'nombre' => $student->nombre,
                'apellido' => $student->apellido,
                'url' => $student->pivot->url,
                'submitted_at' => $sumittedAt,
                'on_time' => $sumittedAt <= $deadline,
            ];
        });

        return Inertia::render('profesor/evaluaciones/turn_ins',
        [
            'evaluacion' => [
                'id' => $evaluacion->id,
                'descripcion' => $evaluacion->descripcion,
                'fecha_limite' => $evaluacion->fecha_limite,
            ],
            'turn_ins' => $turnIns->values()->toArray(),
        ]);
    }

}

