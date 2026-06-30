# Referência de API

## Autenticação

### `POST /api/auth/register`
**Body:**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "minhasenha",
  "password_confirmation": "minhasenha",
  "school_year": 2
}
```
**Response 201:**
```json
{
  "token": "1|abc...",
  "user": { "id": 1, "name": "Maria Silva", "email": "...", "school_year": 2 }
}
```

---

### `POST /api/auth/login`
**Body:** `{ "email": "...", "password": "..." }`
**Response 200:** `{ "token": "...", "user": {...} }`

---

### `POST /api/auth/logout`
**Header:** `Authorization: Bearer {token}`
**Response 200:** `{ "message": "Logout realizado." }`

---

## Fases

### `GET /api/phases?world=portugues&school_year=1`
**Response:**
```json
[
  { "id": 1, "number": 1, "title": "O Alfabeto", "character_key": "luma" },
  { "id": 2, "number": 2, "title": "Sílabas Simples", "character_key": "luma" }
]
```

---

### `GET /api/phases/{id}/questions`
**Response:**
```json
[
  {
    "id": 1,
    "question": "Qual letra começa a palavra BOLA?",
    "type": "multiple_choice",
    "options": ["A", "B", "C", "D"],
    "correct": "B"
  }
]
```

---

### `POST /api/phases/{id}/submit`
**Body:**
```json
{
  "answers": [
    { "questionId": 1, "answer": "B", "correct": true },
    { "questionId": 2, "answer": "F", "correct": false }
  ]
}
```
**Response:**
```json
{
  "stars": 2,
  "score": 30,
  "correct": 3,
  "total": 5
}
```

---

## Progresso

### `GET /api/progress`
**Response:**
```json
[
  { "phase_id": 1, "stars": 3, "score": 50, "correct": 5, "total": 5 },
  { "phase_id": 2, "stars": 2, "score": 40, "correct": 4, "total": 5 }
]
```

---

### `GET /api/achievements`
**Response:**
```json
[
  { "id": 1, "name": "Primeira Estrela!", "description": "Ganhou a primeira estrela", "icon": "⭐" }
]
```
