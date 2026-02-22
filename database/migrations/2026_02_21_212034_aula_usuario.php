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
        //Relacion de inscripcion a un aula
        Schema::create('aula_usuario', function (Blueprint $table) {
            //$table->id();
            $table->unsignedBigInteger('aula_id');
            $table->string('usuario_cedula', 9);

            $table->primary(['aula_id', 'usuario_cedula']);

            $table->foreign('aula_id')->references('id')->on('aulas')->onDelete('cascade');
            $table->foreign('usuario_cedula')->references('cedula')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
