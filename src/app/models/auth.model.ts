// src/app/models/auth.model.ts
export interface AuthResponse {
  idToken: string | null;
  uid: string | null;
  email: string | null;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export interface MeResponse {
  tipo: 'LOJA' | 'COMPRADOR';
  displayName: string;
  dominio?: string | null;

}
