export interface Carro {
  id?: number;        
  tituloVenda: string;     
  modelo: string;
  ano: number;
  preco: number;
  descricao: string;
  marca: string;
  capaUrl: string;
}

export type FormularioCarro = Omit<Carro, 'id'>;
