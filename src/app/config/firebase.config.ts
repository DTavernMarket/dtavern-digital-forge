// src/app/config/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environment/environment';

// ⚠️ IMPORTANTE: Estas são credenciais PÚBLICAS do Firebase
// Elas são seguras para usar no frontend (não são a chave privada)
const firebaseConfig = environment.firebaseConfig;

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Auth para uso nos serviços
export const auth = getAuth(app);
export default app;