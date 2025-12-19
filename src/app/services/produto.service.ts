import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ArquivoProduto } from '../models/arquivo-produto.model';
import { CategoriaProduto, Produto } from '../models/produto.model';

const produtosMockados: Produto[] = [
  {
    uuid: '1',
    titulo: 'Tokens de Personagens Épicos',
    descricao: '50+ tokens de personagens únicos para suas campanhas',
    valorUnitario: 25.0,
    categoria: CategoriaProduto.TOKENS,
    imagens: [], // Será preenchido quando necessário
    artesaoId: '1',
    nomeArtesao: 'Mestre Aldric',
    avaliacao: 4.9,
    numeroAvaliacoes: 1250,
    numeroDownloads: 1250,
    tamanhoArquivo: '15MB',
    requisitos: 'Qualquer editor de imagem',
    dataCriacao: new Date('2024-01-15'),
    dataAtualizacao: new Date('2024-01-15'),
  },
  {
    uuid: '2',
    titulo: 'Mapas de Masmorras Ancestrais',
    descricao: 'Mapas detalhados com variações de dia/noite',
    valorUnitario: 35.0,
    categoria: CategoriaProduto.MAPAS,
    imagens: [], // Será preenchido quando necessário
    artesaoId: '2',
    nomeArtesao: 'Cartógrafa Luna',
    avaliacao: 4.8,
    numeroAvaliacoes: 890,
    numeroDownloads: 890,
    tamanhoArquivo: '25MB',
    requisitos: 'PDF Reader',
    dataCriacao: new Date('2024-01-10'),
    dataAtualizacao: new Date('2024-01-10'),
  },
  {
    uuid: '3',
    titulo: 'Aventura: O Templo Perdido',
    descricao: 'Aventura completa para personagens nível 5-8',
    valorUnitario: 45.0,
    categoria: CategoriaProduto.AVENTURAS,
    imagens: [], // Será preenchido quando necessário
    artesaoId: '3',
    nomeArtesao: 'Narrador Sábio',
    avaliacao: 5.0,
    numeroAvaliacoes: 567,
    numeroDownloads: 567,
    tamanhoArquivo: '8MB',
    requisitos: 'PDF Reader',
    dataCriacao: new Date('2024-01-05'),
    dataAtualizacao: new Date('2024-01-05'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProdutoService implements OnInit, OnDestroy {
  // Signal dos produtos com ArquivoProduto[]
  private produtos = signal<Produto[]>([]);
  private createdUrls: string[] = []; // pra revogar no destroy
  private platformId = inject(PLATFORM_ID);

  // Computed signals para dados derivados
  produtosEmDestaque = computed(() => this.produtos().slice(0, 3));

  constructor(private http: HttpClient) {
    this.carregarProdutosMockados();
  }

  async ngOnInit(): Promise<void> {}

  private async carregarProdutosMockados() {
    // Criar produtos mockados sem tentar carregar arquivos reais
    // Os arquivos serão carregados quando necessário no frontend

    // Adicionando mock do mestre Aldric

    const [aldric, luna, sabio] = await Promise.all([
      this.baixarComoFile('assets/images/50-tokens.png'),
      this.baixarComoFile('assets/images/masmorras-ancestrais.png'),
      this.baixarComoFile('assets/images/aventura-templo-perdido.png'),
    ]);

    const teste = await this.baixarComoFile('assets/images/50-tokens.png');

    if (aldric) produtosMockados[0].imagens = [aldric];
    if (luna) produtosMockados[1].imagens = [luna];
    if (sabio) produtosMockados[2].imagens = [sabio];

    this.produtos.set(produtosMockados);
  }

  private inferMimeType(nomeArquivo: string): string {
    const ext = nomeArquivo.toLowerCase().split('.').pop();
    switch (ext) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      case 'webp':
        return 'image/webp';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'application/octet-stream';
    }
  }

  private async baixarComoFile(caminho: string): Promise<ArquivoProduto | null> {
    // ✅ Evita rodar no SSR (onde NG02807 acontece)
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const blob = await firstValueFrom(this.http.get(caminho, { responseType: 'blob' }));
      const nome = caminho.split('/').pop() ?? 'arquivo';
      const tipo = blob.type || this.inferMimeType(nome);
      const file = new File([blob], nome, { type: tipo });
      const previewUrl = URL.createObjectURL(file);
      return { file, nome, previewUrl };
    } catch (e) {
      console.warn('Falha ao carregar asset:', caminho, e);
      return null;
    }
  }

  // Métodos para acessar os produtos
  obterProdutos() {
    return this.produtos();
  }

  obterProdutoPorId(id: string): Produto | undefined {
    return this.produtos().find((produto) => produto.uuid === id);
  }

  obterProdutosPorArtesao(artesaoId: string): Produto[] {
    return this.produtos().filter((produto) => produto.artesaoId === artesaoId);
  }

  obterProdutosPorCategoria(categoria: CategoriaProduto): Produto[] {
    return this.produtos().filter((produto) => produto.categoria === categoria);
  }

  buscarProdutos(termo: string): Produto[] {
    const termoLower = termo.toLowerCase();
    return this.produtos().filter(
      (produto) =>
        produto.titulo.toLowerCase().includes(termoLower) ||
        produto.descricao.toLowerCase().includes(termoLower) ||
        produto.nomeArtesao.toLowerCase().includes(termoLower)
    );
  }

  adicionarProduto(produto: Produto): void {
    const produtosAtuais = this.produtos();
    this.produtos.set([...produtosAtuais, produto]);
  }

  adicionarProdutoDTO(dtoProduto: any, dominioArtesao: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/api/v1/produtos?dominio=${dominioArtesao}`,
      dtoProduto
    );
  }

  atualizarProduto(produtoAtualizado: Produto): void {
    const produtosAtuais = this.produtos();
    const indice = produtosAtuais.findIndex((p) => p.uuid === produtoAtualizado.uuid);

    if (indice !== -1) {
      const novosProdutos = [...produtosAtuais];
      novosProdutos[indice] = produtoAtualizado;
      this.produtos.set(novosProdutos);
    }
  }

  removerProduto(id: string): void {
    const produtosAtuais = this.produtos();
    this.produtos.set(produtosAtuais.filter((produto) => produto.uuid !== id));
  }

  ngOnDestroy(): void {
    // evita vazamento de memória dos Object URLs
    for (const url of this.createdUrls) URL.revokeObjectURL(url);
    this.createdUrls = [];
  }

  // A partir daqui, são métodos de comunicação com o backend DE VERDADE. Não são mockados.

  buscarProdutosPorArtesao(dominioArtesao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `http://localhost:8080/api/v1/lojas/${dominioArtesao}/produtos`
    );
  }
}
