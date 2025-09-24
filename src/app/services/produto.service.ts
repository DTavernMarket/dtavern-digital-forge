import { Injectable, signal, computed } from '@angular/core';
import { Produto, CategoriaProduto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Dados mockados dos produtos
  private produtos = signal<Produto[]>([
    {
      uuid: '1',
      titulo: 'Tokens de Personagens Épicos',
      descricao: '50+ tokens de personagens únicos para suas campanhas',
      valorUnitario: 25.00,
      categoria: CategoriaProduto.TOKENS,
      tags: ['tokens', 'personagens', 'fantasia'],
      imagens: ['/assets/images/50-tokens.png'],
      artesaoId: '1',
      nomeArtesao: 'Mestre Aldric',
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
      tags: ['mapas', 'masmorras', 'dungeon'],
      imagens: ['/assets/images/masmorras-ancestrais.png'],
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
      tags: ['aventura', 'templo', 'fantasia'],
      imagens: ['/assets/images/aventura-templo-perdido.png'],
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
  ]);

  // Computed signals para dados derivados
  produtosEmDestaque = computed(() => this.produtos().slice(0, 3));

  // Métodos para acessar os produtos
  obterProdutos() {
    return this.produtos;
  }

  obterProdutoPorUuid(uuid: string) {
    return this.produtos().find(produto => produto.uuid === uuid);
  }

  obterProdutosEmDestaque() {
    return this.produtosEmDestaque;
  }

  buscarProdutos(termo: string) {
    return this.produtos().filter(produto => 
      produto.titulo.toLowerCase().includes(termo.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(termo.toLowerCase()) ||
      produto.tags.some(tag => tag.toLowerCase().includes(termo.toLowerCase()))
    );
  }

  obterProdutosPorCategoria(categoria: CategoriaProduto) {
    return this.produtos().filter(produto => produto.categoria === categoria);
  }

  obterProdutosPorArtesao(artesaoId: string) {
    return this.produtos().filter(produto => produto.artesaoId === artesaoId);
  }
}
