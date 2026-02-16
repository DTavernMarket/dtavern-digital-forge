import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { PagedResult, Produto, ProdutoCompleto } from '../models/produto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  comprarProduto(idProduto: string): Observable<void> {
    return this.authService.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.post<void>(
          `http://localhost:8080/api/v1/produtos/${idProduto}/comprar`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
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

  adicionarProduto(dtoProduto: any, dominioArtesao: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/api/v1/produtos?dominio=${dominioArtesao}`,
      dtoProduto
    );
  }

  atualizarProduto(nomeProdutoNormalizado: string, dtoProduto: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}`,
      dtoProduto
    );
  }

  buscarProdutosPorArtesao(dominioArtesao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `http://localhost:8080/api/v1/client/lojas/${dominioArtesao}/produtos`
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

    return this.http.get<PagedResult<Produto>>('http://localhost:8080/api/v1/produtos', {
      params,
    });
  }

  /**
   * Busca um produto pelo nome normalizado (slug)
   * @param nomeProdutoNormalizado Nome normalizado do produto
   */
  buscarProdutoPorNomeNormalizado(nomeProdutoNormalizado: string): Observable<Produto> {
    return this.http.get<Produto>(
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}`
    );
  }

  /**
   * Busca um produto pelo nome normalizado (slug) para o formulário de cadastro de produto
   * @param nomeProdutoNormalizado Nome normalizado do produto
   */
  buscarProdutoPorNomeNormalizadoFormulario(nomeProdutoNormalizado: string): Observable<ProdutoCompleto> {
    return this.http.get<ProdutoCompleto>(
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}/completo`
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
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}/files`,
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
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}/files`,
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
      `http://localhost:8080/api/v1/produtos/${idProduto}/download-loja`,
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
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}`
    );
  }

  /**
   * Deleta uma mídia de um produto pelo id da mídia
   * @param idMidia Id da mídia
   */
  deleteMidiaProduto(idMidia: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/api/v1/produtos/files/${idMidia}`
    );
  }
}
