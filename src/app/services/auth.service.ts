// src/app/services/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, MeResponse, User } from '../models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/v1/auth';

  // Estado de autenticação
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Token atual
  private idToken = signal<string | null>(null);
  public idToken$ = this.idToken.asReadonly();

  constructor() {
    // Observar mudanças no estado de autenticação do Firebase
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Obter token do Firebase
        const token = await firebaseUser.getIdToken();
        this.idToken.set(token);
        // Converter para nosso modelo de User
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || null
        };
        this.currentUserSubject.next(user);
        this.getCurrentToken();

        // Verificar token no backend
        this.verifyToken(token).subscribe({

          error: (error) => {
            console.error('Erro ao verificar token:', error);
          }
        });
      } else {
        this.idToken.set(null);
        this.currentUserSubject.next(null);
      }
    });
  }

  async getCurrentToken(): Promise<string | null> {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      return token;
    } else {
      return null;
    }
  }

  /**
   * Login com email e senha
   */
  login(email: string, password: string): Observable<AuthResponse | undefined> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      switchMap(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.idToken.set(token);

        // Verificar token no backend
        return this.verifyToken(token).toPromise() || Promise.resolve({
          idToken: token,
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          message: 'Login realizado com sucesso'
        } as AuthResponse);
      })
    );
  }

  /**
   * Registrar novo usuário
   */
  register(email: string, password: string): Observable<AuthResponse> {
    const request: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, request);
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

  /**
   * Logout
   */
  logout(): Observable<void> {
    return from(signOut(auth)).pipe(
      map(() => {
        this.idToken.set(null);
        this.currentUserSubject.next(null);
        window.location.reload();
      })
    );
  }

  /**
   * Obter usuário atual
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

}