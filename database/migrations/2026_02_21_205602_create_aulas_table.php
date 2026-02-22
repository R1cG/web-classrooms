<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('aulas', function (Blueprint $table) {
            $table->id();
            $table->string('semestre', 10);
            $table->string('materia_codigo', 7);
            $table->string('profesor_cedula', 9);
            $table->foreign('materia_codigo')->references('codigo')->on('materias')->onDelete('cascade');
            $table->foreign('profesor_cedula')->references('cedula')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aulas');
    }
};
