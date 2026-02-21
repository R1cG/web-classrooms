<?php

namespace App\Http\Controllers;

use App\Models\Materia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MateriaController extends Controller
{
    public function index()
    {

        $materias = Materia::all();

        return Inertia::render('administrador/materias/index', compact('materias'));
    }

    public function create()
    {
        return Inertia::render(component: 'administrador/materias/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'codigo' => ['required', 'digits:7', 'unique:materias,codigo'],
            'nombre' => ['required', 'string', 'max:40'],
        ]);

        Materia::create([
            'codigo' => $request->codigo,
            'nombre' => $request->nombre,
        ]);

        return redirect()->route('materiasIndex')->with('message', 'Materia creada exitosamente.');
    }

    public function destroy($codigo)
    {
        $materia = Materia::findOrFail($codigo);
        $materia->delete();

        return redirect()->route('materiasIndex')->with('message', 'Materia eliminada exitosamente.');
    }

    public function edit(Materia $materia)
    {
        return Inertia::render('administrador/materias/edit', compact('materia'));
    }

    public function update(Request $request, Materia $materia)
    {
        $request->validate([
            'nombre' => ['required', 'string', 'max:40'],
        ]);

        $materia->update([
            'nombre' => $request->nombre,
        ]);

        return redirect()->route('materiasIndex')->with('message', 'Materia actualizada exitosamente.');
    }
}
