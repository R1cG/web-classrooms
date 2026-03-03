<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Entrega extends Pivot
{
    protected $table = 'usuario_evaluacion';

    public $incrementing = false;

    protected $fillable = [
        'evaluacion_id',
        'usuario_cedula',
        'url',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}