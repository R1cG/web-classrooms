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
        Schema::create('usuario_evaluacion', function (Blueprint $table) {
            $table->unsignedBigInteger('evaluacion_id');
            $table->string('usuario_cedula', 9);
            $table->string('url', 500);

            $table->primary(['evaluacion_id', 'usuario_cedula']);

            $table->foreign('evaluacion_id')->references('id')->on('evaluaciones')->onDelete('cascade');
            $table->foreign('usuario_cedula')->references('cedula')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entregas');
    }
};
