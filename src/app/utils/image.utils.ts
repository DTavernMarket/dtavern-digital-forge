import { ArquivoProduto } from '../models/arquivo-produto.model';

/**
 * Utilitários para manipulação de imagens
 */
export class ImageUtils {
  /**
   * Obtém a URL de preview de uma imagem, seja ArquivoProduto ou string.
   * Se for ArquivoProduto, retorna a URL gerada pelo método getUrl().
   * Se for string, retorna a string diretamente (para compatibilidade com URLs estáticas).
   */
  static getImagePreview(image: ArquivoProduto | string | null | undefined): string {
    if (!image) return '';
    
    if (image instanceof ArquivoProduto) {
      return image.getUrl();
    }
    
    if (typeof image === 'string') {
      return image;
    }
    
    return '';
  }

  /**
   * Obtém a URL de preview da primeira imagem de um array de ArquivoProduto ou strings.
   */
  static getFirstImagePreview(images: (ArquivoProduto | string)[] | null | undefined): string {
    if (!images || images.length === 0) return '';
    return this.getImagePreview(images[0]);
  }

  /**
   * Obtém o nome do arquivo de um ArquivoProduto ou string.
   */
  static getFileName(image: ArquivoProduto | string | null | undefined): string {
    if (!image) return '';
    if (image instanceof ArquivoProduto) {
      return image.nome;
    }
    return typeof image === 'string' ? image.split('/').pop() || '' : '';
  }

  /**
   * Obtém o tamanho do arquivo de um ArquivoProduto.
   */
  static getFileSize(image: ArquivoProduto | null | undefined): number {
    if (!image || !image.file) return 0;
    return image.file.size;
  }

  /**
   * Carrega um arquivo a partir de um caminho relativo do projeto.
   * @param relativePath - Caminho relativo do arquivo (ex: '/assets/images/arquivo.png')
   * @returns Promise<File> - O arquivo carregado
   */
  static async carregarArquivoPorCaminho(relativePath: string): Promise<File> {
    try {
      const response = await fetch(relativePath);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar arquivo: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const fileName = relativePath.split('/').pop() || 'arquivo';
      
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error(`Erro ao carregar arquivo de ${relativePath}:`, error);
      throw error;
    }
  }
}