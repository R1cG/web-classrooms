<?php

use App\Http\Controllers\MateriaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/materias', [MateriaController::class, 'index'
])->middleware(['auth', 'verified'])->name('materiasIndex');

Route::get('/materias/crear', [MateriaController::class, 'create'
])->middleware(['auth', 'verified'])->name('materiasCreate');

Route::post('/materias', [MateriaController::class, 'store'
])->middleware(['auth', 'verified'])->name('materiasStore');

Route::delete('/materias/{codigo}', [MateriaController::class, 'destroy'
])->middleware(['auth', 'verified'])->name('materiasDestroy');

Route::get('/materias/{materia}/editar', [MateriaController::class, 'edit'
])->middleware(['auth', 'verified'])->name('materiasEdit');

Route::put('/materias/{materia}', [MateriaController::class, 'update'
])->middleware(['auth', 'verified'])->name('materiasUpdate');


require __DIR__.'/settings.php';
