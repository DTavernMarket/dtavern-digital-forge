import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import {
  SelectCustomizadoComponent,
  OpcaoSelect,
} from '../../components/select-customizado/select-customizado.component';
import { InputCustomizadoComponent } from '../../components/input-customizado/input-customizado.component';
import { Produto } from '../../models/produto.model';
import { ArtesaoService } from '../../services/artesao.service';
import { Artesao } from '../../models/artesao.model';
import { ProdutoService } from '../../services/produto.service';
import {
  CategoriaProdutoService,
  CategoriaProdutoResponse,
} from '../../services/categoria-produto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BarraNavegacaoComponent,
    SelectCustomizadoComponent,
    InputCustomizadoComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="false" />

      <!-- Header -->
      <div class="bg-midnight-brown/80 border-b border-brass-accent/30">
        <div class="container mx-auto px-4 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-medieval font-bold text-scroll-beige mb-2">Novo Produto</h1>
              <p class="text-scroll-beige/70">Crie um novo produto para sua loja</p>
              <div *ngIf="artesaoAtual" class="mt-2">
                <span class="text-candlelight-gold font-medium"
                  >Artesão: {{ artesaoAtual.nome }}</span
                >
              </div>
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
        <form (ngSubmit)="salvarProduto()" class="space-y-8">
          <!-- Divisor -->
          <div class="border border-brass-accent/30 rounded-xl max-w-4xl mx-auto">
            <!-- Informações Básicas -->
            <div class="bg-tavern-wood/10 p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Informações Básicas</h2>

              <div class="grid md:grid-cols-2 gap-6">
                <!-- Nome -->
                <div class="md:col-span-2">
                  <app-input-customizado
                    label="Nome"
                    placeholder="Digite o nome do produto"
                    [required]="true"
                    [(ngModel)]="produto.nome"
                    name="nome"
                  />
                </div>

                <!-- Categoria -->
                <div>
                  <app-select-customizado
                    label="Categoria *"
                    [opcoes]="opcoesCategoria"
                    [(ngModel)]="produto.categoriaCodigo"
                    name="categoriaCodigo"
                    placeholder="Selecione uma categoria"
                  />
                </div>

                <!-- Valor Unitário -->
                <div>
                  <app-input-customizado
                    label="Valor Unitário (R$)"
                    type="number"
                    placeholder="0,00"
                    [required]="true"
                    [min]="0"
                    [step]="0.01"
                    [(ngModel)]="produto.valorUnitario"
                    name="valorUnitario"
                  />
                </div>
              </div>
            </div>

            <!-- Descrição -->
            <div class="bg-tavern-wood/10 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Descrição</h2>

              <div class="space-y-6">
                <div>
                  <app-input-customizado
                    label="Resumo"
                    type="textarea"
                    placeholder="Resumo curto do produto (até 200 caracteres)..."
                    [rows]="3"
                    [(ngModel)]="produto.resumo"
                    name="resumo"
                  />
                </div>
                <div>
                  <app-input-customizado
                    label="Descrição Completa"
                    type="textarea"
                    placeholder="Descreva seu produto em detalhes..."
                    [rows]="6"
                    [(ngModel)]="produto.descricao"
                    name="descricao"
                  />
                </div>
              </div>
            </div>

            <!-- Imagem de Preview -->
            <div class="bg-tavern-wood/10 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Imagem de Preview</h2>

              <div class="space-y-4">
                <!-- Input de arquivo -->
                <div>
                  <label class="block text-sm font-medium text-scroll-beige mb-2">
                    Selecione uma imagem
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    (change)="onImagemSelecionada($event)"
                    class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-candlelight-gold file:text-tavern-wood hover:file:bg-candlelight-gold/90 file:cursor-pointer cursor-pointer focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                  />
                </div>

                <!-- Preview da imagem -->
                <div *ngIf="imagemPreview" class="mt-4">
                  <p class="text-sm text-scroll-beige/70 mb-2">Preview:</p>
                  <div class="relative inline-block">
                    <img
                      [src]="imagemPreview"
                      alt="Preview da imagem"
                      class="max-w-xs max-h-64 rounded-lg border border-brass-accent/40 object-cover"
                    />
                    <button
                      type="button"
                      (click)="removerImagem()"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Preço e Promoção -->
            <div class="bg-tavern-wood/10 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Preço e Promoção</h2>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <app-input-customizado
                    label="Valor Unitário (R$)"
                    type="number"
                    placeholder="0,00"
                    [required]="true"
                    [min]="0"
                    [step]="0.01"
                    [(ngModel)]="produto.valorUnitario"
                    name="valorUnitario"
                  />
                </div>
                <div>
                  <app-input-customizado
                    label="Promoção (%)"
                    type="number"
                    placeholder="0"
                    [min]="0"
                    [max]="100"
                    [step]="1"
                    [(ngModel)]="produto.promocaoPorcentagem"
                    name="promocaoPorcentagem"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex items-center justify-end space-x-4 max-w-4xl mx-auto">
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
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CadastroProdutoComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private artesaoService = inject(ArtesaoService);
  private produtoService = inject(ProdutoService);
  private categoriaProdutoService = inject(CategoriaProdutoService);

  produto: Partial<Produto> = {
    nome: '',
    descricao: '',
    resumo: '',
    categoriaCodigo: '',
    valorUnitario: 0,
    promocaoPorcentagem: 0,
    gratuito: false,
  };

  // Artesão atual
  artesaoAtual: Artesao | null = null;

  // Opções para o select de categoria (será preenchido com dados da API)
  opcoesCategoria: OpcaoSelect[] = [];

  // Imagem de preview
  imagemSelecionada: File | null = null;
  imagemPreview: string | null = null;

  ngOnInit() {
    this.validarAcessoArtesao();
    this.carregarCategorias();
  }

  private carregarCategorias() {
    this.categoriaProdutoService.buscarCategorias().subscribe({
      next: (categorias: CategoriaProdutoResponse[]) => {
        this.opcoesCategoria = categorias.map((categoria) => ({
          value: categoria.codigo,
          label: categoria.nome,
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        // Em caso de erro, manter array vazio ou usar valores padrão se necessário
      },
    });
  }

  private validarAcessoArtesao() {
    // Buscar domínio do artesão no sessionStorage
    const lojaDominio = sessionStorage.getItem('lojaDominio');

    if (!lojaDominio) {
      console.warn('Nenhum domínio de loja encontrado no sessionStorage');
      this.redirecionarParaInicio();
      return;
    }

    // Buscar artesão pelo domínio
    this.artesaoService.buscarLojaPorDominio(lojaDominio).subscribe({
      next: (lojaResponse) => {
        // Converter LojaResponse para Artesao com valores padrão para campos não disponíveis
        this.artesaoAtual = {
          dominio: lojaResponse.dominio,
          nome: lojaResponse.nome,
          biografia: lojaResponse.descricao, // descricao do backend vira biografia
        };
      },
      error: (error) => {
        console.warn(`Artesão com domínio '${lojaDominio}' não encontrado:`, error);
        this.redirecionarParaInicio();
      }
    });
  }

  private redirecionarParaInicio() {
    // Limpar sessionStorage
    sessionStorage.removeItem('lojaDominio');

    // Redirecionar para página inicial
    this.router.navigate(['/']);
  }

  formularioValido(): boolean {
    return !!(
      this.produto.nome &&
      this.produto.categoriaCodigo &&
      (this.produto.gratuito || (this.produto.valorUnitario && this.produto.valorUnitario > 0))
    );
  }

  async salvarProduto() {
    if (!this.formularioValido()) {
      return;
    }

    if (!this.artesaoAtual) {
      return;
    }

    try {
      const dtoProduto = {
        nome: this.produto.nome,
        descricao: this.produto.descricao || '',
        resumo: this.produto.resumo || this.produto.descricao?.substring(0, 200) || '',
        categoriaCodigo: this.produto.categoriaCodigo,
        valorUnitario: this.produto.gratuito ? 0 : (this.produto.valorUnitario || 0),
        promocaoPorcentagem: this.produto.promocaoPorcentagem || 0,
        gratuito: this.produto.gratuito || false,
      };

      // Salvar o produto primeiro
      const resposta = await firstValueFrom(
        this.produtoService.adicionarProduto(dtoProduto, this.artesaoAtual.dominio)
      );

      // Se houver imagem selecionada, fazer upload
      if (this.imagemSelecionada) {
        
        const nomeNormalizado = resposta?.nomeNormalizado;
        
        try {
          await firstValueFrom(
            this.produtoService.uploadImagemProduto(nomeNormalizado, this.imagemSelecionada, 'preview')
          );
        } catch (uploadError) {
          console.error('Erro ao fazer upload da imagem:', uploadError);
          alert('Produto salvo, mas houve erro ao fazer upload da imagem.');
        }
      }

      alert('Produto salvo com sucesso!');
      this.voltar();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Tente novamente.');
    }
  }

  onImagemSelecionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const arquivo = input.files[0];
      
      // Validar se é uma imagem
      if (!arquivo.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }

      this.imagemSelecionada = arquivo;

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagemPreview = e.target?.result as string;
      };
      reader.readAsDataURL(arquivo);
    }
  }

  removerImagem() {
    this.imagemSelecionada = null;
    this.imagemPreview = null;
  }


  voltar() {
    // Verificar se há um domínio de loja salvo no sessionStorage
    const lojaDominio = sessionStorage.getItem('lojaDominio');
    if (lojaDominio) {
      // Redirecionar para a loja específica
      this.router.navigate(['/lojas', lojaDominio]);
      // Manter o sessionStorage para futuras navegações
    } else {
      // Se não houver domínio salvo, ir para a página inicial
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    // Limpar URL do preview para evitar vazamento de memória
    if (this.imagemPreview && this.imagemPreview.startsWith('data:')) {
      // URLs data: não precisam ser revogadas
      // Mas se fosse uma URL.createObjectURL, precisaria fazer URL.revokeObjectURL()
    }
  }
}
