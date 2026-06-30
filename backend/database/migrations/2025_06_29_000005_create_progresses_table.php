<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('phase_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('stars')->default(0);   // 0–3
            $table->unsignedSmallInteger('score')->default(0);
            $table->unsignedTinyInteger('correct')->default(0);
            $table->unsignedTinyInteger('total')->default(0);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'phase_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progresses');
    }
};
