<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            CharacterSeeder::class,
            PhaseSeeder::class,
            AchievementSeeder::class,
        ]);

        // Usuário de teste
        User::factory()->create([
            'name'        => 'Aluno Teste',
            'email'       => 'aluno@teste.com',
            'school_year' => 1,
        ]);
    }
}
