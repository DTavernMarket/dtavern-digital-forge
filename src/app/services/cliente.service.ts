import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroClienteRequest } from '../models/cliente.model';
import { MeResponseCliente } from '../models/auth.model';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private authService = inject(AuthService);
    private http = inject(HttpClient);

    criarCliente(cliente: CadastroClienteRequest): Observable<void> {
        return this.http.post<void>('http://localhost:8080/api/v1/client/clientes/register', cliente);
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
}