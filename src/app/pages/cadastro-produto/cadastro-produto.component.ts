import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { SelectCustomizadoComponent, OpcaoSelect } from '../../components/select-customizado/select-customizado.component';
import { InputCustomizadoComponent } from '../../components/input-customizado/input-customizado.component';
import { Produto, CategoriaProduto } from '../../models/produto.model';
import { ArquivoProduto } from '../../models/arquivo-produto.model';
import { ArtesaoService } from '../../services/artesao.service';
import { Artesao } from '../../models/artesao.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraNavegacaoComponent, SelectCustomizadoComponent, InputCustomizadoComponent],
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
                <span class="text-candlelight-gold font-medium">Artesão: {{ artesaoAtual.nome }}</span>
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
                <!-- Título -->
                <div class="md:col-span-2">
                  <app-input-customizado
                    label="Título"
                    placeholder="Digite o título do produto"
                    [required]="true"
                    [(ngModel)]="produto.titulo"
                    name="titulo"
                  />
                </div>

                <!-- Categoria -->
                <div>
                  <app-select-customizado
                    label="Categoria *"
                    [opcoes]="opcoesCategoria"
                    [(ngModel)]="produto.categoria"
                    name="categoria"
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

              <div>
                <app-input-customizado
                  label="Descrição do Produto"
                  type="textarea"
                  placeholder="Descreva seu produto em detalhes..."
                  [rows]="6"
                  [(ngModel)]="produto.descricao"
                  name="descricao"
                />
              </div>
            </div>

            <!-- Imagens -->
            <div class="bg-tavern-wood/10 rounded-xl p-8">
              <h2 class="text-xl font-semibold text-scroll-beige mb-6">Imagens</h2>

              <!-- Área de Drag and Drop -->
              <div
                class="border-2 border-dashed border-brass-accent/40 rounded-lg p-8 text-center transition-colors cursor-pointer"
                [class.border-candlelight-gold]="isDragOver"
                [class.bg-candlelight-gold]="isDragOver"
                (dragover)="onDragOver($event)"
                (dragleave)="onDragLeave($event)"
                (drop)="onDrop($event)"
                (click)="abrirSeletorArquivos()"
              >
                <div class="space-y-4">
                  <div class="text-4xl text-brass-accent">📁</div>
                  <div>
                    <p class="text-scroll-beige font-medium">
                      Arraste suas imagens aqui ou clique para selecionar
                    </p>
                    <p class="text-scroll-beige/60 text-sm mt-1">
                      Máximo 5 arquivos (JPG, PNG, GIF)
                    </p>
                  </div>
                </div>
              </div>

              <!-- Input de arquivo oculto -->
              <input
                #fileInput
                type="file"
                multiple
                accept="image/*"
                (change)="onFileSelected($event)"
                class="hidden"
              />

              <!-- Preview dos arquivos selecionados -->
              <div *ngIf="arquivosSelecionados.length > 0" class="mt-6">
                <h3 class="text-scroll-beige font-medium mb-4">
                  Arquivos selecionados ({{ arquivosSelecionados.length }}/5):
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    *ngFor="let arquivoProduto of arquivosSelecionados; let i = index"
                    class="relative bg-tavern-wood/20 border border-brass-accent/40 rounded-lg p-4"
                  >
                    <button
                      (click)="removerArquivo(i)"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                    <div class="space-y-2">
                      <div
                        class="text-scroll-beige font-medium text-sm truncate"
                        [title]="arquivoProduto.nome"
                      >
                        {{ arquivoProduto.nome }}
                      </div>
                      <div class="text-scroll-beige/60 text-xs">
                        {{ formatarTamanhoArquivo(arquivoProduto.file.size) }}
                      </div>
                      <div
                        class="w-full h-20 bg-tavern-wood/30 rounded border border-brass-accent/20 flex items-center justify-center"
                      >
                        <img
                          *ngIf="arquivoProduto.file.type.startsWith('image/')"
                          [src]="getPreviewUrl(arquivoProduto)"
                          [alt]="arquivoProduto.nome"
                          class="max-w-full max-h-full object-contain rounded"
                        />
                        <span
                          *ngIf="!arquivoProduto.file.type.startsWith('image/')"
                          class="text-scroll-beige/60 text-xs"
                        >
                          Preview não disponível
                        </span>
                      </div>
                    </div>
                  </div>
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

  produto: Partial<Produto> = {
    titulo: '',
    descricao: '',
    categoria: '' as CategoriaProduto,
    imagens: [],
    valorUnitario: 0,
  };

  imagensInput = '';
  arquivosSelecionados: ArquivoProduto[] = [];
  isDragOver = false;
  
  // Artesão atual
  artesaoAtual: Artesao | null = null;

  categorias = Object.values(CategoriaProduto);
  
  // Opções para o select de categoria
  opcoesCategoria: OpcaoSelect[] = this.categorias.map(categoria => ({
    value: categoria,
    label: categoria
  }));

  ngOnInit() {
    this.validarAcessoArtesao();
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
    const artesao = this.artesaoService.obterArtesaoPorDominio(lojaDominio);
    
    if (!artesao) {
      console.warn(`Artesão com domínio '${lojaDominio}' não encontrado`);
      this.redirecionarParaInicio();
      return;
    }

    // Artesão encontrado, definir como atual
    this.artesaoAtual = artesao;
  }

  private redirecionarParaInicio() {
    // Limpar sessionStorage
    sessionStorage.removeItem('lojaDominio');
    
    // Redirecionar para página inicial
    this.router.navigate(['/']);
  }


  formularioValido(): boolean {
    return !!(
      this.produto.titulo &&
      this.produto.categoria &&
      this.produto.valorUnitario &&
      this.produto.valorUnitario > 0
    );
  }

  salvarProduto() {
    if (!this.formularioValido()) {
      return;
    }

    // ✅ CAPTURA DE VALORES COM TWO-WAY DATA BINDING
    // Todos os valores dos componentes customizados já estão disponíveis automaticamente:
    // - this.produto.titulo (do InputCustomizado)
    // - this.produto.categoria (do SelectCustomizado) 
    // - this.produto.valorUnitario (do InputCustomizado)
    // - this.produto.descricao (do InputCustomizado)
    // - this.arquivosSelecionados (do drag and drop)

    // Atualizar produto com dados processados
    this.produto = {
      ...this.produto,
      imagens: this.arquivosSelecionados,
      // Dados do artesão atual
      uuid: this.gerarUUID(),
      artesaoId: this.artesaoAtual?.uuid || '',
      nomeArtesao: this.artesaoAtual?.nome || '',
      avaliacao: 0,
      numeroAvaliacoes: 0,
      numeroDownloads: 0,
      tamanhoArquivo: 'N/A',
      requisitos: 'N/A',
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    };

    // Aqui você salvaria o produto no serviço

    this.produtoService.adicionarProduto(this.produto as Produto);

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
      // Manter o sessionStorage para futuras navegações
    } else {
      // Se não houver domínio salvo, ir para a página inicial
      this.router.navigate(['/']);
    }
  }

  // Métodos para drag and drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.processarArquivos(Array.from(files));
    }
  }

  abrirSeletorArquivos() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processarArquivos(Array.from(input.files));
    }
  }

  private processarArquivos(files: File[]) {
    // Filtrar apenas arquivos de imagem
    const imagens = files.filter((file) => file.type.startsWith('image/'));

    // Verificar limite de 5 arquivos
    const totalArquivos = this.arquivosSelecionados.length + imagens.length;
    if (totalArquivos > 5) {
      alert('Máximo de 5 arquivos permitidos. Alguns arquivos foram ignorados.');
      const arquivosPermitidos = 5 - this.arquivosSelecionados.length;
      imagens.splice(arquivosPermitidos);
    }

    // Converter File[] para ArquivoProduto[] e adicionar
    const arquivosProduto = imagens.map(file => ({ file, nome: file.name, previewUrl: URL.createObjectURL(file) }));
    this.arquivosSelecionados.push(...arquivosProduto);
  }

  removerArquivo(index: number) {
    const arquivoProduto = this.arquivosSelecionados[index];
    
    // Revogar URL do ArquivoProduto
    const url = arquivoProduto.previewUrl;
    URL.revokeObjectURL(url);
    
    this.arquivosSelecionados.splice(index, 1);
  }

  formatarTamanhoArquivo(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getPreviewUrl(arquivoProduto: ArquivoProduto): string {
    return arquivoProduto.previewUrl;
  }


  private gerarUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  ngOnDestroy() {
    // Limpar cache de URLs quando o componente for destruído
    this.arquivosSelecionados.forEach(arquivo => {
      const url = arquivo.previewUrl;
      URL.revokeObjectURL(url);
    });
  }
}
