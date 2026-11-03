export const DOMINIO_MAXIMO = 150;
export const NOME_LOJA_MAXIMO = 200;
export const DESCRICAO_LOJA_MAXIMA = 2000;

const ENDERECO = /^[a-z0-9](?:[a-z0-9-]{0,148}[a-z0-9])?$/;

export function enderecoValido(dominio: string): boolean {
  return ENDERECO.test(dominio);
}

export function sugerirDominio(nome: string): string {
  if (!nome || !nome.trim()) {
    return '';
  }

  let slug = nome
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^A-Za-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/-{2,}/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  if (slug.length > DOMINIO_MAXIMO) {
    slug = slug.slice(0, DOMINIO_MAXIMO).replace(/-+$/, '');
  }

  return slug;
}
