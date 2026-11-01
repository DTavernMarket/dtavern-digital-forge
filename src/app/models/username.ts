export const MENSAGEM_USERNAME =
  'Username deve ter de 3 a 100 caracteres, com letras minúsculas, números e hífens, sem hífen nas extremidades.';

const USERNAME = /^[a-z0-9](?:[a-z0-9-]{1,98}[a-z0-9])$/;

export function sanitizarUsername(bruto: string): string {
  return (bruto ?? '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function usernameValido(username: string): boolean {
  return USERNAME.test(username);
}
