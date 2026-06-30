<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon', 8)->nullable();
            $table->string('condition_type');   // ex: 'stars_total', 'phases_complete', 'perfect_phase'
            $table->unsignedInteger('condition_value');
            $table->timestamps();
        });

        Schema::create('user_achievements', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('achievement_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->primary(['user_id', 'achievement_id']);
        });

        Schema::create('user_characters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('character_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('level')->default(1);   // 1–5
            $table->unsignedInteger('xp')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'character_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_characters');
        Schema::dropIfExists('user_achievements');
        Schema::dropIfExists('achievements');
    }
};
