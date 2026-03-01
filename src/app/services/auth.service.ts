// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { filter, map, switchMap, tap, catchError } from 'rxjs/operators';
import { auth } from '../config/firebase.config';
import { AuthResponse, User } from '../models/auth.model';
import { CadastroLojaRequest } from '../models/artesao.model';
import { sendPasswordResetEmail } from "firebase/auth";

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

  private initializedSubject = new BehaviorSubject<boolean>(false);
  initialized$ = this.initializedSubject.asObservable();

  constructor() {
    this.initAuthListener();
  }

  /**
   * Inicializa o listener de autenticação do Firebase.
   * Sempre que a aplicação iniciar (incluindo refresh de página), este método
   * ouve o evento onAuthStateChanged. Se houver um usuário autenticado, força
   * imediatamente a obtenção de um novo ID Token chamando getIdToken(true),
   * garantindo que o token em memória seja sempre válido e atualizado.
   * O token é mantido apenas em memória (via BehaviorSubject), nunca em localStorage.
   */
  private initAuthListener() {
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Forçar refresh do token para garantir que está válido e atualizado
          // (incluindo custom claims como roles)
          // O parâmetro true força a obtenção de um novo token do servidor
          const token = await firebaseUser.getIdToken(true);

          // Converter FirebaseUser para User do modelo da aplicação
          const user: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || null,
            photoURL: firebaseUser.photoURL || null
          };

          // Só atualizar o estado após o refresh bem-sucedido
          // Isso garante que o usuário só seja considerado logado com token válido
          this.currentUserSubject.next(user);
          this.idTokenSubject.next(token);
        } catch (error) {
          // Se a obtenção do token falhar (refresh token inválido, sessão revogada, etc.),
          // deslogar o usuário de forma limpa
          console.error('Erro ao obter token atualizado:', error);
          this.currentUserSubject.next(null);
          this.idTokenSubject.next(null);

          // Tentar fazer signOut para limpar o estado do Firebase
          try {
            await signOut(auth);
          } catch (signOutError) {
            console.error('Erro ao fazer signOut após falha no token:', signOutError);
          }
        }
      } else {
        // Não há usuário autenticado - definir estado como deslogado
        this.currentUserSubject.next(null);
        this.idTokenSubject.next(null);
      }

      // Marcar como inicializado após processar o estado de autenticação
      // Isso permite que a UI aguarde a inicialização antes de considerar o estado
      this.initializedSubject.next(true);
    });
  }

  /**
   * Verifica se o serviço de autenticação foi inicializado.
   * Útil para aguardar a reidratação da sessão antes de verificar autenticação.
   */
  isInitialized(): boolean {
    return this.initializedSubject.value;
  }

  /**
   * Login com email e senha
   * Após o login bem-sucedido, força o refresh do token para garantir que está atualizado
   */
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      switchMap((cred) => {
        // Forçar refresh do token após login para garantir que está atualizado
        return from(cred.user.getIdToken(true)).pipe(
          tap((token) => {
            const user: User = {
              uid: cred.user.uid,
              email: cred.user.email,
              displayName: cred.user.displayName || null
            };

            this.idTokenSubject.next(token);
            this.currentUserSubject.next(user);
          }),
          map(() => {
            const user: User = {
              uid: cred.user.uid,
              email: cred.user.email,
              displayName: cred.user.displayName || null
            };
            return user;
          }),
          catchError((error) => {
            console.error('Erro ao obter token após login:', error);
            // Se falhar ao obter token, fazer signOut
            signOut(auth).catch(signOutError => {
              console.error('Erro ao fazer signOut após falha no token:', signOutError);
            });
            throw error;
          })
        );
      })
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


  resetarSenha(email: string): Observable<void> {
    const emailLimpo = email?.trim();

    // Validação básica de e-mail antes de chamar o Firebase
    if (!emailLimpo) {
      return throwError(() => new Error('E-mail é obrigatório para redefinir a senha.'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLimpo)) {
      return throwError(() => new Error('Informe um e-mail válido para redefinir a senha.'));
    }

    return from(sendPasswordResetEmail(auth, emailLimpo)).pipe(
      catchError((error) => {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error);
        return throwError(() => error);
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

  /**
   * Retorna o usuário atual de forma síncrona (valor atual do BehaviorSubject)
   * Útil para guards e verificações rápidas
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Retorna um Observable do usuário atual (apenas quando não for null)
   * Útil para componentes que precisam reagir a mudanças de estado
   */
  getCurrentUser$(): Observable<User> {
    return this.currentUser$.pipe(
      filter(user => user !== null)
    ) as Observable<User>;
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

  deleteComprador(): Observable<void> {
    return this.getCurrentToken().pipe(
      switchMap(token => {
        return this.http.delete<void>(`http://localhost:8080/api/v1/clientes/deletar-comprador`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }

}