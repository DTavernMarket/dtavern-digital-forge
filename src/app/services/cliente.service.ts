import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroClienteRequest } from '../models/cliente.model';
import { MeResponseCliente } from '../models/auth.model';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { PagedResult, Produto } from '../models/produto.model';
import { Venda } from '../models/venda.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private authService = inject(AuthService);
    private http = inject(HttpClient);

    criarCliente(cliente: CadastroClienteRequest): Observable<void> {
        return this.http.post<void>('http://localhost:8080/api/v1/client/clientes/register', cliente);
    }

    getBibliotecaCliente(page: number = 0, size: number = 10, termoBusca?: string): Observable<PagedResult<Venda>> {

        let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

        if (termoBusca && termoBusca.trim()) {
            params = params.set('filtroGeral', termoBusca.trim());
        }

        return this.authService.getCurrentToken().pipe(
            switchMap(token => {
                return this.http.get<PagedResult<Venda>>('http://localhost:8080/api/v1/clientes/biblioteca', {
                    params: params,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).pipe(
                    catchError((error) => {
                        console.error('Erro ao buscar biblioteca do cliente:', error);
                        throw error;
                    })
                )
            })
        );
    }

    getMeCliente(): Observable<MeResponseCliente> {
        return this.authService.getCurrentToken().pipe(
            switchMap(token => {
                return this.http.get<MeResponseCliente>('http://localhost:8080/api/v1/clientes/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            })
        );
    }

    /**
     * Envia a foto de perfil do comprador e vincula ao cliente autenticado.
     * Requer autenticação.
     * @param arquivo Arquivo de imagem a ser enviado
     */
    uploadMidia(arquivo: File): Observable<unknown> {
        const formData = new FormData();
        formData.append('imagem', arquivo);

        return this.authService.getCurrentToken().pipe(
            switchMap(token => {
                return this.http.post<unknown>(
                    'http://localhost:8080/api/v1/clientes/midia',
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            })
        );
    }
}