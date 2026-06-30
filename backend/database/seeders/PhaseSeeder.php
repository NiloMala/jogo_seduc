<?php

namespace Database\Seeders;

use App\Models\Phase;
use App\Models\Question;
use Illuminate\Database\Seeder;

class PhaseSeeder extends Seeder
{
    public function run(): void
    {
        $phases = [
            // === 1º ANO — PORTUGUÊS ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 1, 'title' => 'O Alfabeto', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'Qual letra começa a palavra BOLA?', 'options' => ['A', 'B', 'C', 'D'], 'correct' => 'B', 'bncc_code' => 'EF01LP01'],
                ['question' => 'Qual letra começa a palavra GATO?', 'options' => ['F', 'G', 'H', 'I'], 'correct' => 'G', 'bncc_code' => 'EF01LP01'],
                ['question' => 'Qual letra começa a palavra PATO?', 'options' => ['O', 'P', 'Q', 'R'], 'correct' => 'P', 'bncc_code' => 'EF01LP01'],
                ['question' => 'Qual letra começa a palavra ABELHA?', 'options' => ['A', 'B', 'E', 'L'], 'correct' => 'A', 'bncc_code' => 'EF01LP01'],
                ['question' => 'Qual letra começa a palavra UVAS?', 'options' => ['U', 'V', 'A', 'S'], 'correct' => 'U', 'bncc_code' => 'EF01LP01'],
             ]],

            // === 1º ANO — MATEMÁTICA ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 1, 'title' => 'Contando Objetos', 'character_key' => 'byte',
             'questions' => [
                ['question' => 'Quantas bolinhas? 🔵🔵🔵', 'options' => ['1', '2', '3', '4'], 'correct' => '3', 'bncc_code' => 'EF01MA01'],
                ['question' => 'Qual número vem depois do 4?', 'options' => ['3', '4', '5', '6'], 'correct' => '5', 'bncc_code' => 'EF01MA01'],
                ['question' => 'Quantas estrelas? ⭐⭐⭐⭐⭐', 'options' => ['3', '4', '5', '6'], 'correct' => '5', 'bncc_code' => 'EF01MA01'],
                ['question' => 'Qual é o maior número? 2, 5, 1, 3', 'options' => ['2', '5', '1', '3'], 'correct' => '5', 'bncc_code' => 'EF01MA02'],
                ['question' => '2 + 3 = ?', 'options' => ['4', '5', '6', '7'], 'correct' => '5', 'bncc_code' => 'EF01MA03'],
             ]],

            // === 1º ANO — CIÊNCIAS ===
            ['world' => 'ciencias', 'number' => 1, 'school_year' => 1, 'title' => 'Meu Corpo', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'Com o que enxergamos?', 'options' => ['Nariz', 'Ouvidos', 'Olhos', 'Mãos'], 'correct' => 'Olhos', 'bncc_code' => 'EF01CI01', 'type' => 'multiple_choice'],
                ['question' => 'Com o que ouvimos?', 'options' => ['Olhos', 'Nariz', 'Ouvidos', 'Boca'], 'correct' => 'Ouvidos', 'bncc_code' => 'EF01CI01'],
                ['question' => 'Plantas precisam de água para viver.', 'options' => ['Verdadeiro', 'Falso'], 'correct' => 'Verdadeiro', 'type' => 'true_false', 'bncc_code' => 'EF01CI02'],
                ['question' => 'O sol nasce de manhã.', 'options' => ['Verdadeiro', 'Falso'], 'correct' => 'Verdadeiro', 'type' => 'true_false', 'bncc_code' => 'EF01CI02'],
                ['question' => 'O que os animais precisam para viver?', 'options' => ['Água e comida', 'Só comida', 'Só água', 'Nada'], 'correct' => 'Água e comida', 'bncc_code' => 'EF01CI02'],
             ]],

            // === 2º ANO — PORTUGUÊS ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 2, 'title' => 'Sílabas', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'Quantas sílabas tem a palavra GATO?', 'options' => ['1', '2', '3', '4'], 'correct' => '2', 'bncc_code' => 'EF02LP01'],
                ['question' => 'Quantas sílabas tem BORBOLETA?', 'options' => ['3', '4', '5', '6'], 'correct' => '4', 'bncc_code' => 'EF02LP01'],
                ['question' => 'Qual é a sílaba inicial de PATO?', 'options' => ['TO', 'PA', 'AT', 'PO'], 'correct' => 'PA', 'bncc_code' => 'EF02LP02'],
                ['question' => 'Qual palavra rima com SOL?', 'options' => ['PÉ', 'LUA', 'MEL', 'CÉU'], 'correct' => 'MEL', 'bncc_code' => 'EF02LP05'],
                ['question' => 'Quantas sílabas tem ESCOLA?', 'options' => ['2', '3', '4', '5'], 'correct' => '3', 'bncc_code' => 'EF02LP01'],
             ]],

            // === 3º ANO — MATEMÁTICA ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 3, 'title' => 'Tabuada do 2', 'character_key' => 'byte',
             'questions' => [
                ['question' => '2 × 3 = ?', 'options' => ['4', '5', '6', '7'], 'correct' => '6', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 5 = ?', 'options' => ['8', '9', '10', '11'], 'correct' => '10', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 7 = ?', 'options' => ['12', '13', '14', '15'], 'correct' => '14', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 9 = ?', 'options' => ['16', '17', '18', '19'], 'correct' => '18', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 4 = ?', 'options' => ['6', '7', '8', '9'], 'correct' => '8', 'bncc_code' => 'EF03MA07'],
             ]],
        ];

        foreach ($phases as $phaseData) {
            $questions = $phaseData['questions'] ?? [];
            unset($phaseData['questions']);

            $phase = Phase::updateOrCreate(
                ['world' => $phaseData['world'], 'number' => $phaseData['number'], 'school_year' => $phaseData['school_year']],
                $phaseData
            );

            foreach ($questions as $i => $q) {
                Question::updateOrCreate(
                    ['phase_id' => $phase->id, 'order' => $i + 1],
                    [
                        'question'    => $q['question'],
                        'type'        => $q['type'] ?? 'multiple_choice',
                        'options'     => $q['options'] ?? null,
                        'correct'     => $q['correct'],
                        'bncc_code'   => $q['bncc_code'] ?? null,
                        'explanation' => $q['explanation'] ?? null,
                        'order'       => $i + 1,
                    ]
                );
            }
        }
    }
}
