# Operação, qualidade e governança

## Ambientes e branches

| Branch | Ambiente | Pode receber PR de | Responsável pelo merge |
| --- | --- | --- | --- |
| `main` | Produção | `homolog` | Pedro |
| `homolog` | Homologação / QA | `feat/*`, `fix/*`, `chore/*` | Pedro ou pessoa delegada por ele |
| `feat/*`, `fix/*`, `chore/*` | Desenvolvimento | criada a partir de `homolog` | autor da branch via PR |

O fluxo normal é `feature → homolog → main`. Uma correção urgente pode ser criada a partir de `main` com o prefixo `hotfix/`, passar por PR para `main` e ser imediatamente trazida de volta para `homolog`.

## Política de PR

- Nenhuma alteração chega a `main` por push direto.
- Todo merge depende de CI verde e PR aprovado.
- Pedro é o único mergeador de `main` e o responsável pela promoção para produção.
- PR para `homolog` deve ter issue/cartão do Trello, objetivo, critério de aceite, evidência visual e plano de teste.
- O merge deve ser `squash`, com o título no padrão Conventional Commits.

## Proteções a configurar no GitHub

Estas configurações exigem permissão de administrador e não podem ser versionadas no Git:

1. Em **Settings → Rules → Rulesets**, crie uma regra para `main`:
   - bloqueie deleção e force push;
   - exija pull request, uma aprovação e descarte aprovações desatualizadas;
   - exija o status check `lint, tipos e build`;
   - exija conversa resolvida;
   - restrinja bypass/merge a Pedro.
2. Crie a mesma proteção para `homolog`, permitindo PRs e exigindo o status check `lint, tipos e build`.
3. Em **Settings → General → Pull Requests**, habilite apenas **Squash merging** e exija título padrão Conventional Commits pela revisão.
4. Dê aos colaboradores papel **Write** (não Admin); mantenha Pedro como Admin/Maintain.

## Deploy recomendado

Use um único projeto na Vercel conectado ao repositório:

- `main` publica produção;
- `homolog` publica preview estável de homologação;
- cada PR recebe preview isolado para revisão visual.

Defina a raiz do repositório como **Root Directory** do projeto Vercel. Segredos devem ficar somente nas variáveis de ambiente da Vercel/GitHub; nunca em arquivos `.env` commitados.

Não ative auto-promoção de preview para produção: a produção deve continuar vinculada exclusivamente a `main`.

## Backlog e regras de produto

O modelo autenticado no Stitch permitiu registrar o escopo inicial em [REGRAS_DE_NEGOCIO.md](REGRAS_DE_NEGOCIO.md) e o recorte de cartões em [TRELLO_BACKLOG_MVP.md](TRELLO_BACKLOG_MVP.md). O quadro Trello continua exigindo login neste ambiente; ao transcrever os cartões, complemente critérios de aceite e decisões pendentes sem alterar as regras aprovadas.
