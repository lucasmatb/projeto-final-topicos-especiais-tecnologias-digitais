import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarAno(ano: number): string {
  if (!ano || ano < 1000 || ano > 9999) {
    return '';
  }
  return ano.toString();
}

export function validarUrlImagem(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    const extensoesValidas = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return extensoesValidas.some(ext => urlObj.pathname.toLowerCase().endsWith(ext));
  } catch {
    return false;
  }
}

export function truncarTexto(texto: string, tamanhoMaximo: number = 50): string {
  if (texto.length <= tamanhoMaximo) {
    return texto;
  }
  return texto.substring(0, tamanhoMaximo) + '...';
}
