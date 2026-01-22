// src/app/config/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// ⚠️ IMPORTANTE: Estas são credenciais PÚBLICAS do Firebase
// Elas são seguras para usar no frontend (não são a chave privada)
const firebaseConfig = {
    apiKey: "AIzaSyB-zeSKQuVmP8JEHq3Qu9PJBLbaNwHGY6U",
    authDomain: "dtavern-marketplace.firebaseapp.com",
    projectId: "dtavern-marketplace",
    storageBucket: "dtavern-marketplace.firebasestorage.app",
    messagingSenderId: "1019613186354",
    appId: "1:1019613186354:web:17bc23876bb37583036f2b",
    measurementId: "G-ERE85K7G1E"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Auth para uso nos serviços
export const auth = getAuth(app);
export default app;