<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            //Se modifico para coincidir con los nuevos atributos de la tabla users
            'email' => $input['email'],
            'password' => $input['password'],
            'cedula' => $input['cedula'],
            'nombre' => $input['nombre'],
            'apellido' => $input['apellido'],
            'rol' => $input['rol'],
            'fecha_nacimiento' => $input['fecha_nacimiento'],
        ]);
    }
}
