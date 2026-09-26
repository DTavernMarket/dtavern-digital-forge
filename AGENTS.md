# dtavern-digital-forge - Frontend (Angular)

SPA do marketplace DTavern. Consome a API Quarkus em `dtavern-server`.

## Stack e padroes

- **Angular 20.3** com componentes **standalone** (sem NgModules) e **bootstrap** via
  `bootstrapApplication` (`src/main.ts`).
- **Change detection zoneless** (`provideZonelessChangeDetection`); use **signals** para estado.
- **HTTP** com `withFetch()` + interceptor funcional. Templates em sua maioria **inline** (poucos `.html`/`.css` por componente).
- **Estilo:** Tailwind CSS 3.4 (tema medieval/taverna - cores `tavern-wood`, `candlelight-gold`,
  etc. em `tailwind.config.js`); CSS global em `src/styles.css`. **PrimeNG** usado pontualmente
  (ex.: `pagina-explorar`).
- **Auth:** Firebase (email/senha). Token JWT mantido **so em memoria** (BehaviorSubject), nao em localStorage.

## Como rodar

```bash
ng serve            # dev, porta 4200, aponta para http://localhost:8080/api/v1
ng build            # build de producao
```

Ambientes em `src/environment/`: `environment.ts` (dev), `environment.hml.ts` (homolog),
`environment.prod.ts` (prod). `apiBaseUrl` e `firebaseConfig` vivem ali. Substituicao definida em `angular.json`.

## Estrutura de `src/app/`

```
config/        auth.guard.ts, loja-owner.guard.ts, auth.interceptor.ts, firebase.config.ts
models/        auth, produto, artesao, cliente, venda, pagamento, arquivo-produto, carrinho, firebase-error-handler
services/      auth, artesao, cliente, produto, categoria-produto
pages/         paginas roteaveis (uma pasta por pagina)
components/    componentes reutilizaveis (navbar, rodape, hero, dialogs, inputs, etc.)
app.routes.ts  definicao de rotas
app.config.ts  providers globais (router, http, interceptor, zoneless)
```

> Guards e interceptors ficam em `config/` (nao ha pastas `guards/`/`interceptors/`).

## Rotas (`app.routes.ts`)

| Rota | Componente | Guard |
|------|------------|-------|
| `` | `PaginaInicialComponent` | - |
| `explorar` | `PaginaExplorarComponent` | - |
| `sobre`, `termos-uso`, `politica-privacidade` | paginas institucionais | - |
| `produtos/:nomeNormalizado` | `ProdutoDetalheComponent` | - |
| `lojas/:dominio` | `LojaArtesaoComponent` | - |
| `lojas/:dominio/gerenciar-produtos` | `GerenciarProdutosComponent` | `authGuard` + `lojaOwnerGuard` |
| `novo-produto`, `editar-produto` | `CadastroProdutoComponent` | `authGuard` |
| `login`, `cadastro` | autenticacao | - |
| `meu-perfil`, `biblioteca` | conta do usuario | `authGuard` |
| `**` | `PaginaNaoEncontradaComponent` | - |

## Services -> endpoints

| Service | Responsabilidade |
|---------|------------------|
| `auth.service.ts` | Login/logout/reset via Firebase; registro de comprador; `verifyToken`; estado do usuario (token + claims em memoria) |
| `artesao.service.ts` | Lojas: listar, buscar por dominio, criar, editar, verificar dono, upload de midia (`/lojas`, `/client/lojas`) |
| `cliente.service.ts` | Comprador: criar, perfil (`me`), biblioteca, upload de foto (`/clientes`, `/client/clientes`) |
| `produto.service.ts` | Produtos: CRUD, comprar, downloads, upload de arquivos (preview/conteudo) (`/produtos`, `/client/produtos`) |
| `categoria-produto.service.ts` | Lista categorias (`/categorias-produtos`) |

## Autenticacao no cliente

1. `firebase.config.ts` inicializa o Firebase; login emite o ID Token (JWT).
2. `auth.service.ts` guarda usuario+token em memoria e expoe `initialized$`, roles e `dominio` (custom claims).
3. `auth.interceptor.ts` injeta `Authorization: Bearer <token>` nas requisicoes apos a inicializacao.
4. `auth.guard.ts` protege rotas autenticadas; `loja-owner.guard.ts` valida se o usuario e dono da loja (via `artesao.service.verifyOwner`).

## Pegadinhas conhecidas

- `environment.prod.ts` nao define `firebaseConfig`.
- `deleteComprador` (`auth.service.ts`) usa URL hardcoded em vez de `environment.apiBaseUrl`.
- `carrinho.model.ts` parece legado (fluxo atual e compra direta, sem carrinho).
- `ExibicaoProdutosComponent` linka `/explorar/:slug`, mas o detalhe de produto e `/produtos/:nomeNormalizado`.
