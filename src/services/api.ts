
import axios from 'axios';

const URL_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: URL_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    console.log('📤 Requisição enviada:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.message);
    
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('Recurso não encontrado');
          break;
        case 500:
          console.error('Erro interno do servidor');
          break;
        default:
          console.error('Erro desconhecido:', error.response.status);
      }
    } else if (error.request) {
      console.error('Sem resposta do servidor');
    }
    
    return Promise.reject(error);
  }
);
