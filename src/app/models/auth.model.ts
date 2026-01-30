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

export interface MeResponseLoja {

  nomeLoja: string;
  email: string;
  dominio: string;
  dataCriacaoConta: string;

}

export interface MeResponseCliente {

  nomeCompleto: string;
  apelido: string;
  email: string;
  dataNascimento: string;
  dataCriacaoConta: string;

}