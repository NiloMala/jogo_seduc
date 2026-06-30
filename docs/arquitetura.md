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
