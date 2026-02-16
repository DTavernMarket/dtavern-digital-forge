import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { CadastroClienteRequest } from '../models/cliente.model';
import { MeResponseCliente } from '../models/auth.model';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { auth } from '../config/firebase.config';
import { sendEmailVerification } from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private authService = inject(AuthService);
    private http = inject(HttpClient);

    criarCliente(cliente: CadastroClienteRequest): Observable<void> {
        return this.http.post<void>('http://localhost:8080/api/v1/client/clientes/register', cliente).pipe(
            switchMap(() => {
                const currentUser = auth.currentUser;

                // Se por algum motivo não houver usuário autenticado no Firebase,
                // apenas completa sem tentar enviar e-mail
                if (!currentUser) {
                    console.warn('Nenhum usuário Firebase autenticado para enviar verificação de e-mail (cliente).');
                    return of(void 0);
                }

                return from(sendEmailVerification(currentUser)).pipe(
                    // Mesmo que o envio do e-mail falhe, não quebrar o fluxo da criação
                    // (o erro será apenas logado no console)
                    switchMap(() => of(void 0))
                );
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
}