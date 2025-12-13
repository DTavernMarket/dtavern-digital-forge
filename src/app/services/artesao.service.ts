import { Injectable, signal, computed, inject } from '@angular/core';
import { Artesao } from '../models/artesao.model';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class ArtesaoService {
  private produtoService = inject(ProdutoService);

  // Dados mockados dos artesãos
  private artesoes = signal<Artesao[]>([
    {
      uuid: '1',
      dominio: 'mestrealdric',
      nome: 'Mestre Aldric',
      biografia: 'Criador de tokens únicos e personagens memoráveis para suas aventuras épicas.',
      avatar: '/assets/images/foto-mestre-aldric.png',
      planoFundo: '/assets/images/bg-mestre-aldric.png',
      especialidades: ['Tokens', 'Personagens', 'Fantasia'],
      avaliacao: 4.9,
      numeroAvaliacoes: 1250,
      numeroProdutos: 15,
      numeroSeguidores: 2340,
      dataEntrada: new Date('2023-06-15'),
      redesSociais: {
        website: 'https://mestrealdric.com',
        twitter: '@mestrealdric',
        discord: 'MestreAldric#1234'
      },
      produtos: []
    },
    {
      uuid: '2',
      dominio: 'cartografa-luna',
      nome: 'Cartógrafa Luna',
      biografia: 'Especialista em mapas detalhados e mundos fantásticos que ganham vida em suas campanhas.',
      avatar: '/assets/images/foto-cartografa-luna.png',
      planoFundo: '/assets/images/bg-cartografa-luna.png',
      especialidades: ['Mapas', 'Mundos', 'Dungeons'],
      avaliacao: 4.8,
      numeroAvaliacoes: 890,
      numeroProdutos: 8,
      numeroSeguidores: 1567,
      dataEntrada: new Date('2023-08-22'),
      redesSociais: {
        website: 'https://cartografaluna.com',
        instagram: '@cartografaluna',
        youtube: 'Cartógrafa Luna'
      },
      produtos: []
    },
    {
      uuid: '3',
      dominio: 'narrador-sabio',
      nome: 'Narrador Sábio',
      biografia: 'Criador de aventuras épicas e histórias que ficarão na memória de seus jogadores.',
      avatar: '/assets/images/foto-narrador-sabio.png',
      planoFundo: '/assets/images/bg-narrador-sabio.png',
      especialidades: ['Aventuras', 'Histórias', 'Narrativa'],
      avaliacao: 5.0,
      numeroAvaliacoes: 567,
      numeroProdutos: 12,
      numeroSeguidores: 890,
      dataEntrada: new Date('2023-05-10'),
      redesSociais: {
        website: 'https://narradorsabio.com',
        twitter: '@narradorsabio',
        discord: 'NarradorSábio#5678'
      },
      produtos: []
    }
  ]);

  // Computed signals para dados derivados
  artesoesEmDestaque = computed(() => this.artesoes().slice(0, 3));

  constructor() {
    this.inicializarProdutosArtesoes();
  }

  private inicializarProdutosArtesoes() {
    const artesoesAtualizados = this.artesoes().map(artesao => ({
      ...artesao,
      produtos: this.produtoService.obterProdutosPorArtesao(artesao.uuid)
    }));
    this.artesoes.set(artesoesAtualizados);
  }

  // Métodos para acessar os artesãos
  obterArtesoes() {
    return this.artesoes;
  }

  obterArtesaoPorUuid(uuid: string) {
    return this.artesoes().find(artesao => artesao.uuid === uuid);
  }

  obterArtesaoPorDominio(dominio: string) {
    return this.artesoes().find(artesao => artesao.dominio === dominio);
  }

  obterArtesoesEmDestaque() {
    return this.artesoesEmDestaque;
  }

  buscarArtesoes(termo: string) {
    return this.artesoes().filter(artesao => 
      artesao.nome.toLowerCase().includes(termo.toLowerCase()) ||
      artesao.biografia.toLowerCase().includes(termo.toLowerCase()) ||
      artesao.especialidades.some(esp => esp.toLowerCase().includes(termo.toLowerCase()))
    );
  }
}
