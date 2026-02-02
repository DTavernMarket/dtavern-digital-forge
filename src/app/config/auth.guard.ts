// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, take, map, Observable } from 'rxjs';

/**
 * Guard que protege rotas autenticadas.
 * Aguarda a inicialização do serviço de autenticação (reidratação de sessão)
 * antes de verificar se o usuário está autenticado, evitando estado "meio logado".
 */
export const authGuard: CanActivateFn = (route, state): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se já está inicializado, verificar diretamente
  if (authService.isInitialized()) {
    if (authService.getCurrentUser() !== null) {
      return true;
    }
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Aguardar inicialização antes de verificar autenticação
  // Isso garante que a reidratação da sessão foi concluída
  return authService.initialized$.pipe(
    filter(initialized => initialized === true),
    take(1),
    map(() => {
      if (authService.getCurrentUser() !== null) {
        return true;
      }
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};