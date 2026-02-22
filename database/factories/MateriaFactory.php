<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Materia>
 */
class MateriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => substr(fake()->word(3, true), 0, 10),

            //Generar un codigo unico de 7 caracteres
            'codigo' => fake()->unique()->numerify('#######'),
        ];
    }
}
