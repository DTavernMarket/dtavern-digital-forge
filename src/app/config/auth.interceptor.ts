// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { combineLatest, switchMap, take, filter, timeout, catchError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Combinar o estado do usuário e do token para verificar autenticação
  return combineLatest([
    authService.currentUser$,
    authService.idToken$
  ]).pipe(
    take(1), // Pegar apenas o primeiro valor
    switchMap(([user, token]) => {
      // Se o usuário está autenticado, o token é obrigatório
      if (user !== null) {
        if (!token) {
          // Usuário autenticado mas sem token - aguardar o token aparecer
          // (pode estar sendo carregado assincronamente)
          return authService.idToken$.pipe(
            filter(t => t !== null), // Aguardar até ter um token
            take(1), // Pegar o primeiro token válido
            timeout({
              each: 5000, // Timeout de 5 segundos
              with: () => {
                // Se o token não aparecer em 5 segundos, logar erro e prosseguir sem token
                console.error('Usuário autenticado mas token não disponível após timeout');
                return of(null);
              }
            }),
            switchMap(validToken => {
              if (validToken) {
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${validToken}`
                  }
                });
                return next(clonedReq);
              }
              // Fallback: prosseguir sem token (não ideal, mas evita bloquear a requisição)
              return next(req);
            }),
            catchError(() => {
              // Em caso de erro, prosseguir sem token
              console.error('Erro ao aguardar token');
              return next(req);
            })
          );
        }
        // Usuário autenticado e token disponível - adicionar token obrigatoriamente
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(clonedReq);
      }
      // Usuário não autenticado - prosseguir sem token (comportamento normal)
      return next(req);
    })
  );
};