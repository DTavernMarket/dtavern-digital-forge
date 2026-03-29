/**
 * Homologação (HML).
 * Ajuste `apiBaseUrl` para o host real da API de homologação.
 */
export const environment = {
  production: false,
  apiBaseUrl: 'https://dtavern-server-hml.up.railway.app/api/v1',
} as const;
