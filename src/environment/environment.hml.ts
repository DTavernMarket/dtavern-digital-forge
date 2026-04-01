/**
 * Homologação (HML).
 * Ajuste `apiBaseUrl` para o host real da API de homologação.
 */
export const environment = {
  production: false,
  apiBaseUrl: 'https://dtavern-server-hml.up.railway.app/api/v1',
  firebaseConfig: {
    apiKey: 'AIzaSyCgF4TDJNsB76P079D3VBjzw3898JVz9U4',
    authDomain: 'dtavern-hml.firebaseapp.com',
    projectId: 'dtavern-hml',
    storageBucket: 'dtavern-hml.firebasestorage.app',
    messagingSenderId: '830865137830',
    appId: '1:830865137830:web:bcef5034adc7172d385467'
  }
} as const;
