import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { Produto, CategoriaProduto } from '../../models/produto.model';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraNavegacaoComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="false" />
      
      <!-- Header -->
      <div class="bg-midnight-brown/80 border-b border-brass-accent/30">
        <div class="container mx-auto px-4 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-medieval font-bold text-scroll-beige mb-2">
                Novo Produto
              </h1>
              <p class="text-scroll-beige/70">
                Crie um novo produto para sua loja
              </p>
            </div>
            <button 
              (click)="voltar()"
              class="px-6 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors"
            >
              Voltar para loja
            </button>
          </div>
        </div>
      </div>

      <!-- Formulário -->
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
          <form (ngSubmit)="salvarProduto()" class="space-y-8">
            <!-- Informações Básicas -->
            <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Informações Básicas</h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Título -->
                <div class="md:col-span-2">
                  <label class="block text-scroll-beige font-medium mb-2">
                    Título <span class="text-red-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="produto.titulo"
                    name="titulo"
                    required
                    placeholder="Digite o título do produto"
                    class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                  />
                </div>

                <!-- Categoria -->
                <div>
                  <label class="block text-scroll-beige font-medium mb-2">
                    Categoria <span class="text-red-400">*</span>
                  </label>
                  <select 
                    [(ngModel)]="produto.categoria"
                    name="categoria"
                    required
                    class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option *ngFor="let categoria of categorias" [value]="categoria">
                      {{ categoria }}
                    </option>
                  </select>
                </div>

                <!-- Valor Unitário -->
                <div>
                  <label class="block text-scroll-beige font-medium mb-2">
                    Valor Unitário (R$) <span class="text-red-400">*</span>
                  </label>
                  <input 
                    type="number" 
                    [(ngModel)]="produto.valorUnitario"
                    name="valorUnitario"
                    required
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                    class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                  />
                </div>
              </div>
            </div>

            <!-- Descrição -->
            <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Descrição</h2>
              
              <div>
                <label class="block text-scroll-beige font-medium mb-2">
                  Descrição do Produto
                </label>
                <textarea 
                  [(ngModel)]="produto.descricao"
                  name="descricao"
                  rows="6"
                  placeholder="Descreva seu produto em detalhes..."
                  class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold resize-none"
                ></textarea>
              </div>
            </div>

            <!-- Tags -->
            <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Tags</h2>
              
              <div>
                <label class="block text-scroll-beige font-medium mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input 
                  type="text" 
                  [(ngModel)]="tagsInput"
                  name="tags"
                  placeholder="fantasia, medieval, tokens, rpg..."
                  class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                />
                <p class="text-scroll-beige/60 text-sm mt-2">
                  As tags ajudam os clientes a encontrar seu produto
                </p>
              </div>
            </div>

            <!-- Imagens -->
            <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Imagens</h2>
              
              <div>
                <label class="block text-scroll-beige font-medium mb-2">
                  URLs das Imagens (uma por linha)
                </label>
                <textarea 
                  [(ngModel)]="imagensInput"
                  name="imagens"
                  rows="4"
                  placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
                  class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold resize-none"
                ></textarea>
                <p class="text-scroll-beige/60 text-sm mt-2">
                  Adicione URLs de imagens do seu produto (uma por linha)
                </p>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="flex items-center justify-end space-x-4">
              <button 
                type="button"
                (click)="voltar()"
                class="px-6 py-3 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors"
              >
                Voltar para loja
              </button>
              <button 
                type="submit"
                [disabled]="!formularioValido()"
                class="px-8 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CadastroProdutoComponent {
  private router = inject(Router);

  produto: Partial<Produto> = {
    titulo: '',
    descricao: '',
    categoria: '' as CategoriaProduto,
    tags: [],
    imagens: [],
    valorUnitario: 0
  };

  tagsInput = '';
  imagensInput = '';

  categorias = Object.values(CategoriaProduto);

  formularioValido(): boolean {
    return !!(this.produto.titulo && this.produto.categoria && this.produto.valorUnitario && this.produto.valorUnitario > 0);
  }

  salvarProduto() {
    if (!this.formularioValido()) {
      return;
    }

    // Processar tags
    const tags = this.tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Processar imagens
    const imagens = this.imagensInput
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    // Atualizar produto com dados processados
    this.produto = {
      ...this.produto,
      tags,
      imagens,
      // Dados simulados para demonstração
      uuid: this.gerarUUID(),
      artesaoId: 'artesao-demo',
      nomeArtesao: 'Artesão Demo',
      avaliacao: 0,
      numeroAvaliacoes: 0,
      numeroDownloads: 0,
      tamanhoArquivo: 'N/A',
      requisitos: 'N/A',
      dataCriacao: new Date(),
      dataAtualizacao: new Date()
    };

    // Aqui você salvaria o produto no serviço
    console.log('Produto a ser salvo:', this.produto);
    
    // Simular salvamento e redirecionar
    alert('Produto salvo com sucesso!');
    this.voltar();
  }

  voltar() {
    // Verificar se há um domínio de loja salvo no sessionStorage
    const lojaDominio = sessionStorage.getItem('lojaDominio');
    if (lojaDominio) {
      // Redirecionar para a loja específica
      this.router.navigate(['/lojas', lojaDominio]);
      // Limpar o sessionStorage após usar
      sessionStorage.removeItem('lojaDominio');
    } else {
      // Se não houver domínio salvo, ir para a página inicial
      this.router.navigate(['/']);
    }
  }

  private gerarUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
