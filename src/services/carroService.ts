import { api } from './api';
import { Carro, FormularioCarro } from '../types/carro';

const ENDPOINT = '/carros';

export const carroService = {
  buscarTodas: async (): Promise<Carro[]> => {
    try {
      const resposta = await api.get<Carro[]>(ENDPOINT);
      return resposta.data;
    } catch (erro) {
      console.error('Erro ao buscar carros:', erro);
      throw new Error('Não foi possível carregar as carros. Tente novamente.');
    }
  },

  buscarPorId: async (id: number): Promise<Carro> => {
    try {
      const resposta = await api.get<Carro>(`${ENDPOINT}/${id}`);
      return resposta.data;
    } catch (erro) {
      console.error(`Erro ao buscar carro ${id}:`, erro);
      throw new Error('Carro não encontrada.');
    }
  },


  criar: async (carro: FormularioCarro): Promise<Carro> => {
    try {
      // Enviamos os dados no corpo da requisição
      const resposta = await api.post<Carro>(ENDPOINT, carro);
      console.log('✅ Carro adicionado com sucesso:', resposta.data);
      return resposta.data;
    } catch (erro) {
      console.error('Erro ao adicionar carro:', erro);
      throw new Error('Não foi possível adicionar a carro. Tente novamente.');
    }
  },

  atualizar: async (id: number, carro: FormularioCarro): Promise<Carro> => {
    try {
      const resposta = await api.put<Carro>(`${ENDPOINT}/${id}`, carro);
      console.log('✅ Carro atualizada com sucesso:', resposta.data);
      return resposta.data;
    } catch (erro) {
      console.error(`Erro ao atualizar carro ${id}:`, erro);
      throw new Error('Não foi possível atualizar a carro. Tente novamente.');
    }
  },

  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`${ENDPOINT}/${id}`);
      console.log('✅ Carro deletada com sucesso:', id);
    } catch (erro) {
      console.error(`Erro ao deletar carro ${id}:`, erro);
      throw new Error('Não foi possível deletar a carro. Tente novamente.');
    }
  },
};
