import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface CategoriaProdutoResponse {
  codigo: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaProdutoService {
  private readonly API_URL = `${environment.apiBaseUrl}/categorias-produtos`;

  constructor(private http: HttpClient) {}

  buscarCategorias(): Observable<CategoriaProdutoResponse[]> {
    return this.http.get<CategoriaProdutoResponse[]>(this.API_URL);
  }
}

