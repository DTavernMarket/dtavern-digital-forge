/**
 * Ambiente padrão (desenvolvimento local).
 * Em builds `production` e `hml`, este arquivo é substituído via `fileReplacements` no `angular.json`.
 */
export const environment = {
  production: false,
  /**
   * URL base da API backend (inclui `/api/v1`).
   */
  apiBaseUrl: 'http://localhost:8080/api/v1',
} as const;
