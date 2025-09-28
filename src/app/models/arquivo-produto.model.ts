export class ArquivoProduto {
  file: File;
  nome: string;

  constructor(file: File, nome?: string) {
    this.file = file;
    this.nome = nome || file.name;
  }

  /**
   * Cria um ArquivoProduto a partir de um File
   */
  static fromFile(file: File): ArquivoProduto {
    return new ArquivoProduto(file);
  }

  /**
   * Obtém a URL de preview do arquivo
   */
  getUrl(): string {
    return URL.createObjectURL(this.file);
  }

  /**
   * Revoga a URL do objeto para liberar memória
   */
  revogarUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}