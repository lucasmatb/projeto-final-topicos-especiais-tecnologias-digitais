
import { useState, useEffect, useCallback } from 'react';
import { carroService } from '../services/carroService';
import { Carro, FormularioCarro } from '../types/carro';

interface UseCarrosRetorno {
  carros: Carro[];
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
  adicionar: (carro: FormularioCarro) => Promise<void>;
  atualizar: (id: number, carro: FormularioCarro) => Promise<void>;
  deletar: (id: number) => Promise<void>;
}

export function useCarros(): UseCarrosRetorno {

  const [carros, setCarros] = useState<Carro[]>([]);
  
  const [carregando, setCarregando] = useState(true);
  
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      const dados = await carroService.buscarTodas();
      
      setCarros(dados);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro desconhecido';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }, []);

  const adicionar = useCallback(async (carro: FormularioCarro) => {
    try {
      setCarregando(true);
      setErro(null);
      
      await carroService.criar(carro);

      await recarregar();
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao adicionar carro';
      setErro(mensagem);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, [recarregar]);

  const atualizar = useCallback(async (id: number, carro: FormularioCarro) => {
    try {
      setCarregando(true);
      setErro(null);
      
      await carroService.atualizar(id, carro);

      await recarregar();
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao atualizar música';
      setErro(mensagem);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, [recarregar]);

  const deletar = useCallback(async (id: number) => {
    try {
      setCarregando(true);
      setErro(null);

      await carroService.deletar(id);
      
      await recarregar();
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao deletar música';
      setErro(mensagem);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, [recarregar]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return {
    carros,
    carregando,
    erro,
    recarregar,
    adicionar,
    atualizar,
    deletar,
  };
}
