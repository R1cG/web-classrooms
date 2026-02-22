<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    //Se modifico el sistema convencional de Laravel para crear usuarios,
    //ahora se usa cedula como llave primaria, por lo que se debe modificar
    //el sistema de creacion y autentificacion

    protected $primaryKey = 'cedula';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'cedula',
        'nombre',
        'apellido',
        'rol',
        'fecha_nacimiento',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    //Modificacion del getName para asegurar si funciona el dashboard
    public function getNameAttribute(): string
    {
        return $this->nombre . ' ' . $this->apellido;
    }

    //relacion con aulas
    public function aulas()
    {
        return $this->belongsToMany(Aula::class, 'aula_usuario', 'usuario_cedula', 'aula_id')->using(Incripcion::class);
    }
}
