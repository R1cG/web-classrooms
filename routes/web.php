<?php

use App\Http\Controllers\MateriaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EvaluacionController;

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

Route::get('/aulas/access/{id}', [AulaController::class, 'access']
)->middleware(['auth', 'verified'])->name('aulasAccess');

Route::get('/posts/crear/{aulaId}', [PostController::class, 'create'
])->middleware(['auth', 'verified'])->name('postsCreate');

Route::post('/posts', [PostController::class, 'store'
])->middleware(['auth', 'verified'])->name('postsStore');

Route::delete('/posts/{id}', [PostController::class, 'destroy']
)->middleware(['auth', 'verified'])->name('postsDestroy');

Route::get('/posts/{post}/editar', [PostController::class, 'edit'
])->middleware(['auth', 'verified'])->name('postsEdit');

Route::put('/posts/{post}', [PostController::class, 'update'
])->middleware(['auth', 'verified'])->name('postsUpdate');

Route::get('/evaluaciones/crear/{aulaId}', [EvaluacionController::class, 'create'
])->middleware(['auth', 'verified'])->name('evaluacionesCreate');

Route::post('/evaluaciones', [EvaluacionController::class, 'store'
])->middleware(['auth', 'verified'])->name('evaluacionesStore');

Route::delete('/evaluaciones/{id}', [EvaluacionController::class, 'destroy']
)->middleware(['auth', 'verified'])->name('evaluacionesDestroy');

Route::get('/evaluaciones/{evaluacion}/editar', [EvaluacionController::class, 'edit'
])->middleware(['auth', 'verified'])->name('evaluacionesEdit');

Route::put('/evaluaciones/{evaluacion}', [EvaluacionController::class, 'update'
])->middleware(['auth', 'verified'])->name('evaluacionesUpdate');

require __DIR__.'/settings.php';
