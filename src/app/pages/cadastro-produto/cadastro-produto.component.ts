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
import { Midia } from '../../models/produto.model';

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
          <div class="border border-brass-accent/30 rounded-xl max-w-4xl mx-auto bg-midnight-brown/40">
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
                  <div>
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

            <!-- Imagem de Preview e Arquivo de Conteúdo -->
            <div class="bg-tavern-wood/10 rounded-xl ml-8 mb-8 p-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Imagem de apresentação -->
                <div class="space-y-4">
                  <p class="text-sm font-medium text-scroll-beige/80 mb-2">
                    Imagem de apresentação
                  </p>
                  <div class="relative inline-block">
                    <div class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-midnight-brown/90 rounded-lg border border-brass-accent/40 flex items-center justify-center overflow-hidden">
                      <!-- Quando não houver imagem, mostrar input centralizado -->
                      <div *ngIf="!imagemPreview && !midiaPreviewInfo" class="flex flex-col items-center justify-center w-full h-full p-4">
                        <label class="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                          <svg
                            class="w-12 h-12 text-scroll-beige/50 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span class="px-6 py-2 bg-candlelight-gold hover:bg-candlelight-gold/90 text-tavern-wood font-semibold rounded-lg transition-colors">
                            Escolher arquivo
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            (change)="onImagemSelecionada($event)"
                            class="hidden"
                          />
                        </label>
                      </div>
                      <!-- Quando houver imagem, mostrar preview -->
                      <img
                        *ngIf="imagemPreview || midiaPreviewInfo?.url"
                        [src]="imagemPreview || midiaPreviewInfo?.url"
                        alt="Preview da imagem"
                        class="max-w-full max-h-full w-auto h-auto object-contain"
                      />
                    </div>
                    <!-- Botão de remover imagem (só aparece quando há imagem) -->
                    <button
                      *ngIf="imagemPreview || midiaPreviewInfo"
                      type="button"
                      (click)="removerImagem()"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <!-- Nome da imagem (fora da caixa de input) -->
                  <div *ngIf="imagemSelecionada || midiaPreviewInfo" class="mt-2 space-y-1">
                    <div class="text-xs text-scroll-beige/70 break-words">
                      {{ imagemSelecionada?.name || midiaPreviewInfo?.nomeArquivo }}
                    </div>
                    <div class="text-xs text-scroll-beige/50 flex gap-2">
                      <span *ngIf="obterTipoPreview()">{{ obterTipoPreview() }}</span>
                      <span *ngIf="obterTamanhoPreview()">• {{ formatarTamanhoArquivo(obterTamanhoPreview()) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Arquivo de conteúdo do produto -->
                <div class="space-y-4">
                  <p class="text-sm font-medium text-scroll-beige/80 mb-2">
                    Arquivo de conteúdo
                  </p>
                  <div class="relative inline-block">
                    <div
                      class="w-72 h-48 sm:w-[336px] sm:h-56 md:w-96 md:h-64 bg-midnight-brown/90 rounded-lg border border-brass-accent/40 flex items-center justify-center overflow-hidden"
                      [class.border-candlelight-gold]="isDragOverConteudo"
                      [class.border-2]="isDragOverConteudo"
                      (dragover)="onDragOverConteudo($event)"
                      (dragleave)="onDragLeaveConteudo($event)"
                      (drop)="onDropConteudo($event)"
                    >
                      <!-- Quando não houver arquivo, mostrar input centralizado -->
                      <div *ngIf="!arquivoConteudoSelecionado && !midiaConteudoInfo" class="flex flex-col items-center justify-center w-full h-full p-4">
                        <label class="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                          <svg
                            class="w-16 h-16 text-scroll-beige/50 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span class="px-6 py-2 bg-candlelight-gold hover:bg-candlelight-gold/90 text-tavern-wood font-semibold rounded-lg transition-colors mb-2">
                            Escolher arquivo
                          </span>
                          <span class="text-xs text-scroll-beige/60 text-center">ou arraste e solte aqui</span>
                          <input
                            type="file"
                            (change)="onArquivoConteudoSelecionado($event)"
                            class="hidden"
                          />
                        </label>
                      </div>
                      <!-- Quando houver arquivo, mostrar preview -->
                      <div *ngIf="arquivoConteudoSelecionado || midiaConteudoInfo" class="flex flex-col items-center justify-center w-full h-full p-4">
                        <!-- Preview de imagem -->
                        <img
                          *ngIf="(obterTipoConteudo()?.startsWith('image/') && arquivoConteudoPreview) || (midiaConteudoInfo?.mimeType?.startsWith('image/') && midiaConteudoInfo?.url)"
                          [src]="arquivoConteudoPreview || midiaConteudoInfo?.url"
                          alt="Preview do arquivo"
                          class="max-w-full max-h-[70%] w-auto h-auto object-contain mb-2"
                        />
                        <!-- Ícone para outros tipos de arquivo -->
                        <div *ngIf="!(obterTipoConteudo()?.startsWith('image/') && arquivoConteudoPreview) && !(midiaConteudoInfo?.mimeType?.startsWith('image/') && midiaConteudoInfo?.url)" class="flex flex-col items-center justify-center mb-2">
                          <svg
                            class="w-16 h-16 text-scroll-beige/50 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <!-- Botão de remover arquivo (só aparece quando há arquivo) -->
                    <button
                      *ngIf="arquivoConteudoSelecionado || midiaConteudoInfo"
                      type="button"
                      (click)="removerArquivoConteudo()"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <!-- Nome do arquivo (fora da caixa de input) -->
                  <div *ngIf="arquivoConteudoSelecionado || midiaConteudoInfo" class="mt-2 space-y-1">
                    <div class="text-xs text-scroll-beige/70 break-words">
                      {{ arquivoConteudoNome || midiaConteudoInfo?.nomeArquivo }}
                    </div>
                    <div class="text-xs text-scroll-beige/50 flex gap-2">
                      <span *ngIf="obterTipoConteudo()">{{ obterTipoConteudo() }}</span>
                      <span *ngIf="obterTamanhoConteudo()">• {{ formatarTamanhoArquivo(obterTamanhoConteudo()) }}</span>
                    </div>
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
                class="px-8 py-3 bg-candlelight-gold hover:bg-candlelight-gold/90 text-tavern-wood font-semibold rounded-lg  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  midiaPreviewInfo: Midia | null = null;

  // Arquivo de conteúdo do produto
  arquivoConteudoSelecionado: File | null = null;
  arquivoConteudoPreview: string | null = null;
  arquivoConteudoNome: string | null = null;
  arquivoConteudoTipo: string | null = null;
  midiaConteudoInfo: Midia | null = null;
  isDragOverConteudo: boolean = false;

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

    const produtoCompleto = await firstValueFrom(
      this.produtoService.buscarProdutoPorNomeNormalizadoFormulario(nomeNormalizado)
    );
    this.produto = produtoCompleto;
    this.imagemPreview = produtoCompleto.midiaPreview?.url || null;
    this.midiaPreviewInfo = produtoCompleto.midiaPreview || null;
    
    // Carregar informações do arquivo de conteúdo se existir
    if (produtoCompleto.midiaConteudo) {
      this.midiaConteudoInfo = produtoCompleto.midiaConteudo;
      this.arquivoConteudoNome = produtoCompleto.midiaConteudo.nomeArquivo;
      this.arquivoConteudoTipo = produtoCompleto.midiaConteudo.mimeType;
      // Se for imagem, carregar preview
      if (produtoCompleto.midiaConteudo.mimeType?.startsWith('image/')) {
        this.arquivoConteudoPreview = produtoCompleto.midiaConteudo.url;
      }
    }
    
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

      if (this.imagemAlterada && this.produto.midiaPreview?.idMidia) {
        await firstValueFrom(this.produtoService.deleteMidiaProduto(this.produto.midiaPreview.idMidia));
      }

      // Se houver imagem selecionada, fazer upload
      if (this.imagemSelecionada && nomeNormalizado && this.imagemAlterada) {
        try {
          await firstValueFrom(
            this.produtoService.uploadImagemPreviewProduto(
              nomeNormalizado,
              this.imagemSelecionada
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
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(arquivo);

    }
  }

  removerImagem() {
    this.imagemSelecionada = null;
    this.imagemPreview = null;
    this.midiaPreviewInfo = null;
    this.imagemAlterada = true;
  }

  onArquivoConteudoSelecionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const arquivo = input.files[0];
      this.processarArquivoConteudo(arquivo);
    }
  }

  onDragOverConteudo(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverConteudo = true;
  }

  onDragLeaveConteudo(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverConteudo = false;
  }

  onDropConteudo(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverConteudo = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const arquivo = event.dataTransfer.files[0];
      this.processarArquivoConteudo(arquivo);
      this.cdr.detectChanges();
    }
  }

  async processarArquivoConteudo(arquivo: File) {
    this.arquivoConteudoSelecionado = arquivo;
    this.arquivoConteudoNome = arquivo.name;
    this.arquivoConteudoTipo = arquivo.type;

    // Se for uma imagem, criar preview
    if (arquivo.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.arquivoConteudoPreview = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(arquivo);
    } else {
      this.arquivoConteudoPreview = null;
      this.cdr.detectChanges();
    }

    // Fazer upload automaticamente
    await this.fazerUploadArquivoConteudo(arquivo);
  }

  async fazerUploadArquivoConteudo(arquivo: File) {
    try {
      let nomeNormalizado: string | null = null;

      // Se estiver em modo de edição, usar o nomeNormalizado existente
      if (this.isModoEdicao() && this.nomeNormalizadoProduto) {
        nomeNormalizado = this.nomeNormalizadoProduto;
      } else if (this.formularioValido() && this.artesaoAtual) {
        // Se estiver em modo de criação e o formulário estiver válido, salvar o produto primeiro
        const dtoProduto = {
          nome: this.produto.nome,
          descricao: this.produto.descricao || '',
          categoriaCodigo: this.produto.categoriaCodigo,
          valorUnitario: this.produto.gratuito ? 0 : this.produto.valorUnitario || 0,
          promocaoPorcentagem: this.produto.promocaoPorcentagem || 0,
          gratuito: this.produto.gratuito || false,
        };

        const resposta = await firstValueFrom(
          this.produtoService.adicionarProduto(dtoProduto, this.artesaoAtual.dominio)
        );
        nomeNormalizado = resposta?.nomeNormalizado;
        this.nomeNormalizadoProduto = nomeNormalizado;
        this.isModoEdicao.set(true);
      }

      // Fazer upload se tiver nomeNormalizado
      if (nomeNormalizado) {
        await firstValueFrom(
          this.produtoService.uploadImagemConteudoProduto(nomeNormalizado, arquivo)
        );
        console.log('Upload do arquivo de conteúdo realizado com sucesso!');
      } else {
        console.warn('Não foi possível fazer upload: produto ainda não foi salvo ou formulário inválido');
      }
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo de conteúdo:', error);
      alert('Erro ao fazer upload do arquivo de conteúdo. Tente novamente.');
      this.removerArquivoConteudo();
    }
  }

  removerArquivoConteudo() {
    this.arquivoConteudoSelecionado = null;
    this.arquivoConteudoPreview = null;
    this.arquivoConteudoNome = null;
    this.arquivoConteudoTipo = null;
    this.midiaConteudoInfo = null;
    this.cdr.detectChanges();
  }

  formatarTamanhoArquivo(bytes: number | null | undefined): string {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }

  obterTamanhoPreview(): number | null {
    if (this.imagemSelecionada) {
      return this.imagemSelecionada.size;
    }
    if (this.midiaPreviewInfo) {
      return this.midiaPreviewInfo.tamanhoBytes;
    }
    return null;
  }

  obterTipoPreview(): string | null {
    if (this.imagemSelecionada) {
      return this.imagemSelecionada.type;
    }
    if (this.midiaPreviewInfo) {
      return this.midiaPreviewInfo.mimeType;
    }
    return null;
  }

  obterTamanhoConteudo(): number | null {
    if (this.arquivoConteudoSelecionado) {
      return this.arquivoConteudoSelecionado.size;
    }
    if (this.midiaConteudoInfo) {
      return this.midiaConteudoInfo.tamanhoBytes;
    }
    return null;
  }

  obterTipoConteudo(): string | null {
    if (this.arquivoConteudoSelecionado) {
      return this.arquivoConteudoSelecionado.type;
    }
    if (this.midiaConteudoInfo) {
      return this.midiaConteudoInfo.mimeType;
    }
    return this.arquivoConteudoTipo;
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
