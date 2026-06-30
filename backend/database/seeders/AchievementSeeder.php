<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            ['key' => 'first_star',    'name' => 'Primeira Estrela!',  'description' => 'Ganhou a primeira estrela',      'icon' => '⭐', 'condition_type' => 'stars_total',      'condition_value' => 1],
            ['key' => 'ten_stars',     'name' => 'Colecionador',       'description' => 'Acumulou 10 estrelas',           'icon' => '🌟', 'condition_type' => 'stars_total',      'condition_value' => 10],
            ['key' => 'perfect_phase', 'name' => 'Perfeição!',         'description' => 'Fase com 3 estrelas',           'icon' => '💎', 'condition_type' => 'perfect_phase',    'condition_value' => 1],
            ['key' => 'five_phases',   'name' => 'Explorador',         'description' => 'Completou 5 fases',             'icon' => '🗺️', 'condition_type' => 'phases_complete', 'condition_value' => 5],
            ['key' => 'world_master',  'name' => 'Mestre do Mundo',    'description' => 'Completou um mundo inteiro',    'icon' => '🏆', 'condition_type' => 'world_complete',   'condition_value' => 1],
            ['key' => 'streak_5',      'name' => 'Em Chamas!',         'description' => '5 respostas certas seguidas',  'icon' => '🔥', 'condition_type' => 'streak',           'condition_value' => 5],
        ];

        foreach ($achievements as $a) {
            Achievement::updateOrCreate(['key' => $a['key']], $a);
        }
    }
}
