# 🏰 DTavern - Marketplace Medieval de RPG

Uma aplicação Angular moderna para marketplace de produtos digitais de RPG de mesa, com temática medieval e design responsivo.

## 🎯 Sobre o Projeto

O **DTavern** é um marketplace especializado em produtos digitais de RPG de mesa, desenvolvido em Angular 17 com TypeScript. A aplicação oferece uma experiência única com design temático medieval, conectando artesãos digitais com jogadores apaixonados por RPG.

## ✨ Funcionalidades

### 🏠 Página Inicial

- **Hero Section** com efeitos visuais mágicos
- **Exibição de Produtos** em destaque
- **Seção de Artesãos** com perfis destacados
- **Navegação responsiva** com tema medieval

### 🛍️ Catálogo de Produtos

- **Sistema de busca** em tempo real
- **Filtros por categoria** (Tokens, Mapas, Aventuras, etc.)
- **Ordenação** por preço, avaliação, downloads
- **Grid responsivo** de produtos
- **Paginação** inteligente

### 👥 Perfis de Artesãos

- **Perfis detalhados** dos criadores
- **Especialidades** e estatísticas
- **Sistema de avaliações**
- **Redes sociais** integradas

### 🎨 Design System

- **Tema medieval** consistente
- **Paleta de cores** personalizada
- **Tipografia** temática (Cinzel + Inter)
- **Animações** suaves e efeitos visuais
- **Responsividade** completa

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Angular 17** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilização
- **RxJS** - Programação reativa
- **Angular Router** - Navegação SPA

### Design & UX

- **Google Fonts** - Tipografia (Cinzel, Inter)
- **CSS Custom Properties** - Variáveis de tema
- **CSS Animations** - Efeitos visuais
- **Responsive Design** - Mobile-first

### Arquitetura

- **Standalone Components** - Componentes independentes
- **Signal-based State** - Estado reativo moderno
- **Service Pattern** - Gerenciamento de dados
- **Type Safety** - Interfaces TypeScript

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd dtavern-angular

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start
```

### Scripts Disponíveis

```bash
npm start          # Executa em modo desenvolvimento
npm run build      # Build para produção
npm run watch      # Build com watch mode
npm test           # Executa testes
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── barra-navegacao/
│   │   ├── secao-hero/
│   │   ├── exibicao-produtos/
│   │   ├── secao-artesoes/
│   │   └── rodape/
│   ├── pages/               # Páginas da aplicação
│   │   ├── pagina-inicial/
│   │   ├── pagina-produtos/
│   │   └── pagina-nao-encontrada/
│   ├── models/              # Interfaces TypeScript
│   │   ├── produto.model.ts
│   │   ├── artesao.model.ts
│   │   ├── usuario.model.ts
│   │   └── carrinho.model.ts
│   ├── services/            # Serviços de dados
│   │   ├── produto.service.ts
│   │   └── artesao.service.ts
│   ├── app.routes.ts        # Configuração de rotas
│   └── app.ts              # Componente principal
├── assets/                  # Recursos estáticos
└── styles.css              # Estilos globais
```

## 🎨 Tema e Design

### Paleta DTavern

- Tavern Wood (Madeira escura) – #4B2E19
  Fundo estrutural, paredes e barras.
- Candlelight Gold (Luz de vela / brilho mágico) – #FFD36A
  Destaques, botões principais, títulos em destaque.
- Brass Accent (Latão/Metais) – #C58B3D
  Ícones, bordas e detalhes decorativos.
- Warm Amber (Âmbar aconchegante) – #FFB347
  Botões secundários, hovers e destaques intermediários.
- Stone Gray (Pedra medieval) – #8C7A6B
  Texto secundário, cards, contrastes suaves.
- Scroll Beige (Pergaminho envelhecido) – #E9D7B8
  Fundos de caixas de texto, modais e áreas de leitura.

🌑 Paleta auxiliar (para equilíbrio e acessibilidade)

- Midnight Brown (Quase preto, para contraste forte) – #1C0F0A
  Texto principal em fundo claro.
- Ash Smoke (Cinza esfumaçado) – #5A4B43
  Divisórias, sombras, transições.

### Tipografia

- **Cinzel** - Títulos e elementos medievais
- **Inter** - Texto do corpo e interface

### Componentes Principais

- **Barra de Navegação** - Navegação responsiva
- **Hero Section** - Seção principal com partículas
- **Exibição de Produtos** - Grid de produtos
- **Seção de Artesãos** - Perfis dos criadores
- **Rodapé** - Links e informações

## 🔧 Configuração

### Tailwind CSS

O projeto utiliza Tailwind CSS com configuração personalizada para o tema medieval:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'tavern-wood': '#8B4513',
        'tavern-brass': '#CD7F32',
        // ... outras cores
      },
      fontFamily: {
        'medieval': ['Cinzel', 'serif'],
        'body': ['Inter', 'sans-serif'],
      }
    }
  }
}
```

### Rotas

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'produtos', component: PaginaProdutosComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];
```

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Funcionalidades Especiais

### Efeitos Visuais

- **Partículas flutuantes** no hero
- **Animações de hover** nos cards
- **Gradientes mágicos** nos botões
- **Backdrop blur** nos overlays

### Interatividade

- **Busca em tempo real**
- **Filtros dinâmicos**
- **Ordenação inteligente**
- **Navegação suave**

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

### Servidor de Produção

```bash
npm run serve:ssr:dtavern-angular
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

**DTavern Team** - Marketplace Medieval de RPG

---

*"Onde a magia encontra a tecnologia, e as aventuras ganham vida digital!"* ✨
