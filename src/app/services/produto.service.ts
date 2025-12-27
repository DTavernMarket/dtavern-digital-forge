import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto, PagedResult } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

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

  listarProdutosPorDominio(dominioArtesao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `http://localhost:8080/api/v1/lojas/${dominioArtesao}/produtos`
    );
  }

  buscarProdutosPorArtesao(dominioArtesao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `http://localhost:8080/api/v1/lojas/${dominioArtesao}/produtos`
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
  buscarProdutoPorNomeNormalizado(nomeProdutoNormalizado: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}`
    );
  }

  /**
   * Faz upload da imagem de preview do produto
   * @param nomeProdutoNormalizado Nome normalizado do produto
   * @param arquivo Arquivo de imagem a ser enviado
   * @param tipoArquivo Tipo do arquivo (ex: "preview", "imagem")
   */
  uploadImagemProduto(
    nomeProdutoNormalizado: string,
    arquivo: File,
    tipoArquivo: string = 'preview'
  ): Observable<void> {
    const formData = new FormData();
    formData.append('files', arquivo);

    const params = new HttpParams().set('tipo_arquivo', tipoArquivo);

    return this.http.post<void>(
      `http://localhost:8080/api/v1/produtos/${nomeProdutoNormalizado}/files`,
      formData,
      { params }
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
}
