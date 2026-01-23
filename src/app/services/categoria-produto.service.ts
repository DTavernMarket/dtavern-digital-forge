import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CategoriaProdutoResponse {
  codigo: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaProdutoService {
  private readonly API_URL = 'http://localhost:8080/api/v1/categorias-produtos';

  constructor(private http: HttpClient) {}

  buscarCategorias(): Observable<CategoriaProdutoResponse[]> {
    return this.http.get<CategoriaProdutoResponse[]>(this.API_URL);
  }
}

