<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('phases', function (Blueprint $table) {
            $table->id();
            $table->string('world');                        // ex: 'portugues', 'matematica'
            $table->unsignedTinyInteger('number');         // 1–5
            $table->string('title');
            $table->unsignedTinyInteger('school_year');    // 1–5
            $table->string('character_key')->nullable();   // personagem guia
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique(['world', 'number', 'school_year']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('phases');
    }
};
