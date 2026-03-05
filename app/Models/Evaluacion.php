<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{

    protected $table = 'evaluaciones';

    protected $fillable = ['aula_id', 'fecha_limite', 'descripcion'];
    protected $casts = [
        'fecha_limite' => 'datetime',
    ];

    public function aula()
    {
        return $this->belongsTo(Aula::class, 'aula_id');
    }

    public function usuarios()
    {
        return $this->belongsToMany(
            User::class,
            'usuario_evaluacion',
            'evaluacion_id',
            'usuario_cedula'
        )->using(Entrega::class)
            ->withPivot('url')
            ->withTimestamps();
    }
}
