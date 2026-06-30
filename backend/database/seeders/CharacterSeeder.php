<?php

namespace Database\Seeders;

use App\Models\Character;
use Illuminate\Database\Seeder;

class CharacterSeeder extends Seeder
{
    public function run(): void
    {
        $characters = [
            ['key' => 'luma',   'name' => 'Luma',   'emoji' => '🦉', 'specialty' => 'Leitura e Português',         'personality' => 'Calma, inteligente e paciente',  'color' => '#7c4dff', 'world' => 'portugues'],
            ['key' => 'byte',   'name' => 'Byte',   'emoji' => '🤖', 'specialty' => 'Lógica e Matemática',          'personality' => 'Divertido e analítico',           'color' => '#0288d1', 'world' => 'matematica'],
            ['key' => 'faisca', 'name' => 'Faísca', 'emoji' => '🦊', 'specialty' => 'Desafios e missões',           'personality' => 'Corajosa e energética',           'color' => '#e65100', 'world' => null],
            ['key' => 'teo',    'name' => 'Téo',    'emoji' => '🐢', 'specialty' => 'Concentração e memória',       'personality' => 'Tranquila e sábia',              'color' => '#2e7d32', 'world' => null],
            ['key' => 'nino',   'name' => 'Nino',   'emoji' => '🐵', 'specialty' => 'Criatividade',                 'personality' => 'Brincalhão e inventivo',         'color' => '#f57c00', 'world' => 'historia'],
            ['key' => 'bia',    'name' => 'Bia',    'emoji' => '🦫', 'specialty' => 'Natureza, geografia e ciências','personality' => 'Simpática e curiosa',           'color' => '#00838f', 'world' => 'ciencias'],
        ];

        foreach ($characters as $c) {
            Character::updateOrCreate(['key' => $c['key']], $c);
        }
    }
}
