import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Artesao, CadastroLojaRequest, LojaResponse, LojaMaisVendas } from '../models/artesao.model';
import { PagedResult, Produto } from '../models/produto.model';
import { AuthService } from './auth.service';
import { EditarLojaRequest, MeResponseLoja } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ArtesaoService {
  private lojasCache = signal<LojaResponse[]>([]);
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  /**
   * Lista lojas paginadas do backend
   * @param filtroGeral Termo de busca opcional
   * @param page Número da página (baseado em 0)
   * @param size Tamanho da página
   */
  listarLojas(
    filtroGeral?: string,
    page: number = 0,
    size: number = 10
  ): Observable<PagedResult<LojaResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filtroGeral && filtroGeral.trim()) {
      params = params.set('filtroGeral', filtroGeral.trim());
    }

    return this.http.get<PagedResult<LojaResponse>>('http://localhost:8080/api/v1/client/lojas', {
      params,
    });
  }

  /**
   * Busca uma loja específica pelo domínio
   * @param dominio Domínio da loja
   */
  buscarLojaPorDominio(dominio: string): Observable<LojaResponse> {
    return this.http.get<LojaResponse>(
      `http://localhost:8080/api/v1/client/lojas/${dominio}`
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
    return this.http.post<LojaResponse>('http://localhost:8080/api/v1/client/lojas/register', loja);
  }

  verifyOwner(dominio: string): Observable<boolean> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<boolean>(
          `http://localhost:8080/api/v1/client/lojas/verify-owner/${dominio}`,
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
        return this.http.get<MeResponseLoja>('http://localhost:8080/api/v1/lojas/me', {
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
        return this.http.delete<void>('http://localhost:8080/api/v1/lojas/deletar-loja', {
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
      `http://localhost:8080/api/v1/client/lojas/${dominio}/sobre`
    );
  }

  /**
   * Edita a descrição sobre da loja
   * @param descricaoSobre Nova descrição sobre
   */
  editarLoja(editarLojaRequest: EditarLojaRequest): Observable<void> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.patch<void>(
          'http://localhost:8080/api/v1/lojas/editar-loja',
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
   * Busca lojas com mais vendas
   */
  buscarLojasMaisVendas(): Observable<PagedResult<LojaMaisVendas>> {
    return this.http.get<PagedResult<LojaMaisVendas>>(
      'http://localhost:8080/api/v1/client/lojas/mais-vendas'
    );
  }

  /**
   * Lista todos os produtos da loja.
   * Requer autenticação e que o usuário seja o dono da loja.
   * @param dominio Domínio da loja
   */
  listarTodosProdutosLoja(dominio: string): Observable<Produto[]> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<Produto[]>(
          `http://localhost:8080/api/v1/lojas/${dominio}/todos-produtos`,
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
   * Faz upload de mídia da loja (foto de perfil ou header).
   * Requer autenticação.
   * @param arquivo Arquivo de imagem a ser enviado
   * @param tipoMidia 'PERFIL' (foto da loja) ou 'HEADER' (imagem de capa)
   */
  uploadMidia(arquivo: File, tipoMidia: 'HEADER' | 'PERFIL'): Observable<unknown> {
    const formData = new FormData();
    formData.append('imagem', arquivo);

    const params = new HttpParams().set('tipoMidia', tipoMidia);

    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.post<unknown>(
          'http://localhost:8080/api/v1/lojas/midia',
          formData,
          {
            params,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      })
    );
  }
}
