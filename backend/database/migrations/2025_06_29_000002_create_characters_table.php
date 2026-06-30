<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();       // ex: 'luma', 'byte'
            $table->string('name');
            $table->string('emoji', 8);
            $table->string('specialty');
            $table->text('personality')->nullable();
            $table->string('color', 10)->default('#6c3fc5');
            $table->string('world')->nullable();   // ex: 'portugues'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
