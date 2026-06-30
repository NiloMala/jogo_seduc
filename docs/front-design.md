# Front e design

Registro das decisoes de design e frontend. Atualizar este arquivo sempre que uma decisao visual, componente compartilhado ou contrato de UI for criado.

## Responsabilidades

- Codex: design visual, frontend, experiencia de usuario, organizacao de assets e documentacao de UI.
- Claude Code: backend, APIs, regras de negocio, persistencia, logica principal e integracoes.
- Quando houver contrato entre front e back, registrar aqui ou em `docs/arquitetura.md`.

## Entrega atual

Data: 2026-06-29

### Home

- A pagina inicial foi reformulada para parecer uma tela de produto/app, nao apenas um template.
- A Home nao usa mais a imagem grande de referencia como elemento principal de interface.
- A imagem grande dos personagens permanece apenas como referencia/documentacao de design:
  - Caminho no projeto: `frontend/public/assets/characters/personagens-referencia.png`
  - Caminho no navegador: `/assets/characters/personagens-referencia.png`
- A interface usa os componentes SVG animados em `frontend/src/components/bichinhos/`.
- A primeira tela apresenta:
  - Imagem oficial da marca Missão Saber.
  - Chamadas para cadastro/login ou continuar aventura.
  - Cards dos personagens.
  - Cards dos mundos de aprendizagem.
- A hero usa a imagem `/assets/brand/missao-saber-logo.png` no lugar do texto de apresentação.
- A imagem da hero foi substituída pela versão sem fundo da marca.
- A hero não usa mais imagem/personagem lateral.
- O bloco `MS` foi removido do header.
- A faixa animada de personagens abaixo da hero foi removida.

### Dados compartilhados do front

Arquivo criado:

- `frontend/src/data/worlds.js`

Conteudo:

- `characters`: lista fixa de personagens do elenco.
- `worlds`: lista fixa dos mundos.
- `getCharacter(characterId)`: helper para relacionar mundo e personagem.

IDs atuais dos personagens:

- `luma`
- `byte`
- `faisca`
- `teo`
- `nino`
- `bia`

IDs atuais dos mundos:

- `portugues`
- `matematica`
- `ciencias`
- `geografia`
- `historia`
- `artes`

Esses IDs devem ser mantidos tambem pelo backend para evitar traducao manual no front.

### Telas alinhadas ao arquivo de dados

As telas abaixo agora consomem `frontend/src/data/worlds.js`:

- `HomePage`
- `WorldSelectPage`
- `PhaseSelectPage`
- `ProfilePage`

Motivo:

- Reduzir duplicacao de nomes, cores e IDs.
- Facilitar integracao com APIs do backend.
- Manter os mesmos IDs entre front e back.

### Header e HTML base

- `Header` foi limpo e manteve as rotas existentes:
  - `/`
  - `/login`
  - `/register`
  - `/mundos`
  - `/perfil`
- `index.html` foi refeito com titulo e descricao simples em texto ASCII para evitar problemas de codificacao.

### Elenco principal com personagens

Data: 2026-06-29

- Os cards do elenco principal deixaram de usar iniciais.
- A versao com SVG simplificado foi substituida por sprites recortados da referencia visual aprovada.
- Cada card agora renderiza o spritesheet correspondente:
  - Luma
  - Byte
  - Faisca
  - Teo
  - Nino
  - Bia
- Foi adicionada animacao leve de entrada, respiracao/idle e troca de frames em hover nos cards.
- O elenco principal agora usa sequencias PNG de `frontend/public/assets/personagens_sprites/` em vez do spritesheet antigo.
- Ao passar o mouse ou focar um card, o personagem executa uma sequencia curta de aceno/expressao.
- Foi adicionada regra `prefers-reduced-motion` no CSS para reduzir animacoes quando o sistema do usuario solicitar.
- Os sprites foram corrigidos para remover letras da prancha de referencia, linhas de separacao e frames cortados.
- Os cards do elenco receberam mais area visual para evitar clipping dos personagens.
- A grade do elenco principal no desktop foi travada em 3 colunas por 2 linhas, igual ao mapa de aprendizagem.
- Em tablet a grade cai para 2 colunas; em mobile cai para 1 coluna.

Arquivos criados para sprites:

- `frontend/public/assets/characters/sprites/luma-spritesheet.png`
- `frontend/public/assets/characters/sprites/byte-spritesheet.png`
- `frontend/public/assets/characters/sprites/faisca-spritesheet.png`
- `frontend/public/assets/characters/sprites/teo-spritesheet.png`
- `frontend/public/assets/characters/sprites/nino-spritesheet.png`
- `frontend/public/assets/characters/sprites/bia-spritesheet.png`
- `frontend/public/assets/characters/sprites/sprites.json`
- `frontend/src/data/characterSprites.js`
- `frontend/src/components/characters/CharacterSprite.jsx`

Uso:

```jsx
<CharacterSprite id="luma" size={120} title="Luma" />
```

### CSS global

Arquivo alterado:

- `frontend/src/style.css`

Classes principais adicionadas:

- `.app-shell`
- `.button`
- `.button--primary`
- `.button--secondary`
- `.home-hero`
- `.character-board`
- `.section`
- `.section-heading`
- `.character-grid`
- `.character-card`
- `.world-grid`
- `.world-card`
- `.site-footer`

## Regras visuais

- Preferir cards simples com raio moderado e sombra leve.
- Usar as cores dos mundos/personagens como acento, nao como tela inteira.
- Personagens devem aparecer cedo na experiencia.
- Movimento futuro deve respeitar `accessibility-reduced-motion` definido em `docs/personagens-animacoes.md`.
- Evitar depender de emojis como principal elemento visual; usar assets reais quando existirem.

## Pendencias de front

- Criar componentes reutilizaveis para `WorldCard`, `CharacterCard` e `PageShell`.
- Recortar personagens em PNGs individuais ou gerar spritesheets.
- Verificar visual com navegador em desktop e mobile.
- Corrigir textos antigos que ainda vieram do template/primeira versao.

## Verificacao

- `npm install` foi executado para sincronizar dependencias do frontend com `package.json`.
- `npm run build` passou apos a sincronizacao.
- O npm informou 2 vulnerabilidades em dependencias; nao foi usado `npm audit fix --force` para evitar atualizacoes com quebra sem revisao.
