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
  firebaseConfig: {
    apiKey: 'AIzaSyB-zeSKQuVmP8JEHq3Qu9PJBLbaNwHGY6U',
    authDomain: 'dtavern-marketplace.firebaseapp.com',
    projectId: 'dtavern-marketplace',
    storageBucket: 'dtavern-marketplace.firebasestorage.app',
    messagingSenderId: '1019613186354',
    appId: '1:1019613186354:web:17bc23876bb37583036f2b',
    measurementId: 'G-ERE85K7G1E'
  }
} as const;
