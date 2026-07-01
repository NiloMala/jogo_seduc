# Arquitetura do Projeto

## Stack
| Camada     | Tecnologia                  | Versão   |
|------------|-----------------------------|----------|
| Frontend   | React + Vite                | 18 / 5   |
| Jogo       | Phaser                      | 3.x      |
| Rotas      | React Router DOM            | 6.x      |
| Estado     | Zustand                     | 5.x      |
| HTTP       | Axios                       | 1.x      |
| Backend    | Laravel                     | 11.x     |
| Banco      | MySQL (prod) / SQLite (dev) | —        |
| Auth       | Laravel Sanctum (tokens)    | —        |

---

## Estrutura de Pastas — Frontend

```
frontend/
├── src/
│   ├── api/          # Chamadas HTTP (auth.js, progress.js, questions.js)
│   ├── assets/       # Imagens e SVGs estáticos
│   ├── components/
│   │   ├── bichinhos/  # Componentes React SVG dos personagens
│   │   ├── layout/     # Header, PrivateRoute
│   │   └── ui/         # Modal, ProgressBar, StarRating
│   ├── game/
│   │   ├── bichinhos/  # Classes Phaser dos personagens
│   │   ├── mechanics/  # QuestionEngine, ScoreEngine
│   │   └── scenes/     # BootScene, PreloadScene, GameScene, ResultScene
│   ├── hooks/        # useProgress, useSound
│   ├── pages/        # Páginas React (Home, Login, Register, WorldSelect, etc.)
│   ├── store/        # Zustand stores (authStore, gameStore, progressStore)
│   └── utils/        # bnccMap.js, starCalc.js
```

## Estrutura de Pastas — Backend

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── PhaseController.php
│   │   │   ├── ProgressController.php
│   │   │   └── AchievementController.php
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Character.php
│   │   ├── Phase.php
│   │   ├── Question.php
│   │   ├── Progress.php
│   │   ├── Achievement.php
│   │   └── UserCharacter.php
│   └── Services/
│       └── ProgressService.php
├── database/
│   ├── migrations/
│   └── seeders/
└── routes/
    ├── api.php
    └── web.php
```

---

## Fluxo de Autenticação
1. `POST /api/auth/register` → retorna `{ token, user }`
2. `POST /api/auth/login` → retorna `{ token, user }`
3. Token Bearer em todas as rotas protegidas
4. `POST /api/auth/logout` → invalida token

## Fluxo de Jogo
1. Aluno seleciona **Mundo** → `GET /api/phases?school_year=X&world=Y`
2. Seleciona **Fase** → `GET /api/phases/{id}/questions`
3. Joga → **Phaser GameScene** renderiza as perguntas
4. Finaliza → `POST /api/phases/{id}/submit` → retorna `{ stars, xp, correct, total }`
5. Atualiza Zustand progressStore com as estrelas

---

## Colaboração GPT + Claude Code
- **Claude Code:** arquitetura, backend, lógica Phaser, stores, APIs
- **GPT:** design visual, componentes UI refinados, assets dos personagens

---

## Correções registradas (2026-06-30)

Bugs encontrados e corrigidos durante a geração do banco de questões e ajustes de UI. Registrados aqui para não serem reintroduzidos.

### Backend

1. **Login sempre dava 500.** `Laravel\Sanctum\SanctumServiceProvider` não estava registrado em `backend/bootstrap/providers.php`, então a migration de `personal_access_tokens` nunca era publicada/rodada. Corrigido: provider registrado + `php artisan vendor:publish --tag=sanctum-migrations` + `php artisan migrate`.
2. **Buscar progresso do usuário quebrava com 500.** `App\Models\Progress` não tinha `$table` explícito; o Eloquent infere `progress` (singular — "progress" é tratado como incontável), mas a migration criou a tabela `progresses`. Corrigido com `protected $table = 'progresses';` no model.

### Frontend

3. **Personagem errado no `GamePage.jsx`.** `getWorldCharacter(phaseId)` tentava extrair o mundo fazendo `phaseId.split('-')`, mas a rota usa o ID numérico da fase (`/fases/16/jogo`), não `mundo-numero`. Isso fazia qualquer mundo além do primeiro do array (`portugues`) cair no fallback `worlds[0]` e mostrar a Luma. Corrigido passando `worldId` via `navigate(path, { state: { worldId } })` em `PhaseSelectPage.jsx` e lendo com `useLocation().state?.worldId` em `GamePage.jsx`. **Atenção:** se a navegação para `/fases/:id/jogo` for reescrita novamente, não esquecer de manter esse `state`.
4. **Barra de progresso do jogo chegava a 100% antes de responder a última pergunta.** Fórmula era `(current + 1) / total`. Trocado para `current / total`, e some +1 só quando a última resposta é confirmada (ver item 6).
5. **Resposta podia não ser contabilizada em clique duplo rápido.** O guard usava o estado `selected` (`if (selected !== null) return`), que não é síncrono — dois cliques rápidos podiam passar antes do React re-renderizar. Trocado para uma `ref` (`answeredRef`), que é sempre síncrona.
6. **Fluxo de confirmação da última pergunta.** Por pedido de produto: na última pergunta, o botão mostra "Próxima →" primeiro (confirma a resposta) e só no clique seguinte vira "Ver Resultado 🎉". O botão de avançar/ver-resultado só aparece depois que a animação de reação do personagem termina (`selected !== null && reaction === 'idle'`), não junto com a resposta.

Ver também `docs/front-design.md` para o redesenho do mapa de fases (`PhaseSelectPage.jsx`) e os bugs de animação de caminhada corrigidos lá.
