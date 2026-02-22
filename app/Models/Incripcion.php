<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Incripcion extends Pivot
{
    public $timestamps = false;
    protected $table = 'aula_usuario';

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'aula_id',
        'usuario_cedula',
    ];
}
