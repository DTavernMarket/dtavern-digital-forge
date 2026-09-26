/**
 * Produção.
 * Ajuste `apiBaseUrl` para o host real da API em produção.
 */
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.exemplo.com/api/v1',
  firebaseConfig: {
    // Substitua pelos dados reais do projeto Firebase de produção.
    apiKey: 'AIzaSyB-zeSKQuVmP8JEHq3Qu9PJBLbaNwHGY6U',
    authDomain: 'dtavern-marketplace.firebaseapp.com',
    projectId: 'dtavern-marketplace',
    storageBucket: 'dtavern-marketplace.firebasestorage.app',
    messagingSenderId: '1019613186354',
    appId: '1:1019613186354:web:17bc23876bb37583036f2b',
    measurementId: 'G-ERE85K7G1E'
  }
} as const;
