import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { PagedResult, Produto, ProdutoCompleto, ProdutosMaisVendidosDTO } from '../models/produto.model';
import { AuthService } from './auth.service';
import { PagamentoPixResponse } from '../models/pagamento.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private readonly API_BASE = environment.apiBaseUrl;

  comprarProduto(idProduto: string): Observable<PagamentoPixResponse> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.post<PagamentoPixResponse>(
          `${this.API_BASE}/produtos/${idProduto}/comprar`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            responseType: 'json'
          }
        ).pipe(
          catchError((error) => {
            console.error('Erro ao comprar produto:', error);
            throw error;
          })
        );
      })
    );
  }

  /**
   * Verifica se o usuário autenticado é o dono de um produto específico,
   * identificado pelo nome normalizado.
   * @param nomeProdutoNormalizado Nome normalizado (slug) do produto
   */
  verifyOwnerProduto(nomeProdutoNormalizado: string): Observable<boolean> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.get<boolean>(
          `${this.API_BASE}/produtos/verify-product/${nomeProdutoNormalizado}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  adicionarProduto(dtoProduto: any, dominioArtesao: string): Observable<any> {
    return this.http.post<any>(
      `${this.API_BASE}/produtos?dominio=${dominioArtesao}`,
      dtoProduto
    );
  }

  atualizarProduto(nomeProdutoNormalizado: string, dtoProduto: any): Observable<any> {
    return this.http.put<any>(
      `${this.API_BASE}/produtos/${nomeProdutoNormalizado}`,
      dtoProduto
    );
  }

  buscarProdutosPorArtesao(dominioArtesao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `${this.API_BASE}/client/lojas/${dominioArtesao}/produtos`
    );
  }

  buscarProdutos(
    termoBusca?: string,
    page: number = 0,
    size: number = 10
  ): Observable<PagedResult<Produto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (termoBusca && termoBusca.trim()) {
      params = params.set('filtroGeral', termoBusca.trim());
    }

    return this.http.get<PagedResult<Produto>>(`${this.API_BASE}/produtos`, {
      params,
    });
  }

  /**
   * Lista os produtos mais vendidos do DTavern (endpoint público).
   * @param page Página (0-based). Default: 0
   * @param size Tamanho da página. Default: 10
   */
  listarProdutosMaisVendidos(
    page: number = 0,
    size: number = 10
  ): Observable<PagedResult<ProdutosMaisVendidosDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PagedResult<ProdutosMaisVendidosDTO>>(
      `${this.API_BASE}/client/produtos/mais-vendidos`,
      { params }
    );
  }

  /**
   * Busca um produto pelo nome normalizado (slug)
   * @param nomeProdutoNormalizado Nome normalizado do produto
   */
  buscarProdutoPorNomeNormalizado(nomeProdutoNormalizado: string): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.API_BASE}/client/produtos/${nomeProdutoNormalizado}`
    );
  }

  /**
   * Busca um produto pelo nome normalizado (slug) para o formulário de cadastro de produto
   * @param nomeProdutoNormalizado Nome normalizado do produto
   */
  buscarProdutoPorNomeNormalizadoFormulario(nomeProdutoNormalizado: string): Observable<ProdutoCompleto> {
    return this.http.get<ProdutoCompleto>(
      `${this.API_BASE}/produtos/${nomeProdutoNormalizado}/completo`
    );
  }

  /**
   * Faz upload da imagem de preview do produto
   * @param nomeProdutoNormalizado Nome normalizado do produto
   * @param arquivo Arquivo de imagem a ser enviado
   */
  uploadImagemPreviewProduto(
    nomeProdutoNormalizado: string,
    arquivo: File,
  ): Observable<void> {
    const formData = new FormData();
    formData.append('files', arquivo);

    const params = new HttpParams().set('tipo_arquivo', 'preview');

    return this.http.post<void>(
      `${this.API_BASE}/produtos/${nomeProdutoNormalizado}/files`,
      formData,
      { params }
    );
  }

  /**
   * Faz upload da imagem de conteudo do produto
   * @param nomeProdutoNormalizado Nome normalizado do produto
   * @param arquivo Arquivo de imagem a ser enviado
   */
  uploadImagemConteudoProduto(
    nomeProdutoNormalizado: string,
    arquivo: File,
  ): Observable<void> {
    const formData = new FormData();
    formData.append('files', arquivo);

    const params = new HttpParams().set('tipo_arquivo', 'conteudo');

    return this.http.post<void>(
      `${this.API_BASE}/produtos/${nomeProdutoNormalizado}/files`,
      formData,
      { params }
    );
  }

  /**
   * Faz download do arquivo de conteúdo do produto (apenas para dono da loja)
   * @param idProduto ID ou nome normalizado do produto
   */
  downloadMidiaConteudoProdutoDonoLoja(idProduto: string): Observable<Blob> {
    return this.http.get(
      `${this.API_BASE}/produtos/${idProduto}/download-loja`,
      {
        responseType: 'blob'
      }
    );
  }

  /**
   * Faz download do arquivo de conteúdo do produto (apenas para cliente)
   * @param idProduto ID ou nome normalizado do produto
   */
  downloadMidiaConteudoProdutoCliente(idProduto: string): Observable<Blob> {
    return this.http.get(
      `${this.API_BASE}/produtos/${idProduto}/download-cliente`,
      {
        responseType: 'blob'
      }
    );
  }

  /**
   * Deleta um produto pelo nome normalizado
   * @param nomeProdutoNormalizado Nome normalizado do produto
   */
  deletarProduto(nomeProdutoNormalizado: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_BASE}/produtos/${nomeProdutoNormalizado}`
    );
  }

  /**
   * Deleta uma mídia de um produto pelo id da mídia
   * @param idMidia Id da mídia
   */
  deleteMidiaProduto(idMidia: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_BASE}/produtos/files/${idMidia}`
    );
  }
}
