<?php

namespace Database\Factories;

use App\Models\Materia;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Aula>
 */
class AulaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //Generar todos con el mismo semestre
            'semestre' => '2024-1',
            'materia_codigo' => Materia::inRandomOrder()->value('codigo'),
            'profesor_cedula' => User::where('rol', 'P')->inRandomOrder()->value('cedula'),
            
        ];
    }
}
