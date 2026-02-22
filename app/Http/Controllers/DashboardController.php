<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        if($user->rol === 'A'){
            return Inertia::render('administrador/dashboard');
        } else if($user->rol === 'P'){
            return Inertia::render('profesor/dashboard');
        } else if($user->rol === 'E'){
            return Inertia::render('estudiante/dashboard');
        } else {
            abort(403, message: 'Acceso no autorizado');
        }
    }
}
