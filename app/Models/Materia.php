<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['codigo', 'nombre'];

    public $timestamps = false;

    public function getRouteKeyName()
    {
        return 'codigo';
    }
}

