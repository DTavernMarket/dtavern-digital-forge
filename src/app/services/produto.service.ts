import { Injectable, signal, computed } from '@angular/core';
import { Produto, CategoriaProduto } from '../models/produto.model';
import { ImageUtils } from '../utils/image.utils';
import { ArquivoProduto } from '../models/arquivo-produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Signal dos produtos com ArquivoProduto[]
  private produtos = signal<Produto[]>([]);

  // Computed signals para dados derivados
  produtosEmDestaque = computed(() => this.produtos().slice(0, 3));

  constructor() {
    this.carregarProdutosMockados();
  }

  private async carregarProdutosMockados() {
    // Criar produtos mockados sem tentar carregar arquivos reais
    // Os arquivos serão carregados quando necessário no frontend
    const produtosMockados: Produto[] = [
      {
        uuid: '1',
        titulo: 'Tokens de Personagens Épicos',
        descricao: '50+ tokens de personagens únicos para suas campanhas',
        valorUnitario: 25.00,
        categoria: CategoriaProduto.TOKENS,
        imagens: [], // Será preenchido quando necessário
        artesaoId: '1',
        nomeArtesao: 'mestre-aldric',
        avaliacao: 4.9,
        numeroAvaliacoes: 1250,
        numeroDownloads: 1250,
        tamanhoArquivo: '15MB',
        requisitos: 'Qualquer editor de imagem',
        dataCriacao: new Date('2024-01-15'),
        dataAtualizacao: new Date('2024-01-15')
      },
      {
        uuid: '2',
        titulo: 'Mapas de Masmorras Ancestrais',
        descricao: 'Mapas detalhados com variações de dia/noite',
        valorUnitario: 35.00,
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
        dataAtualizacao: new Date('2024-01-10')
      },
      {
        uuid: '3',
        titulo: 'Aventura: O Templo Perdido',
        descricao: 'Aventura completa para personagens nível 5-8',
        valorUnitario: 45.00,
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
        dataAtualizacao: new Date('2024-01-05')
      }
    ];
    const imagens = await Promise.all([
      ImageUtils.carregarArquivoPorCaminho('/assets/images/50-tokens.png'),
      ImageUtils.carregarArquivoPorCaminho('/assets/images/masmorras-ancestrais.png'),
      ImageUtils.carregarArquivoPorCaminho('/assets/images/aventura-templo-perdido.png')
    ]);
    produtosMockados[0].imagens = [new ArquivoProduto(imagens[0])];
    produtosMockados[1].imagens = [new ArquivoProduto(imagens[1])];
    produtosMockados[2].imagens = [new ArquivoProduto(imagens[2])];
    this.produtos.set(produtosMockados);
  }

  // Métodos para acessar os produtos
  obterProdutos() {
    return this.produtos();
  }

  obterProdutoPorId(id: string): Produto | undefined {
    return this.produtos().find(produto => produto.uuid === id);
  }

  obterProdutosPorArtesao(artesaoId: string): Produto[] {
    return this.produtos().filter(produto => produto.artesaoId === artesaoId);
  }

  obterProdutosPorCategoria(categoria: CategoriaProduto): Produto[] {
    return this.produtos().filter(produto => produto.categoria === categoria);
  }

  buscarProdutos(termo: string): Produto[] {
    const termoLower = termo.toLowerCase();
    return this.produtos().filter(produto => 
      produto.titulo.toLowerCase().includes(termoLower) ||
      produto.descricao.toLowerCase().includes(termoLower) ||
      produto.nomeArtesao.toLowerCase().includes(termoLower)
    );
  }

  adicionarProduto(produto: Produto): void {
    const produtosAtuais = this.produtos();
    this.produtos.set([...produtosAtuais, produto]);
  }

  atualizarProduto(produtoAtualizado: Produto): void {
    const produtosAtuais = this.produtos();
    const indice = produtosAtuais.findIndex(p => p.uuid === produtoAtualizado.uuid);
    
    if (indice !== -1) {
      const novosProdutos = [...produtosAtuais];
      novosProdutos[indice] = produtoAtualizado;
      this.produtos.set(novosProdutos);
    }
  }

  removerProduto(id: string): void {
    const produtosAtuais = this.produtos();
    this.produtos.set(produtosAtuais.filter(produto => produto.uuid !== id));
  }
}