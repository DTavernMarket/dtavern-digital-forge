// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { auth } from '../config/firebase.config';
import { AuthResponse, LoginRequest, MeResponse, User } from '../models/auth.model';
import { CadastroLojaRequest } from '../models/artesao.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/v1/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private idTokenSubject = new BehaviorSubject<string | null>(null);
  idToken$ = this.idTokenSubject.asObservable();

  private initialized = false;

  constructor() {
    this.initAuthListener();
  }

  private initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        this.currentUserSubject.next(user);
        this.idTokenSubject.next(token);
      } else {
        this.currentUserSubject.next(null);
        this.idTokenSubject.next(null);
      }

      this.initialized = true;
    });
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Login com email e senha
   */
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      tap(async (cred) => {
        const token = await cred.user.getIdToken();
        this.idTokenSubject.next(token);
        this.currentUserSubject.next(cred.user);
      }),
      switchMap(cred => of(cred.user))
    );
  }

  logout(): Observable<void> {
    return from(signOut(auth)).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.idTokenSubject.next(null);
      })
    );
  }

  /**
   * Registrar novo usuário
   */
  registerComprador(displayName: string, email: string, password: string): Observable<AuthResponse> {
    const request: CadastroLojaRequest = { nomeLoja: displayName, email, password };
    return this.http.post<AuthResponse>(`http://localhost:8080/api/v1/client/compradores/register`, request);
  }

  /**
   * Verificar token no backend
   */
  verifyToken(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/verify`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }

  getMe() {
    return this.http.get<MeResponse>('http://localhost:8080/api/v1/auth/me');
  }


  getCurrentUser(): Observable<User> {
    return this.currentUser$.pipe(
      filter(user => user !== null)
    );
  }

  getCurrentToken(): Observable<string> {
    return this.idToken$.pipe(
      filter(token => token !== null)
    );
  }

  /**
   * Decodifica o token JWT e retorna os claims
   */
  getTokenClaims(): Observable<any> {
    return this.idToken$.pipe(
      filter(token => token !== null),
      map(token => {
        if (!token) return null;
        try {
          // Decodificar o payload do JWT (sem verificar assinatura)
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          return null;
        }
      })
    );
  }

  /**
   * Obtém a role do usuário a partir dos claims do token
   */
  getUserRole(): Observable<'LOJA' | 'COMPRADOR' | null> {
    return this.getTokenClaims().pipe(
      map(claims => {
        if (!claims || !claims.role) return null;
        return claims.role as 'LOJA' | 'COMPRADOR';
      })
    );
  }

  /**
   * Obtém o domínio da loja a partir dos claims do token (se disponível)
   */
  getUserDominio(): Observable<string | null> {
    return this.getTokenClaims().pipe(
      map(claims => {
        if (!claims || !claims.dominio) return null;
        return claims.dominio as string;
      })
    );
  }
}