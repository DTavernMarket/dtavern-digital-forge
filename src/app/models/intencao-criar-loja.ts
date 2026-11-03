const CHAVE = 'dtavern.criarLoja';

export function marcarIntencaoCriarLoja(): void {
  localStorage.setItem(CHAVE, '1');
}

export function temIntencaoCriarLoja(): boolean {
  return localStorage.getItem(CHAVE) === '1';
}

export function consumirIntencaoCriarLoja(): boolean {
  if (!temIntencaoCriarLoja()) {
    return false;
  }
  localStorage.removeItem(CHAVE);
  return true;
}
