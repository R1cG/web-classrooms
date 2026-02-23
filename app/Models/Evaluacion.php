<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{

protected $table = 'evaluaciones';

protected $fillable = ['aula_id', 'fecha_limite', 'descripcion'];

    public function aula()
    {
        return $this->belongsTo(Aula::class, 'aula_id');
    }
}
