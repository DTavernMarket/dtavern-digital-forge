import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Artesao, CadastroLojaRequest, LojaResponse } from '../models/artesao.model';
import { PagedResult, ProdutoCompleto } from '../models/produto.model';
import { AuthService } from './auth.service';
import { EditarLojaRequest, MeResponseLoja } from '../models/auth.model';
import { environment } from '../../environment/environment';
import { marcarIntencaoCriarLoja } from '../models/intencao-criar-loja';
import { StatusPagamento, Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class ArtesaoService {
  private lojasCache = signal<LojaResponse[]>([]);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_BASE = environment.apiBaseUrl;

  /**
   * Busca uma loja específica pelo domínio
   * @param dominio Domínio da loja
   */
  buscarLojaPorDominio(dominio: string): Observable<LojaResponse> {
    return this.http.get<LojaResponse>(
      `${this.API_BASE}/client/lojas/${dominio}`
    );
  }

  /**
   * Converte LojaResponse para Artesao (para compatibilidade)
   */
  private converterLojaParaArtesao(loja: LojaResponse): Artesao {
    return {
      dominio: loja.dominio,
      nome: loja.nome,
      resumo: loja.resumo,
      descricao: loja.descricao,
      caminhoImagemPerfil: loja.caminhoImagemPerfil,
      caminhoImagemHeader: loja.caminhoImagemHeader,
      especialidades: loja.especialidades,
      quantidadeProdutos: loja.quantidadeProdutos,
    };
  }

  /**
   * Busca artesão por domínio (método de compatibilidade)
   * @deprecated Use buscarLojaPorDominio() e converterLojaParaArtesao() se necessário
   */
  obterArtesaoPorDominio(dominio: string): Artesao | undefined {
    // Tenta buscar no cache primeiro
    const lojaCache = this.lojasCache().find(l => l.dominio === dominio);
    if (lojaCache) {
      return this.converterLojaParaArtesao(lojaCache);
    }
    return undefined;
  }

  /**
   * Retorna artesões em destaque (primeiras 3 lojas)
   * @deprecated Use listarLojas() diretamente
   */
  obterArtesoesEmDestaque() {
    return computed(() => {
      const lojas = this.lojasCache();
      return lojas.slice(0, 3).map(loja => this.converterLojaParaArtesao(loja));
    });
  }

  /**
   * Busca artesões localmente (método de compatibilidade)
   * @deprecated Use listarLojas() com filtroGeral
   */
  buscarArtesoes(termo: string): Artesao[] {
    return this.lojasCache()
      .filter(loja =>
        loja.nome.toLowerCase().includes(termo.toLowerCase()) ||
        loja.descricao.toLowerCase().includes(termo.toLowerCase())
      )
      .map(loja => this.converterLojaParaArtesao(loja));
  }

  /**
   * Retorna todas as lojas em cache (método de compatibilidade)
   * @deprecated Use listarLojas() diretamente
   */
  obterArtesoes() {
    return computed(() => {
      return this.lojasCache().map(loja => this.converterLojaParaArtesao(loja));
    });
  }

  criarLoja(loja: CadastroLojaRequest): Observable<LojaResponse> {
    return this.http.post<LojaResponse>(`${this.API_BASE}/client/lojas/register`, loja);
  }

  criarLojaDaConta(loja: { nome: string; dominio: string; descricao: string | null }): Observable<MeResponseLoja> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => this.http.post<MeResponseLoja>(`${this.API_BASE}/lojas`, loja, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  consultarDominio(dominio: string): Observable<{ disponivel: boolean }> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => this.http.get<{ disponivel: boolean }>(`${this.API_BASE}/lojas/dominio/disponivel`, {
        headers: { Authorization: `Bearer ${token}` },
        params: new HttpParams().set('dominio', dominio)
      }))
    );
  }

  abrirFluxoCriarLoja() {
    if (!this.authService.getCurrentUser()) {
      marcarIntencaoCriarLoja();
      this.router.navigate(['/cadastro'], { queryParams: { cadastro: 'artesao' } });
      return;
    }
    this.getMeLoja().pipe(take(1)).subscribe({
      next: () => this.router.navigate(['/conta/loja']),
      error: () => this.router.navigate(['/criar-loja'])
    });
  }

  verifyOwner(dominio: string): Observable<boolean> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<boolean>(
          `${this.API_BASE}/client/lojas/verify-owner/${dominio}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  getMeLoja(): Observable<MeResponseLoja> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<MeResponseLoja>(`${this.API_BASE}/lojas/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }

  deletarLoja(): Observable<void> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.delete<void>(`${this.API_BASE}/lojas/deletar-loja`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }

  /**
   * Busca informações da aba "sobre" de uma loja
   * @param dominio Domínio da loja
   */
  buscarSobreLoja(dominio: string): Observable<{ descricaoSobre: string }> {
    return this.http.get<{ descricaoSobre: string }>(
      `${this.API_BASE}/client/lojas/${dominio}/sobre`
    );
  }

  /**
   * Edita a descrição sobre da loja
   * @param descricaoSobre Nova descrição sobre
   */
  atualizarDadosLoja(loja: { nome: string; dominio: string; descricao: string | null }): Observable<MeResponseLoja> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => this.http.patch<MeResponseLoja>(`${this.API_BASE}/lojas/editar-loja`, loja, {
        headers: { Authorization: `Bearer ${token}` }
      }))
    );
  }

  editarLoja(editarLojaRequest: EditarLojaRequest): Observable<void> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.patch<void>(
          `${this.API_BASE}/lojas/editar-loja`,
          editarLojaRequest,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  /**
   * Lista todos os produtos da loja.
   * Requer autenticação e que o usuário seja o dono da loja.
   * @param dominio Domínio da loja
   */
  listarTodosProdutosLoja(dominio: string): Observable<ProdutoCompleto[]> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<ProdutoCompleto[]>(
          `${this.API_BASE}/lojas/${dominio}/todos-produtos`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  listarVendasDaLoja(
    page: number = 0,
    size: number = 10,
    termoBusca?: string,
    statusPagamento?: StatusPagamento | ''
  ): Observable<PagedResult<Venda>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (termoBusca && termoBusca.trim()) {
      params = params.set('filtroGeral', termoBusca.trim());
    }

    if (statusPagamento) {
      params = params.set('statusPagamento', statusPagamento);
    }

    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<PagedResult<Venda>>(`${this.API_BASE}/lojas/vendas`, {
          params,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }
}
