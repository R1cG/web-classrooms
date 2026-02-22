<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{

    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'semestre',
        'materia_codigo',
        'profesor_cedula',
    ];

    //Relacion con materia
    public function materia()
    {
        return $this->belongsTo(Materia::class, 'materia_codigo', 'codigo');
    }

    //Relacion con profesor
    public function profesor()
    {
        return $this->belongsTo(User::class, 'profesor_cedula', 'cedula');
    }

    public function estudiantes()
    {
        return $this->belongsToMany(
            User::class,
            'aula_usuario',
            'aula_id',
            'usuario_cedula'
        )->using(Incripcion::class)
            ->withPivot('aula_id', 'usuario_cedula');
    }
}
