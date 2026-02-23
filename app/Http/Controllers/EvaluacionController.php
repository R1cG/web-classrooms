<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluacion;
use Inertia\Inertia;
use App\Models\Aula;

class EvaluacionController extends Controller
{
    public function create($aulaId)
    {

        $user = auth()->user();

        $aula = Aula::findOrFail($aulaId);

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }
        
        if ($user->rol === 'A'){
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
        ]);

        $user = auth()->user();

        $aula = Aula::findOrFail($request->aula_id);

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        Evaluacion::create([
            'aula_id' => $request->aula_id,
            'fecha_limite' => $request->fecha_limite,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('aulasAccess', ['id' => $request->aula_id])
            ->with('success', 'Evaluación creada exitosamente.');
    }

    public function edit($evaluacionId){

        $evaluacion = Evaluacion::findOrFail($evaluacionId);

        $user = auth()->user();

        $aula = Aula::findOrFail($evaluacion->aula_id);

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        if ($user->rol === 'A'){
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

    public function update(Request $request, $evaluacionId){

        $evaluacion = Evaluacion::findOrFail($evaluacionId);

        $user = auth()->user();

        $aula = Aula::findOrFail($evaluacion->aula_id);

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
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

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        $aulaId = $evaluacion->aula_id;
        $evaluacion->delete();

        return redirect()->route('aulasAccess', ['id' => $aulaId])
            ->with('success', 'Evaluación eliminada exitosamente.');
    }

}