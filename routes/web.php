<?php

use App\Http\Controllers\MateriaController;
use App\Http\Controllers\UsuarioController;
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

Route::get('/usuarios', [UsuarioController::class, 'index']
)->middleware(['auth', 'verified'])->name('usuariosIndex');

Route::get('/usuarios/crear', [UsuarioController::class, 'create'
])->middleware(['auth', 'verified'])->name('usuariosCreate');

Route::post('/usuarios', [UsuarioController::class, 'store'
])->middleware(['auth', 'verified'])->name('usuariosStore');

Route::delete('/usuarios/{cedula}', [UsuarioController::class, 'destroy'
])->middleware(['auth', 'verified'])->name('usuariosDestroy');

Route::get('/usuarios/{usuario}/editar', [UsuarioController::class, 'edit'
])->middleware(['auth', 'verified'])->name('usuariosEdit');

Route::put('/usuarios/{usuario}', [UsuarioController::class, 'update'
])->middleware(['auth', 'verified'])->name('usuariosUpdate');



require __DIR__.'/settings.php';
