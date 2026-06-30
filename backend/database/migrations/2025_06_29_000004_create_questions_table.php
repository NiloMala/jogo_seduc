<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('phase_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->string('type')->default('multiple_choice');  // multiple_choice | true_false | fill_blank | order
            $table->json('options')->nullable();                 // array de strings
            $table->string('correct');                           // valor correto
            $table->text('explanation')->nullable();
            $table->string('bncc_code')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
