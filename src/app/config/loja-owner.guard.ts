import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { ArtesaoService } from '../services/artesao.service';
import { map, take, catchError, of } from 'rxjs';

/**
 * Guard que protege rotas que só o dono da loja pode acessar (ex.: gerenciar-produtos).
 * Obtém o domínio da rota pai (lojas/:dominio) e verifica se o usuário autenticado é o dono.
 * Deve ser usado junto com authGuard: canActivate: [authGuard, lojaOwnerGuard]
 */
export const lojaOwnerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const artesaoService = inject(ArtesaoService);

  // Tentar obter o domínio tanto na própria rota quanto no pai (dependendo da configuração das rotas)
  const dominio = route.paramMap.get('dominio') ?? route.parent?.paramMap.get('dominio');

  if (!dominio) {
    router.navigate(['/']);
    return false;
  }

  return artesaoService.verifyOwner(dominio).pipe(
    take(1),
    map((isOwner) => {
      if (isOwner) {
        return true;
      }
      router.navigate(['/lojas', dominio]);
      return false;
    }),
    catchError(() => {
      router.navigate(['/lojas', dominio]);
      return of(false);
    })
  );
};
