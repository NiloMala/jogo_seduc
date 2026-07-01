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
            // === 1º ANO — PORTUGUÊS (caixa alta) ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 1, 'title' => 'O Alfabeto', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'QUAL LETRA COMEÇA A PALAVRA BOLA?', 'options' => ['A', 'B', 'C', 'D'], 'correct' => 'B', 'bncc_code' => 'EF01LP01'],
                ['question' => 'QUAL LETRA COMEÇA A PALAVRA GATO?', 'options' => ['F', 'G', 'H', 'I'], 'correct' => 'G', 'bncc_code' => 'EF01LP01'],
                ['question' => 'QUAL LETRA COMEÇA A PALAVRA PATO?', 'options' => ['O', 'P', 'Q', 'R'], 'correct' => 'P', 'bncc_code' => 'EF01LP01'],
                ['question' => 'QUAL LETRA COMEÇA A PALAVRA ABELHA?', 'options' => ['A', 'B', 'E', 'L'], 'correct' => 'A', 'bncc_code' => 'EF01LP01'],
                ['question' => 'QUAL LETRA COMEÇA A PALAVRA UVAS?', 'options' => ['U', 'V', 'A', 'S'], 'correct' => 'U', 'bncc_code' => 'EF01LP01'],
                ['question' => 'QUAL LETRA TERMINA A PALAVRA SOL?', 'options' => ['L', 'O', 'S', 'N'], 'correct' => 'L', 'bncc_code' => 'EF01LP01'],
                ['question' => 'QUANTAS LETRAS TEM A PALAVRA CASA?', 'options' => ['3', '4', '5', '6'], 'correct' => '4', 'bncc_code' => 'EF01LP02'],
             ]],

            // === 1º ANO — MATEMÁTICA (caixa alta) ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 1, 'title' => 'Contando Objetos', 'character_key' => 'byte',
             'questions' => [
                ['question' => 'QUANTAS BOLINHAS? 🔵🔵🔵', 'options' => ['1', '2', '3', '4'], 'correct' => '3', 'bncc_code' => 'EF01MA01'],
                ['question' => 'QUAL NÚMERO VEM DEPOIS DO 4?', 'options' => ['3', '4', '5', '6'], 'correct' => '5', 'bncc_code' => 'EF01MA01'],
                ['question' => 'QUANTAS ESTRELAS? ⭐⭐⭐⭐⭐', 'options' => ['3', '4', '5', '6'], 'correct' => '5', 'bncc_code' => 'EF01MA01'],
                ['question' => 'QUAL É O MAIOR NÚMERO? 2, 5, 1, 3', 'options' => ['2', '5', '1', '3'], 'correct' => '5', 'bncc_code' => 'EF01MA02'],
                ['question' => '2 + 3 = ?', 'options' => ['4', '5', '6', '7'], 'correct' => '5', 'bncc_code' => 'EF01MA03'],
                ['question' => 'QUAL NÚMERO VEM ANTES DO 7?', 'options' => ['5', '6', '8', '9'], 'correct' => '6', 'bncc_code' => 'EF01MA01'],
                ['question' => 'QUANTOS DEDOS TEM UMA MÃO?', 'options' => ['4', '5', '6', '7'], 'correct' => '5', 'bncc_code' => 'EF01MA01'],
             ]],

            // === 2º ANO — MATEMÁTICA (caixa alta) ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 2, 'title' => 'Somar e Subtrair', 'character_key' => 'byte',
             'questions' => [
                ['question' => 'QUANTO É 5 + 4?', 'options' => ['7', '8', '9', '10'], 'correct' => '9', 'bncc_code' => 'EF02MA06'],
                ['question' => 'QUANTO É 10 - 3?', 'options' => ['5', '6', '7', '8'], 'correct' => '7', 'bncc_code' => 'EF02MA06'],
                ['question' => 'QUAL É O DOBRO DE 6?', 'options' => ['10', '11', '12', '13'], 'correct' => '12', 'bncc_code' => 'EF02MA08'],
                ['question' => 'QUANTO É 8 + 7?', 'options' => ['13', '14', '15', '16'], 'correct' => '15', 'bncc_code' => 'EF02MA06'],
                ['question' => 'QUAL NÚMERO É MAIOR: 45 OU 54?', 'options' => ['45', '54', '50', '40'], 'correct' => '54', 'bncc_code' => 'EF02MA02'],
                ['question' => 'QUANTO É 9 - 5?', 'options' => ['3', '4', '5', '6'], 'correct' => '4', 'bncc_code' => 'EF02MA06'],
             ]],

            // === 1º ANO — CIÊNCIAS (caixa alta) ===
            ['world' => 'ciencias', 'number' => 1, 'school_year' => 1, 'title' => 'Meu Corpo', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'COM O QUE ENXERGAMOS?', 'options' => ['NARIZ', 'OUVIDOS', 'OLHOS', 'MÃOS'], 'correct' => 'OLHOS', 'bncc_code' => 'EF01CI01', 'type' => 'multiple_choice'],
                ['question' => 'COM O QUE OUVIMOS?', 'options' => ['OLHOS', 'NARIZ', 'OUVIDOS', 'BOCA'], 'correct' => 'OUVIDOS', 'bncc_code' => 'EF01CI01'],
                ['question' => 'PLANTAS PRECISAM DE ÁGUA PARA VIVER.', 'options' => ['VERDADEIRO', 'FALSO'], 'correct' => 'VERDADEIRO', 'type' => 'true_false', 'bncc_code' => 'EF01CI02'],
                ['question' => 'O SOL NASCE DE MANHÃ.', 'options' => ['VERDADEIRO', 'FALSO'], 'correct' => 'VERDADEIRO', 'type' => 'true_false', 'bncc_code' => 'EF01CI02'],
                ['question' => 'O QUE OS ANIMAIS PRECISAM PARA VIVER?', 'options' => ['ÁGUA E COMIDA', 'SÓ COMIDA', 'SÓ ÁGUA', 'NADA'], 'correct' => 'ÁGUA E COMIDA', 'bncc_code' => 'EF01CI02'],
                ['question' => 'COM O QUE SENTIMOS OS CHEIROS?', 'options' => ['BOCA', 'NARIZ', 'OLHOS', 'PÉ'], 'correct' => 'NARIZ', 'bncc_code' => 'EF01CI01'],
                ['question' => 'QUANTOS OLHOS TEM UMA PESSOA?', 'options' => ['1', '2', '3', '4'], 'correct' => '2', 'bncc_code' => 'EF01CI01'],
             ]],

            // === 2º ANO — CIÊNCIAS (caixa alta) ===
            ['world' => 'ciencias', 'number' => 1, 'school_year' => 2, 'title' => 'Seres Vivos', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'QUAL DESTES ANIMAIS É UM MAMÍFERO?', 'options' => ['CACHORRO', 'GALINHA', 'PEIXE', 'SAPO'], 'correct' => 'CACHORRO', 'bncc_code' => 'EF02CI02'],
                ['question' => 'AS PLANTAS PRODUZEM O PRÓPRIO ALIMENTO.', 'options' => ['VERDADEIRO', 'FALSO'], 'correct' => 'VERDADEIRO', 'type' => 'true_false', 'bncc_code' => 'EF02CI03'],
                ['question' => 'QUAL DESTES SERES VIVOS VOA?', 'options' => ['CACHORRO', 'PASSARINHO', 'PEIXE', 'MINHOCA'], 'correct' => 'PASSARINHO', 'bncc_code' => 'EF02CI02'],
                ['question' => 'QUAL PARTE DA PLANTA ABSORVE ÁGUA?', 'options' => ['FOLHA', 'RAIZ', 'FLOR', 'CAULE'], 'correct' => 'RAIZ', 'bncc_code' => 'EF02CI03'],
                ['question' => 'OS PEIXES VIVEM NA ÁGUA.', 'options' => ['VERDADEIRO', 'FALSO'], 'correct' => 'VERDADEIRO', 'type' => 'true_false', 'bncc_code' => 'EF02CI02'],
                ['question' => 'QUAL DESTES ANIMAIS PÕE OVOS?', 'options' => ['CACHORRO', 'GATO', 'GALINHA', 'VACA'], 'correct' => 'GALINHA', 'bncc_code' => 'EF02CI02'],
             ]],

            // === 2º ANO — PORTUGUÊS (caixa alta) ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 2, 'title' => 'Sílabas', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'QUANTAS SÍLABAS TEM A PALAVRA GATO?', 'options' => ['1', '2', '3', '4'], 'correct' => '2', 'bncc_code' => 'EF02LP01'],
                ['question' => 'QUANTAS SÍLABAS TEM BORBOLETA?', 'options' => ['3', '4', '5', '6'], 'correct' => '4', 'bncc_code' => 'EF02LP01'],
                ['question' => 'QUAL É A SÍLABA INICIAL DE PATO?', 'options' => ['TO', 'PA', 'AT', 'PO'], 'correct' => 'PA', 'bncc_code' => 'EF02LP02'],
                ['question' => 'QUAL PALAVRA RIMA COM SOL?', 'options' => ['PÉ', 'LUA', 'MEL', 'CÉU'], 'correct' => 'MEL', 'bncc_code' => 'EF02LP05'],
                ['question' => 'QUANTAS SÍLABAS TEM ESCOLA?', 'options' => ['2', '3', '4', '5'], 'correct' => '3', 'bncc_code' => 'EF02LP01'],
                ['question' => 'QUAL É A SÍLABA FINAL DE JANELA?', 'options' => ['JA', 'NE', 'LA', 'EL'], 'correct' => 'LA', 'bncc_code' => 'EF02LP02'],
             ]],

            // === 3º ANO — PORTUGUÊS ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 3, 'title' => 'Palavras', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'Qual é o plural de "animal"?', 'options' => ['Animais', 'Animals', 'Animales', 'Animaus'], 'correct' => 'Animais', 'bncc_code' => 'EF03LP05'],
                ['question' => 'Qual é o antônimo de "feliz"?', 'options' => ['Triste', 'Alegre', 'Contente', 'Calmo'], 'correct' => 'Triste', 'bncc_code' => 'EF03LP09'],
                ['question' => 'Qual é o sinônimo de "rápido"?', 'options' => ['Lento', 'Veloz', 'Parado', 'Fraco'], 'correct' => 'Veloz', 'bncc_code' => 'EF03LP09'],
                ['question' => 'Qual destas palavras é um substantivo?', 'options' => ['Correr', 'Bonito', 'Cadeira', 'Rapidamente'], 'correct' => 'Cadeira', 'bncc_code' => 'EF03LP04'],
                ['question' => 'Qual é o feminino de "menino"?', 'options' => ['Menina', 'Meninoa', 'Meninu', 'Menin'], 'correct' => 'Menina', 'bncc_code' => 'EF03LP05'],
                ['question' => 'Qual é o diminutivo de "casa"?', 'options' => ['Casinha', 'Casona', 'Casarão', 'Casal'], 'correct' => 'Casinha', 'bncc_code' => 'EF03LP05'],
             ]],

            // === 4º ANO — PORTUGUÊS ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 4, 'title' => 'Frases', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'Qual destas é uma frase interrogativa?', 'options' => ['Que dia lindo!', 'Você foi à escola?', 'Feche a porta.', 'O sol brilha.'], 'correct' => 'Você foi à escola?', 'bncc_code' => 'EF04LP09'],
                ['question' => 'Qual destas é uma frase exclamativa?', 'options' => ['Que susto!', 'Onde você está?', 'Vou ao mercado.', 'Feche a janela.'], 'correct' => 'Que susto!', 'bncc_code' => 'EF04LP09'],
                ['question' => 'Complete corretamente: "As crianças ___ felizes."', 'options' => ['Está', 'Estão', 'Estar', 'Estive'], 'correct' => 'Estão', 'bncc_code' => 'EF04LP06'],
                ['question' => 'Qual é o sujeito da frase "O menino jogou bola"?', 'options' => ['O menino', 'Jogou', 'Bola', 'Jogou bola'], 'correct' => 'O menino', 'bncc_code' => 'EF04LP08'],
                ['question' => 'Qual destas frases está no plural?', 'options' => ['O gato dorme.', 'Os gatos dormem.', 'A gata dorme.', 'O gato come.'], 'correct' => 'Os gatos dormem.', 'bncc_code' => 'EF04LP06'],
                ['question' => 'Qual é o predicado da frase "A menina correu rápido"?', 'options' => ['A menina', 'Correu rápido', 'Menina', 'Rápido'], 'correct' => 'Correu rápido', 'bncc_code' => 'EF04LP08'],
             ]],

            // === 5º ANO — PORTUGUÊS ===
            ['world' => 'portugues', 'number' => 1, 'school_year' => 5, 'title' => 'Textos', 'character_key' => 'luma',
             'questions' => [
                ['question' => 'Texto: "Maria acordou cedo, tomou café e foi para a escola. No caminho, encontrou seu amigo João e os dois foram juntos." Quem acordou cedo?', 'options' => ['João', 'Maria', 'A professora', 'O pai'], 'correct' => 'Maria', 'bncc_code' => 'EF05LP09'],
                ['question' => 'No texto sobre Maria, o que ela fez antes de ir à escola?', 'options' => ['Tomou café', 'Foi nadar', 'Dormiu mais', 'Assistiu TV'], 'correct' => 'Tomou café', 'bncc_code' => 'EF05LP09'],
                ['question' => 'No texto sobre Maria, quem ela encontrou no caminho?', 'options' => ['Pedro', 'Ana', 'João', 'Carlos'], 'correct' => 'João', 'bncc_code' => 'EF05LP09'],
                ['question' => 'Qual é a ideia principal do texto sobre Maria?', 'options' => ['Maria foi à escola com um amigo', 'Maria ficou em casa', 'João faltou à aula', 'Maria não tomou café'], 'correct' => 'Maria foi à escola com um amigo', 'bncc_code' => 'EF05LP09'],
                ['question' => 'Qual é o sinônimo de "cedo" no texto sobre Maria?', 'options' => ['Tarde', 'Logo de manhã', 'À noite', 'Depois'], 'correct' => 'Logo de manhã', 'bncc_code' => 'EF05LP15'],
                ['question' => 'Qual é o antônimo de "juntos"?', 'options' => ['Separados', 'Unidos', 'Acompanhados', 'Perto'], 'correct' => 'Separados', 'bncc_code' => 'EF05LP15'],
             ]],

            // === 3º ANO — MATEMÁTICA ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 3, 'title' => 'Tabuada do 2', 'character_key' => 'byte',
             'questions' => [
                ['question' => '2 × 3 = ?', 'options' => ['4', '5', '6', '7'], 'correct' => '6', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 5 = ?', 'options' => ['8', '9', '10', '11'], 'correct' => '10', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 7 = ?', 'options' => ['12', '13', '14', '15'], 'correct' => '14', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 9 = ?', 'options' => ['16', '17', '18', '19'], 'correct' => '18', 'bncc_code' => 'EF03MA07'],
                ['question' => '2 × 4 = ?', 'options' => ['6', '7', '8', '9'], 'correct' => '8', 'bncc_code' => 'EF03MA07'],
                ['question' => 'Qual é o resultado de 2 × 6?', 'options' => ['10', '11', '12', '13'], 'correct' => '12', 'bncc_code' => 'EF03MA07'],
             ]],

            // === 4º ANO — MATEMÁTICA ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 4, 'title' => 'Multiplicação e Divisão', 'character_key' => 'byte',
             'questions' => [
                ['question' => 'Qual é o resultado de 6 × 7?', 'options' => ['36', '40', '42', '48'], 'correct' => '42', 'bncc_code' => 'EF04MA06'],
                ['question' => 'Qual é o resultado de 36 ÷ 4?', 'options' => ['7', '8', '9', '10'], 'correct' => '9', 'bncc_code' => 'EF04MA06'],
                ['question' => 'Qual é o resultado de 9 × 8?', 'options' => ['63', '70', '72', '81'], 'correct' => '72', 'bncc_code' => 'EF04MA06'],
                ['question' => 'Quanto é 100 ÷ 5?', 'options' => ['15', '20', '25', '30'], 'correct' => '20', 'bncc_code' => 'EF04MA06'],
                ['question' => 'Qual é o dobro de 25?', 'options' => ['45', '50', '55', '60'], 'correct' => '50', 'bncc_code' => 'EF04MA08'],
                ['question' => 'Qual é a metade de 48?', 'options' => ['22', '24', '26', '28'], 'correct' => '24', 'bncc_code' => 'EF04MA08'],
             ]],

            // === 5º ANO — MATEMÁTICA ===
            ['world' => 'matematica', 'number' => 1, 'school_year' => 5, 'title' => 'Frações', 'character_key' => 'byte',
             'questions' => [
                ['question' => 'Qual fração representa "metade"?', 'options' => ['1/2', '1/3', '1/4', '2/3'], 'correct' => '1/2', 'bncc_code' => 'EF05MA06'],
                ['question' => 'Qual é o resultado de 1/2 + 1/4?', 'options' => ['1/4', '2/4', '3/4', '1/2'], 'correct' => '3/4', 'bncc_code' => 'EF05MA07'],
                ['question' => 'Qual fração é maior: 1/3 ou 1/5?', 'options' => ['1/3', '1/5', 'Iguais', 'Nenhuma'], 'correct' => '1/3', 'bncc_code' => 'EF05MA06'],
                ['question' => 'Quanto é 3/4 de 20?', 'options' => ['10', '12', '15', '18'], 'correct' => '15', 'bncc_code' => 'EF05MA08'],
                ['question' => 'Qual é a forma decimal de 1/2?', 'options' => ['0,2', '0,5', '0,25', '0,1'], 'correct' => '0,5', 'bncc_code' => 'EF05MA09'],
                ['question' => 'Qual fração representa "um quarto"?', 'options' => ['1/2', '1/3', '1/4', '1/5'], 'correct' => '1/4', 'bncc_code' => 'EF05MA06'],
             ]],

            // === 3º ANO — CIÊNCIAS ===
            ['world' => 'ciencias', 'number' => 1, 'school_year' => 3, 'title' => 'Meio Ambiente', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'Qual destes materiais pode ser reciclado?', 'options' => ['Papel', 'Restos de comida', 'Folhas secas', 'Água'], 'correct' => 'Papel', 'bncc_code' => 'EF03CI07'],
                ['question' => 'Qual é a fonte de água potável mais comum?', 'options' => ['Rios e lagos', 'Mar', 'Esgoto', 'Poça'], 'correct' => 'Rios e lagos', 'bncc_code' => 'EF03CI06'],
                ['question' => 'O que devemos fazer com o lixo reciclável?', 'options' => ['Jogar no chão', 'Separar para reciclagem', 'Queimar', 'Enterrar'], 'correct' => 'Separar para reciclagem', 'bncc_code' => 'EF03CI07'],
                ['question' => 'Qual destas ações ajuda o meio ambiente?', 'options' => ['Economizar água', 'Desperdiçar água', 'Jogar lixo no rio', 'Cortar árvores'], 'correct' => 'Economizar água', 'bncc_code' => 'EF03CI07'],
                ['question' => 'Qual é o estado físico da água quando vira gelo?', 'options' => ['Líquido', 'Sólido', 'Gasoso', 'Plasma'], 'correct' => 'Sólido', 'bncc_code' => 'EF03CI03'],
                ['question' => 'Qual é o estado físico da água quando vira vapor?', 'options' => ['Líquido', 'Sólido', 'Gasoso', 'Plasma'], 'correct' => 'Gasoso', 'bncc_code' => 'EF03CI03'],
             ]],

            // === 4º ANO — CIÊNCIAS ===
            ['world' => 'ciencias', 'number' => 1, 'school_year' => 4, 'title' => 'Fenômenos da Natureza', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'O que causa o dia e a noite?', 'options' => ['A rotação da Terra', 'A Lua', 'As estrelas', 'O vento'], 'correct' => 'A rotação da Terra', 'bncc_code' => 'EF04CI08'],
                ['question' => 'Quantos planetas existem no Sistema Solar?', 'options' => ['7', '8', '9', '10'], 'correct' => '8', 'bncc_code' => 'EF04CI08'],
                ['question' => 'Qual destes é uma fonte de energia renovável?', 'options' => ['Carvão', 'Petróleo', 'Energia solar', 'Gás natural'], 'correct' => 'Energia solar', 'bncc_code' => 'EF04CI05'],
                ['question' => 'O que uma planta precisa para crescer?', 'options' => ['Água, luz e solo', 'Só água', 'Só luz', 'Nada'], 'correct' => 'Água, luz e solo', 'bncc_code' => 'EF04CI03'],
                ['question' => 'Qual destes fenômenos acontece na atmosfera?', 'options' => ['Chuva', 'Terremoto', 'Maré', 'Vulcão'], 'correct' => 'Chuva', 'bncc_code' => 'EF04CI08'],
                ['question' => 'O que é o ciclo da água?', 'options' => ['A água que evapora, vira nuvem e chove', 'A água que só evapora', 'A água parada', 'A água que congela sempre'], 'correct' => 'A água que evapora, vira nuvem e chove', 'bncc_code' => 'EF04CI06'],
             ]],

            // === 5º ANO — CIÊNCIAS ===
            ['world' => 'ciencias', 'number' => 1, 'school_year' => 5, 'title' => 'Ecossistemas', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'O que é uma cadeia alimentar?', 'options' => ['A sequência de quem come quem na natureza', 'Um tipo de planta', 'Um rio', 'Uma estação do ano'], 'correct' => 'A sequência de quem come quem na natureza', 'bncc_code' => 'EF05CI06'],
                ['question' => 'Qual destes é um produtor em uma cadeia alimentar?', 'options' => ['Leão', 'Planta', 'Águia', 'Lobo'], 'correct' => 'Planta', 'bncc_code' => 'EF05CI06'],
                ['question' => 'O que pode acontecer se um elo da cadeia alimentar desaparece?', 'options' => ['Nada muda', 'O ecossistema pode ser afetado', 'As plantas crescem mais', 'Os animais ficam mais fortes'], 'correct' => 'O ecossistema pode ser afetado', 'bncc_code' => 'EF05CI06'],
                ['question' => 'Qual destes é um exemplo de ecossistema?', 'options' => ['Floresta Amazônica', 'Caderno', 'Carro', 'Computador'], 'correct' => 'Floresta Amazônica', 'bncc_code' => 'EF05CI07'],
                ['question' => 'O que é biodiversidade?', 'options' => ['A variedade de seres vivos em um ambiente', 'Um tipo de rocha', 'Uma cidade grande', 'Um tipo de poluição'], 'correct' => 'A variedade de seres vivos em um ambiente', 'bncc_code' => 'EF05CI07'],
                ['question' => 'Qual destas atitudes ajuda a preservar os ecossistemas?', 'options' => ['Desmatar florestas', 'Proteger áreas naturais', 'Poluir rios', 'Caçar animais'], 'correct' => 'Proteger áreas naturais', 'bncc_code' => 'EF05CI08'],
             ]],

            // === 1º ANO — GEOGRAFIA (caixa alta) ===
            ['world' => 'geografia', 'number' => 1, 'school_year' => 1, 'title' => 'Onde Eu Moro', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'QUAL DESTES LUGARES É UMA MORADIA?', 'options' => ['CASA', 'ESCOLA', 'HOSPITAL', 'MERCADO'], 'correct' => 'CASA', 'bncc_code' => 'EF01GE01'],
                ['question' => 'ONDE AS CRIANÇAS VÃO PARA ESTUDAR?', 'options' => ['HOSPITAL', 'ESCOLA', 'MERCADO', 'PRAÇA'], 'correct' => 'ESCOLA', 'bncc_code' => 'EF01GE01'],
                ['question' => 'QUAL DESTES É UM MEIO DE TRANSPORTE?', 'options' => ['CARRO', 'CADEIRA', 'MESA', 'LIVRO'], 'correct' => 'CARRO', 'bncc_code' => 'EF01GE05'],
                ['question' => 'ONDE COMPRAMOS FRUTAS E VERDURAS?', 'options' => ['ESCOLA', 'MERCADO', 'HOSPITAL', 'IGREJA'], 'correct' => 'MERCADO', 'bncc_code' => 'EF01GE01'],
                ['question' => 'QUAL LUGAR É USADO PARA BRINCAR AO AR LIVRE?', 'options' => ['PRAÇA', 'HOSPITAL', 'BANCO', 'MERCADO'], 'correct' => 'PRAÇA', 'bncc_code' => 'EF01GE01'],
                ['question' => 'ONDE AS PESSOAS VÃO QUANDO ESTÃO DOENTES?', 'options' => ['ESCOLA', 'HOSPITAL', 'MERCADO', 'PRAÇA'], 'correct' => 'HOSPITAL', 'bncc_code' => 'EF01GE01'],
             ]],

            // === 2º ANO — GEOGRAFIA (caixa alta) ===
            ['world' => 'geografia', 'number' => 1, 'school_year' => 2, 'title' => 'Meu Bairro e Cidade', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'O QUE É UM BAIRRO?', 'options' => ['UMA PARTE DA CIDADE', 'UM PAÍS', 'UM CONTINENTE', 'UM PLANETA'], 'correct' => 'UMA PARTE DA CIDADE', 'bncc_code' => 'EF02GE03'],
                ['question' => 'QUAL DESTES É UM MEIO DE TRANSPORTE COLETIVO?', 'options' => ['ÔNIBUS', 'BICICLETA PESSOAL', 'PATINETE', 'SKATE'], 'correct' => 'ÔNIBUS', 'bncc_code' => 'EF02GE05'],
                ['question' => 'QUAL PROFISSIONAL CUIDA DA LIMPEZA DAS RUAS?', 'options' => ['PROFESSOR', 'GARI', 'MÉDICO', 'COZINHEIRO'], 'correct' => 'GARI', 'bncc_code' => 'EF02GE04'],
                ['question' => 'ONDE FUNCIONA O GOVERNO DE UMA CIDADE?', 'options' => ['PREFEITURA', 'ESCOLA', 'MERCADO', 'IGREJA'], 'correct' => 'PREFEITURA', 'bncc_code' => 'EF02GE04'],
                ['question' => 'QUAL DESTES LUGARES FICA GERALMENTE NO CENTRO DAS CIDADES?', 'options' => ['PRAÇA PRINCIPAL', 'FLORESTA', 'DESERTO', 'OCEANO'], 'correct' => 'PRAÇA PRINCIPAL', 'bncc_code' => 'EF02GE03'],
                ['question' => 'QUAL DESTAS É UMA REGRA DE TRÂNSITO?', 'options' => ['PARAR NO SINAL VERMELHO', 'ATRAVESSAR CORRENDO', 'IGNORAR A FAIXA', 'CORRER NA RUA'], 'correct' => 'PARAR NO SINAL VERMELHO', 'bncc_code' => 'EF02GE06'],
             ]],

            // === 3º ANO — GEOGRAFIA ===
            ['world' => 'geografia', 'number' => 1, 'school_year' => 3, 'title' => 'Paisagens e Relevo', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'O que é uma paisagem natural?', 'options' => ['Um ambiente sem interferência humana', 'Um prédio', 'Uma rua asfaltada', 'Um shopping'], 'correct' => 'Um ambiente sem interferência humana', 'bncc_code' => 'EF03GE01'],
                ['question' => 'Qual destes é um exemplo de paisagem natural?', 'options' => ['Floresta', 'Avenida', 'Estádio', 'Fábrica'], 'correct' => 'Floresta', 'bncc_code' => 'EF03GE01'],
                ['question' => 'Qual destes é um exemplo de paisagem urbana?', 'options' => ['Prédios e ruas', 'Floresta', 'Deserto', 'Oceano'], 'correct' => 'Prédios e ruas', 'bncc_code' => 'EF03GE01'],
                ['question' => 'O que é uma montanha?', 'options' => ['Uma elevação natural do terreno', 'Um rio', 'Um lago', 'Uma cidade'], 'correct' => 'Uma elevação natural do terreno', 'bncc_code' => 'EF03GE08'],
                ['question' => 'Qual destes é uma fonte de água doce?', 'options' => ['Rio', 'Mar', 'Oceano', 'Lagoa salgada'], 'correct' => 'Rio', 'bncc_code' => 'EF03GE07'],
                ['question' => 'O que é o relevo?', 'options' => ['A forma da superfície da Terra', 'Um tipo de clima', 'Um tipo de vegetação', 'Uma estação do ano'], 'correct' => 'A forma da superfície da Terra', 'bncc_code' => 'EF03GE08'],
             ]],

            // === 4º ANO — GEOGRAFIA ===
            ['world' => 'geografia', 'number' => 1, 'school_year' => 4, 'title' => 'Regiões do Brasil', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'Quantas regiões tem o Brasil?', 'options' => ['3', '4', '5', '6'], 'correct' => '5', 'bncc_code' => 'EF04GE01'],
                ['question' => 'Qual região brasileira abriga a Floresta Amazônica?', 'options' => ['Norte', 'Sul', 'Sudeste', 'Nordeste'], 'correct' => 'Norte', 'bncc_code' => 'EF04GE01'],
                ['question' => 'Qual é a capital do Brasil?', 'options' => ['Brasília', 'São Paulo', 'Rio de Janeiro', 'Salvador'], 'correct' => 'Brasília', 'bncc_code' => 'EF04GE01'],
                ['question' => 'Qual região é conhecida pelo Pantanal?', 'options' => ['Centro-Oeste', 'Sul', 'Nordeste', 'Norte'], 'correct' => 'Centro-Oeste', 'bncc_code' => 'EF04GE01'],
                ['question' => 'Qual destes estados fica na região Sul do Brasil?', 'options' => ['Paraná', 'Bahia', 'Pará', 'Ceará'], 'correct' => 'Paraná', 'bncc_code' => 'EF04GE01'],
                ['question' => 'Qual região brasileira é famosa pelas praias do litoral leste?', 'options' => ['Nordeste', 'Centro-Oeste', 'Norte', 'Sul'], 'correct' => 'Nordeste', 'bncc_code' => 'EF04GE01'],
             ]],

            // === 5º ANO — GEOGRAFIA ===
            ['world' => 'geografia', 'number' => 1, 'school_year' => 5, 'title' => 'Brasil no Mapa', 'character_key' => 'bia',
             'questions' => [
                ['question' => 'Qual é o oceano que banha o litoral brasileiro?', 'options' => ['Oceano Atlântico', 'Oceano Pacífico', 'Oceano Índico', 'Oceano Ártico'], 'correct' => 'Oceano Atlântico', 'bncc_code' => 'EF05GE01'],
                ['question' => 'Com quantos países o Brasil faz fronteira?', 'options' => ['8', '9', '10', '11'], 'correct' => '10', 'bncc_code' => 'EF05GE01'],
                ['question' => 'Qual é o maior bioma brasileiro em extensão?', 'options' => ['Amazônia', 'Caatinga', 'Pampa', 'Pantanal'], 'correct' => 'Amazônia', 'bncc_code' => 'EF05GE04'],
                ['question' => 'Qual destes países faz fronteira com o Brasil?', 'options' => ['Argentina', 'México', 'Cuba', 'Chile'], 'correct' => 'Argentina', 'bncc_code' => 'EF05GE01'],
                ['question' => 'O que são coordenadas geográficas?', 'options' => ['Linhas que indicam a localização de um lugar', 'Tipos de relevo', 'Tipos de clima', 'Nomes de rios'], 'correct' => 'Linhas que indicam a localização de um lugar', 'bncc_code' => 'EF05GE02'],
                ['question' => 'Qual é a linha imaginária que divide a Terra em hemisfério norte e sul?', 'options' => ['Linha do Equador', 'Meridiano de Greenwich', 'Trópico de Câncer', 'Círculo Polar'], 'correct' => 'Linha do Equador', 'bncc_code' => 'EF05GE02'],
             ]],

            // === 1º ANO — HISTÓRIA (caixa alta) ===
            ['world' => 'historia', 'number' => 1, 'school_year' => 1, 'title' => 'Minha Família e Eu', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'O QUE É UMA FAMÍLIA?', 'options' => ['PESSOAS QUE VIVEM E SE CUIDAM JUNTAS', 'UM TIPO DE COMIDA', 'UM TIPO DE ANIMAL', 'UM JOGO'], 'correct' => 'PESSOAS QUE VIVEM E SE CUIDAM JUNTAS', 'bncc_code' => 'EF01HI01'],
                ['question' => 'QUAL DESTES É UM REGISTRO DA SUA HISTÓRIA?', 'options' => ['FOTOGRAFIA', 'PEDRA', 'NUVEM', 'VENTO'], 'correct' => 'FOTOGRAFIA', 'bncc_code' => 'EF01HI02'],
                ['question' => 'QUEM CUIDA DAS CRIANÇAS EM CASA, GERALMENTE?', 'options' => ['OS PAIS OU RESPONSÁVEIS', 'OS COLEGAS', 'OS VIZINHOS', 'OS DESCONHECIDOS'], 'correct' => 'OS PAIS OU RESPONSÁVEIS', 'bncc_code' => 'EF01HI01'],
                ['question' => 'O QUE MARCA O DIA EM QUE VOCÊ NASCEU?', 'options' => ['ANIVERSÁRIO', 'NATAL', 'CARNAVAL', 'PÁSCOA'], 'correct' => 'ANIVERSÁRIO', 'bncc_code' => 'EF01HI03'],
                ['question' => 'QUAL DESTES OBJETOS AJUDA A LEMBRAR O PASSADO?', 'options' => ['ÁLBUM DE FOTOS', 'GELADEIRA', 'TELEVISÃO', 'SOFÁ'], 'correct' => 'ÁLBUM DE FOTOS', 'bncc_code' => 'EF01HI02'],
                ['question' => 'QUEM SÃO OS PAIS DOS SEUS AVÓS?', 'options' => ['BISAVÓS', 'TIOS', 'PRIMOS', 'SOBRINHOS'], 'correct' => 'BISAVÓS', 'bncc_code' => 'EF01HI01'],
             ]],

            // === 2º ANO — HISTÓRIA (caixa alta) ===
            ['world' => 'historia', 'number' => 1, 'school_year' => 2, 'title' => 'Minha Escola e Comunidade', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'O QUE É UMA COMUNIDADE?', 'options' => ['UM GRUPO DE PESSOAS QUE VIVEM NO MESMO LUGAR', 'UM TIPO DE COMIDA', 'UM JOGO', 'UM ANIMAL'], 'correct' => 'UM GRUPO DE PESSOAS QUE VIVEM NO MESMO LUGAR', 'bncc_code' => 'EF02HI06'],
                ['question' => 'QUAL DESTES PROFISSIONAIS TRABALHA NA ESCOLA?', 'options' => ['PROFESSOR', 'PILOTO', 'MARINHEIRO', 'ASTRONAUTA'], 'correct' => 'PROFESSOR', 'bncc_code' => 'EF02HI06'],
                ['question' => 'O QUE SÃO REGRAS DE CONVIVÊNCIA?', 'options' => ['COMBINADOS PARA VIVERMOS BEM JUNTOS', 'UM TIPO DE BRINCADEIRA', 'UM TIPO DE COMIDA', 'UM JOGO'], 'correct' => 'COMBINADOS PARA VIVERMOS BEM JUNTOS', 'bncc_code' => 'EF02HI07'],
                ['question' => 'QUAL DESTAS É UMA DATA COMEMORATIVA?', 'options' => ['NATAL', 'SEGUNDA-FEIRA', 'MEIO-DIA', 'VERÃO'], 'correct' => 'NATAL', 'bncc_code' => 'EF02HI04'],
                ['question' => 'O QUE MUDOU NA ESCOLA AO LONGO DO TEMPO?', 'options' => ['O JEITO DE ENSINAR E APRENDER', 'NADA MUDOU', 'SÓ O UNIFORME', 'SÓ O NOME'], 'correct' => 'O JEITO DE ENSINAR E APRENDER', 'bncc_code' => 'EF02HI05'],
                ['question' => 'QUAL DESTES É UM ESPAÇO DA COMUNIDADE?', 'options' => ['PRAÇA', 'QUARTO', 'GARAGEM', 'ARMÁRIO'], 'correct' => 'PRAÇA', 'bncc_code' => 'EF02HI06'],
             ]],

            // === 3º ANO — HISTÓRIA ===
            ['world' => 'historia', 'number' => 1, 'school_year' => 3, 'title' => 'Povos Originários', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'Quem foram os primeiros habitantes do Brasil?', 'options' => ['Os povos indígenas', 'Os portugueses', 'Os espanhóis', 'Os holandeses'], 'correct' => 'Os povos indígenas', 'bncc_code' => 'EF03HI08'],
                ['question' => 'Qual destas é uma característica dos povos indígenas?', 'options' => ['Viviam em harmonia com a natureza', 'Viviam em arranha-céus', 'Usavam carros', 'Usavam computadores'], 'correct' => 'Viviam em harmonia com a natureza', 'bncc_code' => 'EF03HI08'],
                ['question' => 'O que os povos indígenas usavam para se comunicar?', 'options' => ['Línguas próprias', 'Apenas gestos', 'Telefones', 'Cartas'], 'correct' => 'Línguas próprias', 'bncc_code' => 'EF03HI09'],
                ['question' => 'Qual destas atividades os povos indígenas praticavam?', 'options' => ['Caça, pesca e agricultura', 'Apenas indústria', 'Apenas comércio digital', 'Apenas mineração'], 'correct' => 'Caça, pesca e agricultura', 'bncc_code' => 'EF03HI08'],
                ['question' => 'O que uma aldeia indígena geralmente possui?', 'options' => ['Ocas e espaço comunitário', 'Arranha-céus', 'Shoppings', 'Estádios'], 'correct' => 'Ocas e espaço comunitário', 'bncc_code' => 'EF03HI08'],
                ['question' => 'Por que é importante respeitar a cultura indígena?', 'options' => ['Porque faz parte da história e identidade do Brasil', 'Porque é uma lei sem motivo', 'Porque não importa', 'Porque é antigo demais'], 'correct' => 'Porque faz parte da história e identidade do Brasil', 'bncc_code' => 'EF03HI09'],
             ]],

            // === 4º ANO — HISTÓRIA ===
            ['world' => 'historia', 'number' => 1, 'school_year' => 4, 'title' => 'Brasil Colonial', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'Quem chegou ao Brasil em 1500?', 'options' => ['Os portugueses', 'Os ingleses', 'Os franceses', 'Os romanos'], 'correct' => 'Os portugueses', 'bncc_code' => 'EF04HI09'],
                ['question' => 'Qual era o nome do navegador que chegou ao Brasil em 1500?', 'options' => ['Pedro Álvares Cabral', 'Cristóvão Colombo', 'Vasco da Gama', 'Fernão de Magalhães'], 'correct' => 'Pedro Álvares Cabral', 'bncc_code' => 'EF04HI09'],
                ['question' => 'Qual produto foi muito explorado no início da colonização?', 'options' => ['Pau-brasil', 'Petróleo', 'Ferro', 'Ouro digital'], 'correct' => 'Pau-brasil', 'bncc_code' => 'EF04HI10'],
                ['question' => 'Quem foi trazido à força da África para trabalhar no Brasil colonial?', 'options' => ['Os povos africanos escravizados', 'Os portugueses', 'Apenas os indígenas', 'Os holandeses'], 'correct' => 'Os povos africanos escravizados', 'bncc_code' => 'EF04HI11'],
                ['question' => 'O que eram as capitanias hereditárias?', 'options' => ['Divisões de terra dadas pelo rei de Portugal', 'Tipos de navios', 'Tipos de moeda', 'Nomes de cidades atuais'], 'correct' => 'Divisões de terra dadas pelo rei de Portugal', 'bncc_code' => 'EF04HI09'],
                ['question' => 'Qual era a principal atividade econômica do Brasil colonial?', 'options' => ['Agricultura e extração de recursos naturais', 'Tecnologia', 'Turismo espacial', 'Comércio digital'], 'correct' => 'Agricultura e extração de recursos naturais', 'bncc_code' => 'EF04HI10'],
             ]],

            // === 5º ANO — HISTÓRIA ===
            ['world' => 'historia', 'number' => 1, 'school_year' => 5, 'title' => 'Diversidade Cultural Brasileira', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'Quais povos formaram a cultura brasileira?', 'options' => ['Indígenas, africanos e europeus', 'Apenas europeus', 'Apenas indígenas', 'Apenas africanos'], 'correct' => 'Indígenas, africanos e europeus', 'bncc_code' => 'EF05HI11'],
                ['question' => 'Qual destas é uma manifestação cultural brasileira?', 'options' => ['Capoeira', 'Balé clássico russo', 'Ópera italiana', 'Tango argentino'], 'correct' => 'Capoeira', 'bncc_code' => 'EF05HI11'],
                ['question' => 'O que é o samba?', 'options' => ['Um ritmo musical brasileiro', 'Um prato típico', 'Um esporte', 'Um animal'], 'correct' => 'Um ritmo musical brasileiro', 'bncc_code' => 'EF05HI11'],
                ['question' => 'Qual destas festas é tradicional no Brasil?', 'options' => ['Festa Junina', 'Halloween', 'Oktoberfest', 'Diwali'], 'correct' => 'Festa Junina', 'bncc_code' => 'EF05HI11'],
                ['question' => 'Qual língua é falada oficialmente no Brasil?', 'options' => ['Português', 'Espanhol', 'Inglês', 'Francês'], 'correct' => 'Português', 'bncc_code' => 'EF05HI11'],
                ['question' => 'Por que o Brasil tem grande diversidade cultural?', 'options' => ['Por causa da mistura de diferentes povos ao longo da história', 'Porque é um país pequeno', 'Porque tem só uma etnia', 'Porque não recebeu migrantes'], 'correct' => 'Por causa da mistura de diferentes povos ao longo da história', 'bncc_code' => 'EF05HI11'],
             ]],

            // === 1º ANO — ARTES (caixa alta) ===
            ['world' => 'artes', 'number' => 1, 'school_year' => 1, 'title' => 'Cores e Formas', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'QUAL DESTAS É UMA COR PRIMÁRIA?', 'options' => ['AZUL', 'VERDE', 'LARANJA', 'ROXO'], 'correct' => 'AZUL', 'bncc_code' => 'EF01AR01'],
                ['question' => 'QUAL FORMA TEM TRÊS LADOS?', 'options' => ['QUADRADO', 'TRIÂNGULO', 'CÍRCULO', 'RETÂNGULO'], 'correct' => 'TRIÂNGULO', 'bncc_code' => 'EF01AR02'],
                ['question' => 'QUAL FORMA É REDONDA?', 'options' => ['QUADRADO', 'TRIÂNGULO', 'CÍRCULO', 'RETÂNGULO'], 'correct' => 'CÍRCULO', 'bncc_code' => 'EF01AR02'],
                ['question' => 'O QUE PODEMOS USAR PARA DESENHAR?', 'options' => ['LÁPIS DE COR', 'COLHER', 'GARFO', 'SAPATO'], 'correct' => 'LÁPIS DE COR', 'bncc_code' => 'EF01AR03'],
                ['question' => 'QUAL COR SE FORMA MISTURANDO AZUL E AMARELO?', 'options' => ['VERDE', 'ROXO', 'LARANJA', 'ROSA'], 'correct' => 'VERDE', 'bncc_code' => 'EF01AR01'],
                ['question' => 'QUANTOS LADOS TEM UM QUADRADO?', 'options' => ['2', '3', '4', '5'], 'correct' => '4', 'bncc_code' => 'EF01AR02'],
             ]],

            // === 2º ANO — ARTES (caixa alta) ===
            ['world' => 'artes', 'number' => 1, 'school_year' => 2, 'title' => 'Expressão Artística', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'O QUE É UMA OBRA DE ARTE?', 'options' => ['ALGO CRIADO PARA EXPRESSAR IDEIAS OU SENTIMENTOS', 'UM TIPO DE COMIDA', 'UM JOGO', 'UM ANIMAL'], 'correct' => 'ALGO CRIADO PARA EXPRESSAR IDEIAS OU SENTIMENTOS', 'bncc_code' => 'EF02AR01'],
                ['question' => 'QUAL DESTES É UM INSTRUMENTO MUSICAL?', 'options' => ['TAMBOR', 'GARFO', 'COLHER', 'LIVRO'], 'correct' => 'TAMBOR', 'bncc_code' => 'EF02AR06'],
                ['question' => 'QUAL DESTAS É UMA FORMA DE ARTE?', 'options' => ['PINTURA', 'MATEMÁTICA', 'GEOGRAFIA', 'CIÊNCIAS'], 'correct' => 'PINTURA', 'bncc_code' => 'EF02AR01'],
                ['question' => 'O QUE É UM AUTORRETRATO?', 'options' => ['UM DESENHO DE SI MESMO', 'UM TIPO DE MÚSICA', 'UM TIPO DE DANÇA', 'UM JOGO'], 'correct' => 'UM DESENHO DE SI MESMO', 'bncc_code' => 'EF02AR04'],
                ['question' => 'QUAL DESTAS É UMA DANÇA BRASILEIRA?', 'options' => ['FREVO', 'BALÉ CLÁSSICO', 'TANGO', 'FLAMENCO'], 'correct' => 'FREVO', 'bncc_code' => 'EF02AR08'],
                ['question' => 'O QUE PODEMOS USAR PARA FAZER UMA ESCULTURA?', 'options' => ['ARGILA', 'ÁGUA', 'AR', 'LUZ'], 'correct' => 'ARGILA', 'bncc_code' => 'EF02AR05'],
             ]],

            // === 3º ANO — ARTES ===
            ['world' => 'artes', 'number' => 1, 'school_year' => 3, 'title' => 'Música e Ritmo', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'O que é o ritmo na música?', 'options' => ['A repetição organizada de sons no tempo', 'Um tipo de instrumento', 'Uma cor', 'Uma forma geométrica'], 'correct' => 'A repetição organizada de sons no tempo', 'bncc_code' => 'EF03AR06'],
                ['question' => 'Qual destes é um instrumento de percussão?', 'options' => ['Tambor', 'Violino', 'Flauta', 'Piano'], 'correct' => 'Tambor', 'bncc_code' => 'EF03AR06'],
                ['question' => 'Qual destes é um instrumento de corda?', 'options' => ['Violão', 'Tambor', 'Flauta', 'Pandeiro'], 'correct' => 'Violão', 'bncc_code' => 'EF03AR06'],
                ['question' => 'O que é uma melodia?', 'options' => ['Uma sequência de notas musicais', 'Um tipo de dança', 'Uma cor', 'Um desenho'], 'correct' => 'Uma sequência de notas musicais', 'bncc_code' => 'EF03AR06'],
                ['question' => 'Qual destes é um gênero musical brasileiro?', 'options' => ['Samba', 'Reggaeton', 'K-pop', 'Flamenco'], 'correct' => 'Samba', 'bncc_code' => 'EF03AR08'],
                ['question' => 'O que significa cantar em coro?', 'options' => ['Cantar em grupo', 'Cantar sozinho', 'Não cantar', 'Apenas tocar instrumento'], 'correct' => 'Cantar em grupo', 'bncc_code' => 'EF03AR07'],
             ]],

            // === 4º ANO — ARTES ===
            ['world' => 'artes', 'number' => 1, 'school_year' => 4, 'title' => 'Teatro e Expressão Corporal', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'O que é o teatro?', 'options' => ['Uma forma de arte que conta histórias através da atuação', 'Um tipo de pintura', 'Um tipo de escultura', 'Um instrumento musical'], 'correct' => 'Uma forma de arte que conta histórias através da atuação', 'bncc_code' => 'EF04AR09'],
                ['question' => 'Quem interpreta um personagem no teatro?', 'options' => ['O ator ou atriz', 'O público', 'O diretor de cinema', 'O escritor de livros'], 'correct' => 'O ator ou atriz', 'bncc_code' => 'EF04AR09'],
                ['question' => 'Para que serve uma máscara teatral?', 'options' => ['Para representar um personagem ou emoção', 'Para proteger do frio', 'Para decorar a casa', 'Para guardar objetos'], 'correct' => 'Para representar um personagem ou emoção', 'bncc_code' => 'EF04AR10'],
                ['question' => 'O que é improvisação no teatro?', 'options' => ['Atuar sem um roteiro pronto', 'Decorar um texto inteiro', 'Cantar uma música', 'Pintar um quadro'], 'correct' => 'Atuar sem um roteiro pronto', 'bncc_code' => 'EF04AR10'],
                ['question' => 'Qual destes elementos faz parte de uma peça de teatro?', 'options' => ['Figurino', 'Caderno escolar', 'Calculadora', 'Mapa'], 'correct' => 'Figurino', 'bncc_code' => 'EF04AR10'],
                ['question' => 'O que a expressão corporal comunica?', 'options' => ['Sentimentos e ideias através do corpo', 'Apenas palavras escritas', 'Apenas números', 'Apenas cores'], 'correct' => 'Sentimentos e ideias através do corpo', 'bncc_code' => 'EF04AR11'],
             ]],

            // === 5º ANO — ARTES ===
            ['world' => 'artes', 'number' => 1, 'school_year' => 5, 'title' => 'Criação e Cultura Visual', 'character_key' => 'nino',
             'questions' => [
                ['question' => 'O que é cultura visual?', 'options' => ['O conjunto de imagens e símbolos que vemos no dia a dia', 'Um tipo de música', 'Um tipo de comida', 'Um esporte'], 'correct' => 'O conjunto de imagens e símbolos que vemos no dia a dia', 'bncc_code' => 'EF05AR04'],
                ['question' => 'Qual destes é um exemplo de arte digital?', 'options' => ['Desenho feito no computador', 'Pintura a óleo em tela', 'Escultura em pedra', 'Desenho na areia'], 'correct' => 'Desenho feito no computador', 'bncc_code' => 'EF05AR05'],
                ['question' => 'O que é um mural?', 'options' => ['Uma pintura grande feita em uma parede', 'Um tipo de música', 'Uma dança', 'Um instrumento'], 'correct' => 'Uma pintura grande feita em uma parede', 'bncc_code' => 'EF05AR03'],
                ['question' => 'O que significa "patrimônio cultural"?', 'options' => ['Bens e tradições importantes para a história de um povo', 'Apenas prédios antigos', 'Apenas dinheiro', 'Apenas comida'], 'correct' => 'Bens e tradições importantes para a história de um povo', 'bncc_code' => 'EF05AR12'],
                ['question' => 'O que é um grafite (arte urbana)?', 'options' => ['Pintura em muros e espaços públicos', 'Pintura apenas em museus', 'Escultura em mármore', 'Música clássica'], 'correct' => 'Pintura em muros e espaços públicos', 'bncc_code' => 'EF05AR05'],
                ['question' => 'O que é criatividade na arte?', 'options' => ['A capacidade de imaginar e criar algo novo', 'Copiar exatamente uma obra', 'Seguir sempre as mesmas regras', 'Não usar a imaginação'], 'correct' => 'A capacidade de imaginar e criar algo novo', 'bncc_code' => 'EF05AR04'],
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
