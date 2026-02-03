import { Component, signal, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import {
  SelectCustomizadoComponent,
  OpcaoSelect,
} from '../../components/select-customizado/select-customizado.component';
import { InputCustomizadoComponent } from '../../components/input-customizado/input-customizado.component';
import { ArtesaoService } from '../../services/artesao.service';
import { Artesao } from '../../models/artesao.model';
import { ProdutoService } from '../../services/produto.service';
import {
  CategoriaProdutoService,
  CategoriaProdutoResponse,
} from '../../services/categoria-produto.service';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

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
              <h1 class="text-3xl font-medieval font-bold text-scroll-beige mb-2">
                {{ isModoEdicao() ? 'Editar Produto' : 'Novo Produto' }}
              </h1>
              <p class="text-scroll-beige/70">
                {{
                  isModoEdicao()
                    ? 'Edite o produto da sua loja'
                    : 'Crie um novo produto para sua loja'
                }}
              </p>
              <div *ngIf="artesaoAtual" class="mt-2">
                <span class="text-candlelight-gold font-medium"
                  >Artesão: {{ artesaoAtual.nome }}</span
                >
              </div>
            </div>
            <button
              (click)="irParaLoja()"
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
              <div class="grid md:grid-cols-3 gap-6">
                <!-- Nome -->
                <div class="md:col-span-3">
                  <app-input-customizado
                    label="Nome"
                    placeholder="Digite o nome do produto"
                    [required]="true"
                    [(ngModel)]="produto.nome"
                    name="nome"
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
                    (ngModelChange)="calcularValorPromocional()"
                  />
                </div>

                <!-- Promoção -->
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
                    (ngModelChange)="calcularValorPromocional()"
                  />
                </div>

                <!-- Valor Promocional -->
                <div>
                  <app-input-customizado
                    [readonly]="true"
                    label="Valor com promoção (R$)"
                    [value]="valorPromocionalVisualizacao.toFixed(2).replace('.', ',')"
                    name="valorPromocionalVisualizacao"
                  /> 
                </div>

                  <!-- Categoria -->
                  <div class="md:col-span-3">
                  <app-select-customizado
                    label="Categoria *"
                    [opcoes]="opcoesCategoria"
                    [(ngModel)]="produto.categoriaCodigo"
                    name="categoriaCodigo"
                    placeholder="Selecione uma categoria"
                  />
                </div>

              </div>
            </div>

            <!-- Descrição -->
            <div class="bg-tavern-wood/10 rounded-xl pl-8 pr-8">
              <div class="space-y-6">
                <div>
                  <app-input-customizado
                    label="Descrição Completa"
                    type="textarea"
                    placeholder="Descreva seu produto em detalhes..."
                    [rows]="6"
                    [maxlength]="2000"
                    [(ngModel)]="produto.descricao"
                    name="descricao"
                  />
                  <div class="flex justify-end items-center text-sm text-scroll-beige/70 mt-2">
                    <span>{{ (produto.descricao || '').length }} / 2000 caracteres</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Imagem de Preview -->
            <div class="bg-tavern-wood/10 rounded-xl ml-8 mb-8">
              <div class="space-y-4">
                <!-- Input de arquivo -->
                <div *ngIf="!imagemPreview || imagemPreview === null">
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
          </div>

          <!-- Botões de Ação -->
          <div class="flex items-center justify-between space-x-4 max-w-4xl mx-auto">
            <div>
              <button
                *ngIf="isModoEdicao()"
                type="button"
                (click)="abrirDialogDeletar()"
                class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Deletar
              </button>
            </div>
            <div class="flex items-center space-x-4">
              <button
                type="button"
                (click)="irParaLoja()"
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
          </div>
        </form>
      </div>

      <!-- Dialog de Confirmação de Exclusão -->
      <div
        *ngIf="mostrarDialogDeletar()"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        (click)="fecharDialogDeletar()"
      >
        <div
          class="bg-midnight-brown border border-brass-accent/40 rounded-xl p-6 max-w-md w-full mx-4"
          (click)="$event.stopPropagation()"
        >
          <h3 class="text-xl font-semibold text-scroll-beige mb-4">Confirmar Exclusão</h3>
          <p class="text-scroll-beige/80 mb-6">
            Você realmente deseja deletar este produto? Esta ação não pode ser desfeita.
          </p>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              (click)="fecharDialogDeletar()"
              class="px-6 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors"
            >
              Não
            </button>
            <button
              type="button"
              (click)="confirmarDeletar()"
              class="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Sim
            </button>
          </div>
        </div>
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
export class CadastroProdutoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private artesaoService = inject(ArtesaoService);
  private produtoService = inject(ProdutoService);
  private categoriaProdutoService = inject(CategoriaProdutoService);
  private cdr = inject(ChangeDetectorRef);

  produto: any = {
    nome: '',
    descricao: '',
    categoriaCodigo: '',
    valorUnitario: 0,
    promocaoPorcentagem: 0,
    gratuito: false,
  };

  // Artesão atual
  artesaoAtual: Artesao | null = null;

  // Domínio da loja atual (para redirecionamento)
  lojaDominio: string | null = null;

  // Opções para o select de categoria (será preenchido com dados da API)
  opcoesCategoria: OpcaoSelect[] = [];

  // Imagem de preview
  imagemSelecionada: File | null = null;
  imagemPreview: string | null = null;
  imagemAlterada: boolean = false;

  // Modo de edição
  isModoEdicao = signal(false);
  nomeNormalizadoProduto: string | null = null;

  // Dialog de confirmação de exclusão
  mostrarDialogDeletar = signal(false);

  valorPromocionalVisualizacao = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.router = inject(Router);
    }
  }

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      // Está rodando fora do browser (Node / SSR / Vite)
      return;
    }

    this.validarAcessoArtesao();
    this.carregarCategorias();

    // Verificar se está em modo de edição (síncrono usando snapshot)
    const nomeNormalizado = this.route.snapshot.queryParams['produto'];
    if (nomeNormalizado) {
      await this.carregarProdutoParaEdicao(nomeNormalizado);
    }
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

  async carregarProdutoParaEdicao(nomeNormalizado: string) {
    this.isModoEdicao.set(true);
    this.nomeNormalizadoProduto = nomeNormalizado;

    const produto = await firstValueFrom(
      this.produtoService.buscarProdutoPorNomeNormalizado(nomeNormalizado)
    );
    this.produto = produto;
    this.imagemPreview = produto.urlPreview;
    this.cdr.detectChanges();
  }

  calcularValorPromocional() {
    
    const porcentagem = 100 - this.produto.promocaoPorcentagem;

    this.valorPromocionalVisualizacao = this.produto.valorUnitario * (porcentagem / 100);
  }

  private validarAcessoArtesao() {
    // Buscar informações da loja logada usando getMeLoja()
    this.artesaoService.getMeLoja().subscribe({
      next: (meResponseLoja) => {
        // Armazenar o domínio da loja para uso na função voltar()
        this.lojaDominio = meResponseLoja.dominio;

        // Converter MeResponseLoja para Artesao
        this.artesaoAtual = {
          dominio: meResponseLoja.dominio,
          nome: meResponseLoja.nomeLoja,
          biografia: '', // MeResponseLoja não tem descrição/biografia
        };
      },
      error: (error) => {
        console.warn('Erro ao buscar informações da loja logada:', error);
        this.redirecionarParaInicio();
      },
    });
  }

  private redirecionarParaInicio() {
    // Limpar dados locais
    this.lojaDominio = null;
    this.artesaoAtual = null;

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
        categoriaCodigo: this.produto.categoriaCodigo,
        valorUnitario: this.produto.gratuito ? 0 : this.produto.valorUnitario || 0,
        promocaoPorcentagem: this.produto.promocaoPorcentagem || 0,
        gratuito: this.produto.gratuito || false,
      };

      let nomeNormalizado: string;

      if (this.isModoEdicao() && this.nomeNormalizadoProduto) {
        // Modo de edição: atualizar produto existente
        await firstValueFrom(
          this.produtoService.atualizarProduto(this.nomeNormalizadoProduto, dtoProduto)
        );
        nomeNormalizado = this.nomeNormalizadoProduto;
      } else {
        // Modo de criação: criar novo produto
        const resposta = await firstValueFrom(
          this.produtoService.adicionarProduto(dtoProduto, this.artesaoAtual.dominio)
        );
        nomeNormalizado = resposta?.nomeNormalizado;
      }

      if (this.imagemAlterada) {
        await firstValueFrom(this.produtoService.deleteMidiaProduto(this.produto.idMidiaPreview!));
      }

      // Se houver imagem selecionada, fazer upload
      if (this.imagemSelecionada && nomeNormalizado && this.imagemAlterada) {
        try {
          await firstValueFrom(
            this.produtoService.uploadImagemProduto(
              nomeNormalizado,
              this.imagemSelecionada,
              'preview'
            )
          );
        } catch (uploadError) {
          console.error('Erro ao fazer upload da imagem:', uploadError);
          alert(
            this.isModoEdicao()
              ? 'Produto atualizado, mas houve erro ao fazer upload da imagem.'
              : 'Produto salvo, mas houve erro ao fazer upload da imagem.'
          );
        }
      }

      alert(this.isModoEdicao() ? 'Produto atualizado com sucesso!' : 'Produto salvo com sucesso!');
      // Redirecionar para a loja específica
      this.irParaLoja();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert(
        this.isModoEdicao()
          ? 'Erro ao atualizar produto. Tente novamente.'
          : 'Erro ao salvar produto. Tente novamente.'
      );
    }
  }

  onImagemSelecionada(event: Event) {
    this.imagemAlterada = true;
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
    this.imagemAlterada = true;
  }

  irParaLoja() {
    // Usar o domínio da loja atual armazenado na propriedade do componente
    if (this.lojaDominio) {
      // Redirecionar para a loja específica
      this.router.navigate(['/lojas', this.lojaDominio]);
    } else {
      // Se não houver domínio, ir para a página inicial
      this.router.navigate(['/']);
    }
  }

  abrirDialogDeletar() {
    this.mostrarDialogDeletar.set(true);
  }

  fecharDialogDeletar() {
    this.mostrarDialogDeletar.set(false);
  }

  async confirmarDeletar() {
    if (!this.nomeNormalizadoProduto) {
      return;
    }
    this.fecharDialogDeletar();

    try {
      await firstValueFrom(this.produtoService.deletarProduto(this.nomeNormalizadoProduto!));
      alert('Produto deletado com sucesso!');
      this.fecharDialogDeletar();
      this.irParaLoja();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto. Tente novamente.');
      this.fecharDialogDeletar();
    }
  }
}
