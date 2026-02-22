<?php

use App\Http\Controllers\MateriaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', [DashboardController::class, 'dashboard']
)->middleware(['auth', 'verified'])->name('dashboard');

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

Route::get('/aulas', [AulaController::class, 'index']
)->middleware(['auth', 'verified'])->name('aulasIndex');

Route::get('/aulas/crear', [AulaController::class, 'create']
)->middleware(['auth', 'verified'])->name('aulasCreate');

Route::post('/aulas', [AulaController::class, 'store']
)->middleware(['auth', 'verified'])->name('aulasStore');
Route::delete('/aulas/{id}', [AulaController::class, 'destroy']
)->middleware(['auth', 'verified'])->name('aulasDestroy');

Route::get('/aulas/{aula}/editar', [AulaController::class, 'edit']
)->middleware(['auth', 'verified'])->name('aulasEdit');

Route::put('/aulas/{aula}', [AulaController::class, 'update']
)->middleware(['auth', 'verified'])->name('aulasUpdate');





require __DIR__.'/settings.php';
