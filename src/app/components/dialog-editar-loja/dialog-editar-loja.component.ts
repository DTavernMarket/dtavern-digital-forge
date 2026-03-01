import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, input, OnInit, OnDestroy, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditarLojaRequest } from '../../models/auth.model';
import { Artesao } from '../../models/artesao.model';
import { ArtesaoService } from '../../services/artesao.service';
import { CategoriaProdutoService, CategoriaProdutoResponse } from '../../services/categoria-produto.service';
import { DialogConfirmacaoComponent } from '../dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-dialog-editar-loja',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogConfirmacaoComponent],
  template: `
    <input
      #inputFotoPerfil
      type="file"
      accept="image/*"
      class="hidden"
      (change)="onFotoPerfilSelecionada($event)"
    />
    <input
      #inputHeader
      type="file"
      accept="image/*"
      class="hidden"
      (change)="onHeaderSelecionado($event)"
    />
    @if (uploadMidiaMensagem()) {
      <div
        class="fixed top-24 left-1/2 -translate-x-1/2 z-[210] px-4 py-3 rounded-lg shadow-xl border border-brass-accent/40 max-w-sm text-center text-sm bg-midnight-brown/95"
        [class.text-green-400]="uploadMidiaMensagem()?.startsWith('Upload concluído')"
        [class.text-red-400]="uploadMidiaMensagem() && !uploadMidiaMensagem()?.startsWith('Upload concluído')"
      >
        {{ uploadMidiaMensagem() }}
      </div>
    }
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4" (click)="tentarFechar()">
      <div class="relative bg-midnight-brown border border-brass-accent/40 rounded-xl overflow-hidden shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col" (click)="$event.stopPropagation()">
        <!-- Botão fechar -->
        <button
          type="button"
          (click)="tentarFechar()"
          class="absolute top-4 right-4 z-10 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <!-- Topo: Header + Foto de perfil (igual à tela principal) -->
        <div class="relative h-28 flex-shrink-0">
          <!-- Header com overlay de câmera no hover -->
          <div class="group/header absolute inset-0 cursor-pointer" (click)="abrirSeletorHeader()">
            <div
              class="absolute inset-0 bg-cover bg-center bg-no-repeat"
              [style.background-image]="'url(' + (urlPreviewHeader() || urlImagemHeader()) + ')'"
            >
              <div class="absolute inset-0 bg-black/50"></div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/header:opacity-100 transition-opacity duration-200 bg-black/40 rounded-t-xl">
              <div class="w-14 h-14 rounded-full bg-black/70 flex items-center justify-center">
                <img src="assets/images/icon-maquina-fotografica.png" alt="Mudar imagem" class="w-14 h-14 object-contain" />
              </div>
            </div>
          </div>
          <!-- Foto de perfil com overlay de câmera no hover -->
          <div class="absolute bottom-0 left-4 transform translate-y-1/2 flex items-end group/perfil" (click)="abrirSeletorFotoPerfil()">
            <div class="relative rounded-full border-4 border-candlelight-gold shadow-xl overflow-hidden cursor-pointer">
              <img
                [src]="urlPreviewPerfil() || urlImagemPerfil()"
                [alt]="artesao()?.nome"
                class="w-24 h-24 object-cover bg-midnight-brown block"
              />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/perfil:opacity-100 transition-opacity duration-200 bg-black/50 rounded-full">
                <div class="w-14 h-14 rounded-full bg-black/70 flex items-center justify-center">
                  <img src="assets/images/icon-maquina-fotografica.png" alt="Mudar foto de perfil" class="w-14 h-14 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Nome da loja (fixo, abaixo da foto de perfil; mesma variável do campo editável) -->
        <div class="flex-shrink-0 px-6 pt-14 pb-2">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige">{{ nomeEditado() }}</h2>
        </div>
        <!-- Conteúdo rolável: Nome, Especialidades, Resumo, Descrição e botões -->
        <div class="flex-1 min-h-0 overflow-y-auto px-6 pb-6 space-y-5">
          <div>
            <label class="block text-sm font-medium text-scroll-beige/80 mb-2">Nome da loja</label>
            <input
              type="text"
              [ngModel]="nomeEditado()"
              (ngModelChange)="nomeEditado.set($event)"
              class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige text-sm placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              placeholder="Nome da loja"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-scroll-beige/80 mb-2">Domínio da loja</label>
            <input
              type="text"
              (keydown)="bloquearCaracterEspecial($event)"
              [ngModel]="dominioEditado()"
              (ngModelChange)="atualizarDominio($event)"
              class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige text-sm placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              placeholder="seu-dominio"
            />
            <p class="mt-2 text-xs text-scroll-beige/70">
              A URL da sua loja ficará assim: <span class="text-candlelight-gold/90 font-medium">dtavern.com.br/lojas/{{ dominioEditado() || '...' }}</span>
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-scroll-beige/80 mb-2">Especialidades</label>
            <div class="flex flex-wrap gap-2 mb-2">

              @for (esp of especialidadesSelecionadas(); track esp.codigo) {
                <span
                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-tavern-wood/30 border border-brass-accent/40 text-scroll-beige text-sm"
                >
                  {{ esp.nome }}
                  <button
                    type="button"
                    (click)="removerEspecialidade(esp)"
                    class="p-0.5 rounded hover:bg-white/10 text-scroll-beige/80 hover:text-scroll-beige transition-colors"
                    aria-label="Remover especialidade"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </span>
              }
            </div>
            <select
              class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold text-sm"
              [value]="''"
              (change)="adicionarEspecialidade($event)"
            >
              <option class="bg-midnight-brown text-scroll-beige">Selecione uma especialidade</option>
              @for (cat of categoriasParaSelecionar(); track cat.codigo) {
                <option class="bg-midnight-brown text-scroll-beige" [value]="cat.codigo">{{ cat.nome }}</option>
              }
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-scroll-beige/80 mb-2">Resumo da loja</label>
            <textarea
              [ngModel]="resumoEditado()"
              (ngModelChange)="resumoEditado.set($event)"
              rows="3"
              class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige/90 text-sm placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold resize-y min-h-[80px]"
              placeholder="Nenhuma resumo informado."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-scroll-beige/80 mb-2">Descrição da loja</label>
            <textarea
              [ngModel]="descricaoEditada()"
              (ngModelChange)="descricaoEditada.set($event)"
              rows="5"
              class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige text-sm whitespace-pre-line placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold resize-y min-h-[120px]"
              placeholder="Nenhuma descrição informada."
            ></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              (click)="tentarFechar()"
              class="px-6 py-2 bg-tavern-wood/30 border border-brass-accent/40 text-scroll-beige font-semibold rounded-lg hover:bg-tavern-wood/40 transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              (click)="salvarLoja()"
              [disabled]="uploadMidiaLoading()"
              class="px-6 py-2 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ uploadMidiaLoading() ? 'Enviando...' : 'Salvar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <app-dialog-confirmacao
      [mostrar]="mostrarDialogConfirmarFechar()"
      titulo="Descartar alterações?"
      texto="Você alterou informações da loja. Deseja realmente fechar e perder as alterações não salvas?"
      [zIndex]="250"
      (resposta)="onRespostaConfirmarFechar($event)"
      (fecharDialog)="mostrarDialogConfirmarFechar.set(false)"
    />
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DialogEditarLojaComponent implements OnInit, OnDestroy {
  @ViewChild('inputFotoPerfil') inputFotoPerfil!: ElementRef<HTMLInputElement>;
  @ViewChild('inputHeader') inputHeader!: ElementRef<HTMLInputElement>;

  private artesaoService = inject(ArtesaoService);
  private categoriaProdutoService = inject(CategoriaProdutoService);

  /** Dados do artesão/loja exibidos no formulário e nas imagens. */
  artesao = input<Artesao | undefined>(undefined);

  categoriasDisponiveis = signal<CategoriaProdutoResponse[]>([]);
  especialidadesSelecionadas = signal<CategoriaProdutoResponse[]>([]);
  private especialidadesInicializadas = false;

  nomeEditado = signal('');
  dominioEditado = signal('');
  resumoEditado = signal('');
  descricaoEditada = signal('');
  private dadosInicializados = false;

  mostrarDialogConfirmarFechar = signal(false);

  /** Categorias que ainda não foram adicionadas às especialidades (para o dropdown). */
  categoriasParaSelecionar = computed(() => {
    const disponiveis = this.categoriasDisponiveis();
    const selecionadas = this.especialidadesSelecionadas();
    return disponiveis.filter(
      (c) => !selecionadas.some((s) => s.codigo === c.codigo)
    );
  });

  constructor() {
    effect(() => {
      if (!this.dadosInicializados && this.artesao()) {
        this.dadosInicializados = true;
        this.especialidadesInicializadas = true;
        const list = this.artesao()?.especialidades?.length
          ? this.artesao()?.especialidades?.map((especialidade) => ({ codigo: especialidade.codigo, nome: especialidade.nome }))
          : [];
        this.especialidadesSelecionadas.set(list ?? []);
        this.nomeEditado.set(this.artesao()?.nome ?? '');
        this.dominioEditado.set(this.artesao()?.dominio ?? '');
        this.resumoEditado.set(this.artesao()?.resumo ?? '');
        this.descricaoEditada.set(this.artesao()?.descricao ?? '');
      }
    });
  }

  /** Emitido quando o usuário solicita fechar o dialog (overlay, X ou botão Fechar). */
  fechar = output<void>();

  /** Arquivo selecionado para nova foto de perfil (upload ao clicar em Salvar). */
  arquivoFotoPerfil = signal<File | null>(null);
  /** Arquivo selecionado para novo header (upload ao clicar em Salvar). */
  arquivoHeader = signal<File | null>(null);

  /** URL de preview da foto de perfil selecionada (blob URL); revogada no destroy. */
  urlPreviewPerfil = signal<string | null>(null);
  /** URL de preview do header selecionado (blob URL); revogada no destroy. */
  urlPreviewHeader = signal<string | null>(null);

  uploadMidiaLoading = signal(false);
  uploadMidiaMensagem = signal<string | null>(null);

  private readonly CDN_BASE = 'http://localhost:8080';
  private readonly IMAGEM_PADRAO = this.CDN_BASE + '/cdn/default.png';

  urlImagemPerfil = computed(() =>
    this.resolverUrlImagem(this.artesao()?.caminhoImagemPerfil)
  );
  urlImagemHeader = computed(() =>
    this.resolverUrlImagem(this.artesao()?.caminhoImagemHeader)
  );

  private resolverUrlImagem(caminho: string | undefined): string {
    if (!caminho?.trim()) return this.IMAGEM_PADRAO;
    if (caminho.startsWith('http://') || caminho.startsWith('https://')) return caminho;
    return caminho.startsWith('/') ? this.CDN_BASE + caminho : this.CDN_BASE + '/' + caminho;
  }

  ngOnInit(): void {
    this.categoriaProdutoService.buscarCategorias().subscribe({
      next: (categorias) => this.categoriasDisponiveis.set(categorias),
      error: () => this.categoriasDisponiveis.set([]),
    });
  }

  adicionarEspecialidade(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const codigo = select.value;
    if (!codigo) return;
    const cat = this.categoriasDisponiveis().find((c) => c.codigo === codigo);
    if (cat && !this.especialidadesSelecionadas().some((s) => s.codigo === cat.codigo)) {
      this.especialidadesSelecionadas.update((list) => [...list, cat]);
    }
    select.value = '';
  }

  removerEspecialidade(esp: CategoriaProdutoResponse): void {
    this.especialidadesSelecionadas.update((list) =>
      list.filter((e) => e.codigo !== esp.codigo)
    );
  }

  /** Atualiza o domínio permitindo apenas letras, números e "-"; espaços viram "-". */
  atualizarDominio(valor: string): void {
    const comHifens = valor.replace(/\s/g, '-');
    const sanitizado = comHifens.replace(/[^a-zA-Z0-9-]/g, '');
    this.dominioEditado.set(sanitizado);
  }

  bloquearCaracterEspecial(event: KeyboardEvent) {
    const tecla = event.key;

    // Permitir teclas de controle
    const teclasPermitidas = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ];

    if (teclasPermitidas.includes(tecla)) {
      return;
    }

    // Permitir letras, números, hífen e espaço
    const regex = /^[a-z0-9\- ]$/;

    if (!regex.test(tecla)) {
      event.preventDefault();
    }
  }

  private temAlteracoesNaoSalvas(): boolean {
    const nomeOriginal = this.artesao()?.nome ?? '';
    const dominioOriginal = this.artesao()?.dominio ?? '';
    if (this.nomeEditado() !== nomeOriginal) return true;
    if (this.dominioEditado() !== dominioOriginal) return true;
    if (this.resumoEditado() !== (this.artesao()?.resumo ?? '')) return true;
    if (this.descricaoEditada() !== (this.artesao()?.descricao ?? '')) return true;
    const espOriginal = (this.artesao()?.especialidades ?? []).map((especialidade) => especialidade.codigo).sort().join(',');
    const espAtual = this.especialidadesSelecionadas()
      .map((especialidade) => especialidade.codigo)
      .sort()
      .join(',');
    if (espOriginal !== espAtual) return true;
    if (this.arquivoFotoPerfil()) return true;
    if (this.arquivoHeader()) return true;
    return false;
  }

  tentarFechar(): void {
    if (this.temAlteracoesNaoSalvas()) {
      this.mostrarDialogConfirmarFechar.set(true);
    } else {
      this.fechar.emit();
    }
  }

  onRespostaConfirmarFechar(confirmou: boolean): void {
    this.mostrarDialogConfirmarFechar.set(false);
    if (confirmou) {
      this.fechar.emit();
    }
  }

  abrirSeletorFotoPerfil(): void {
    this.inputFotoPerfil?.nativeElement?.click();
  }

  abrirSeletorHeader(): void {
    this.inputHeader?.nativeElement?.click();
  }

  onFotoPerfilSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const urlAntiga = this.urlPreviewPerfil();
      if (urlAntiga) URL.revokeObjectURL(urlAntiga);
      this.arquivoFotoPerfil.set(file);
      this.urlPreviewPerfil.set(URL.createObjectURL(file));
    }
    input.value = '';
  }

  onHeaderSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const urlAntiga = this.urlPreviewHeader();
      if (urlAntiga) URL.revokeObjectURL(urlAntiga);
      this.arquivoHeader.set(file);
      this.urlPreviewHeader.set(URL.createObjectURL(file));
    }
    input.value = '';
  }

  ngOnDestroy(): void {
    const u1 = this.urlPreviewPerfil();
    if (u1) URL.revokeObjectURL(u1);
    const u2 = this.urlPreviewHeader();
    if (u2) URL.revokeObjectURL(u2);
  }

  salvarLoja(): void {
    const perfil = this.arquivoFotoPerfil();
    const header = this.arquivoHeader();

    this.uploadMidiaLoading.set(true);
    this.uploadMidiaMensagem.set(null);

    const request: EditarLojaRequest = {
      nome: this.nomeEditado(),
      dominio: this.dominioEditado(),
      resumo: this.resumoEditado(),
      descricao: this.descricaoEditada(),
      especialidades: this.especialidadesSelecionadas().map((e) => e.codigo),
    };

    this.artesaoService.editarLoja(request).subscribe({
      next: () => {
        if (perfil || header) {
          this.alterarFotos(perfil, header);
        } else {
          this.uploadMidiaLoading.set(false);
          this.uploadMidiaMensagem.set('Alterações salvas! Atualize a página para ver.');
          setTimeout(() => {
            this.uploadMidiaMensagem.set(null);
            window.location.reload();
          }, 1500);
        }
      },
      error: (err) => {
        this.uploadMidiaLoading.set(false);
        this.uploadMidiaMensagem.set(
          err?.error?.mensagem || err?.error?.message || 'Erro ao salvar. Tente novamente.'
        );
        setTimeout(() => this.uploadMidiaMensagem.set(null), 5000);
      },
    });
  }

  private alterarFotos(perfil: File | null, header: File | null): void {
    const fazerUpload = (arquivo: File, tipo: 'HEADER' | 'PERFIL'): void => {
      this.artesaoService.uploadMidia(arquivo, tipo).subscribe({
        next: () => {
          if (tipo === 'PERFIL' && header) {
            fazerUpload(header, 'HEADER');
            return;
          }
          this.uploadMidiaLoading.set(false);
          this.uploadMidiaMensagem.set('Upload concluído! Atualize a página para ver a alteração.');
          setTimeout(() => {
            this.uploadMidiaMensagem.set(null);
            window.location.reload();
          }, 1500);
        },
        error: (err) => {
          this.uploadMidiaLoading.set(false);
          this.uploadMidiaMensagem.set(err?.error?.mensagem || err?.error?.message || 'Erro ao enviar imagem. Tente novamente.');
          setTimeout(() => this.uploadMidiaMensagem.set(null), 5000);
        },
      });
    };

    if (perfil) {
      fazerUpload(perfil, 'PERFIL');
    } else if (header) {
      fazerUpload(header, 'HEADER');
    }
  }
}
