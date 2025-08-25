# Botão Padrão

Componente reutilizável de botão com animação de reflexo de luz.

## Características

- **Cor de fundo**: `bg-candlelight-gold/80` (dourado semi-transparente)
- **Cor do texto**: `text-tavern-wood` (marrom escuro)
- **Animação**: Reflexo de luz que passa da esquerda para direita no hover
- **Duração da animação**: 1.2 segundos
- **Responsivo**: Suporte a diferentes tamanhos

## Uso

### Importar o componente

```typescript
import { BotaoPadraoComponent } from '../botao-padrao/botao-padrao.component';

@Component({
  imports: [BotaoPadraoComponent],
  // ...
})
```

### Exemplos de uso

#### Botão básico
```html
<app-botao-padrao>
  Clique aqui
</app-botao-padrao>
```

#### Botão com roteamento
```html
<app-botao-padrao routerLink="/produtos">
  Ver Produtos
</app-botao-padrao>
```

#### Botão com largura total
```html
<app-botao-padrao [fullWidth]="true">
  Botão Largo
</app-botao-padrao>
```

#### Botão com tamanho personalizado
```html
<app-botao-padrao size="lg">
  Botão Grande
</app-botao-padrao>
```

#### Botão desabilitado
```html
<app-botao-padrao [disabled]="true">
  Botão Desabilitado
</app-botao-padrao>
```

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `routerLink` | `string` | `undefined` | Rota para navegação |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo do botão |
| `disabled` | `boolean` | `false` | Se o botão está desabilitado |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do botão |
| `fullWidth` | `boolean` | `false` | Se o botão ocupa toda a largura |

## Tamanhos

- **sm**: `px-3 py-1.5 text-sm` (pequeno)
- **md**: `px-4 py-2 text-sm` (médio - padrão)
- **lg**: `px-6 py-3 text-base` (grande)

## Estilo CSS

O componente inclui:
- Background dourado semi-transparente
- Texto marrom escuro
- Bordas arredondadas
- Sombra no hover
- Animação de reflexo de luz
- Estados desabilitados
- Transições suaves
