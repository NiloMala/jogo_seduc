# Guia de Setup — Desenvolvimento Local

## Pré-requisitos
- Node.js 20+
- PHP 8.3+
- Composer
- (Opcional) MySQL — por padrão usa SQLite

---

## Backend (Laravel)

```bash
cd backend

# 1. Instalar dependências
composer install

# 2. Copiar .env (já configurado)
# .env já existe com DB_CONNECTION=sqlite

# 3. Gerar chave
php artisan key:generate

# 4. Rodar migrations + seeders
php artisan migrate --seed

# 5. Iniciar servidor
php artisan serve
# Disponível em: http://localhost:8000
```

---

## Frontend (React + Vite)

```bash
cd frontend

# 1. Instalar dependências
npm install

# 2. Iniciar dev server
npm run dev
# Disponível em: http://localhost:5173
```

---

## Rodando tudo junto (no diretório raiz)

Se quiser rodar ambos simultaneamente, use dois terminais separados ou instale `concurrently`:

```bash
# Terminal 1
cd backend && php artisan serve

# Terminal 2
cd frontend && npm run dev
```

---

## Endpoints de API

| Método | Rota                          | Auth | Descrição                  |
|--------|-------------------------------|------|----------------------------|
| POST   | /api/auth/register            | ❌   | Criar conta                |
| POST   | /api/auth/login               | ❌   | Login                      |
| POST   | /api/auth/logout              | ✅   | Logout                     |
| GET    | /api/auth/me                  | ✅   | Dados do usuário logado    |
| GET    | /api/phases?world=X&school_year=Y | ✅ | Fases de um mundo       |
| GET    | /api/phases/{id}/questions    | ✅   | Questões de uma fase       |
| POST   | /api/phases/{id}/submit       | ✅   | Enviar respostas           |
| GET    | /api/progress                 | ✅   | Progresso do aluno         |
| GET    | /api/achievements             | ✅   | Conquistas do aluno        |

### Autenticação
Todas as rotas protegidas exigem header:
```
Authorization: Bearer {token}
```

---

## Usuário de teste (após seed)
- **E-mail:** aluno@teste.com
- **Senha:** password (padrão do factory)
- **Ano:** 1º ano
