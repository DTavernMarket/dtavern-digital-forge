import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface ContaUsuario {
  nomeCompleto: string;
  username: string;
  dataNascimento: string;
  dataCriacao: string;
  email: string;
}

export interface ContaAtualizada {
  usuario: ContaUsuario;
  aviso?: string | null;
}

export interface DadosPessoais {
  nomeCompleto: string;
  username: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiBaseUrl}/usuarios`;

  obter(): Observable<ContaUsuario> {
    return this.http.get<ContaUsuario>(`${this.API}/me`);
  }

  atualizar(dados: DadosPessoais): Observable<ContaAtualizada> {
    return this.http.put<ContaAtualizada>(`${this.API}/me`, dados);
  }

  emailDisponivel(email: string): Observable<void> {
    return this.http.post<void>(`${this.API}/email/disponivel`, { email });
  }

  sincronizarEmail(): Observable<ContaUsuario> {
    return this.http.post<ContaUsuario>(`${this.API}/email/sincronizar`, {});
  }

  excluir(): Observable<void> {
    return this.http.delete<void>(`${this.API}/me`);
  }
}
