<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Materia extends Model
{
    use HasFactory;

    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['codigo', 'nombre'];

    public $timestamps = false;

    public function getRouteKeyName()
    {
        return 'codigo';
    }

    //Relacion con aula
    public function aulas()
    {
        return $this->hasMany(Aula::class, 'materia_codigo', 'codigo');
    }
}

