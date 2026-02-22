<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Materia;
use App\Models\Aula;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User seeder
        User::factory(10)->profesor()->create();
        User::factory(50)->estudiante()->create();

        //Materia seeder
        Materia::factory(10)->create();

        //Aula seeder
        Aula::factory(3)->create();
    }
}


