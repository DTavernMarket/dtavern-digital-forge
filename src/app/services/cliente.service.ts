import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroClienteRequest } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    constructor(private http: HttpClient) { }

    criarCliente(cliente: CadastroClienteRequest): Observable<void> {
        return this.http.post<void>('http://localhost:8080/api/v1/clientes', cliente);
    }
}