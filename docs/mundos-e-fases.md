# Mundos e Fases

## Estrutura Geral
- **6 Mundos** (um por disciplina)
- Cada mundo tem **5 fases**, uma por ano escolar (1º ao 5º ano) — não 5 fases dentro do mesmo ano. `Phase.number` é sempre `1`; o que diferencia as 5 fases de um mundo é `Phase.school_year` (1 a 5).
- Progressão desbloqueada por desempenho: **mínimo 2 estrelas** para avançar
- Resultado de cada fase: **1 a 3 estrelas** (baseado em % de acertos)

| % Acertos | Estrelas |
|-----------|----------|
| ≥ 90%     | ⭐⭐⭐    |
| ≥ 60%     | ⭐⭐      |
| < 60%     | ⭐        |

---

## 📖 Biblioteca Encantada — Língua Portuguesa
- **ID:** `portugues`
- **Personagem:** 🦉 Luma
- **Cor:** `#7c4dff`
- Fases (1º→5º ano): Alfabeto, Sílabas, Palavras, Frases, Textos

## ➕ Reino dos Números — Matemática
- **ID:** `matematica`
- **Personagem:** 🤖 Byte
- **Cor:** `#0288d1`
- Fases (1º→5º ano): Contando Objetos, Somar e Subtrair, Tabuada do 2, Multiplicação e Divisão, Frações

## 🌳 Floresta das Descobertas — Ciências
- **ID:** `ciencias`
- **Personagem:** 🐢 Teo
- **Cor:** `#2e7d32`
- Fases (1º→5º ano): Meu Corpo, Seres Vivos, Meio Ambiente, Fenômenos da Natureza, Ecossistemas

## 🌎 Mapa do Explorador — Geografia
- **ID:** `geografia`
- **Personagem:** 🦫 Bia
- **Cor:** `#00838f`
- Fases (1º→5º ano): Onde Eu Moro, Meu Bairro e Cidade, Paisagens e Relevo, Regiões do Brasil, Brasil no Mapa

## ⏳ Máquina do Tempo — História
- **ID:** `historia`
- **Personagem:** 🐵 Nino
- **Cor:** `#f57c00`
- Fases (1º→5º ano): Minha Família e Eu, Minha Escola e Comunidade, Povos Originários, Brasil Colonial, Diversidade Cultural Brasileira

## 🎨 Oficina Criativa — Artes
- **ID:** `artes`
- **Personagem:** 🦊 Faísca
- **Cor:** `#c2185b`
- Fases (1º→5º ano): Cores e Formas, Expressão Artística, Música e Ritmo, Teatro e Expressão Corporal, Criação e Cultura Visual

Nota: os personagens acima refletem `frontend/src/data/worlds.js` (fonte usada pelo front para nome/cor/sprite). O `character_key` salvo em cada `Phase` no backend é só metadado e não é lido pelo front — não precisa estar sincronizado.

---

## Banco de questões

Status: **completo** — 6 mundos × 5 anos = 30 fases, 183 questões, geradas em `backend/database/seeders/PhaseSeeder.php` (rodar com `php artisan db:seed --class=PhaseSeeder`, idempotente via `updateOrCreate`).

- Cada questão tem `bncc_code` (aproximado ao padrão `EF0{ano}{disciplina}{nn}`, ex: `EF03MA07`).
- **1º e 2º ano:** texto da pergunta e das alternativas em **CAIXA ALTA** (alfabetização). 3º ao 5º ano: capitalização normal.
- Tipos usados: `multiple_choice` e `true_false`. `fill_blank`/`order` existem no schema mas **não têm renderização no front** (`GamePage.jsx` só desenha `options` como botões) — não usar até haver suporte de UI.
- Conteúdo gerado por IA (Claude); recomendado revisão pedagógica humana antes de uso em sala.

---

## Tipos de Mecânicas por Fase
- **Múltipla escolha** — 4 alternativas, 1 correta
- **Verdadeiro ou Falso** — afirmações simples
- *(Arrastar e soltar, Completar lacuna, Ordenar, Quiz Rápido: descritos como visão futura: sem implementação de UI no momento.)*
