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
    const msg = '❌ Erro ao enviar requisição: ' + error.message;
    console.error(msg);
    window.alert(msg); // <--- ALERT AQUI
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
          window.alert('❌ Erro 404: Recurso não encontrado! \n(Verifique se a rota existe)'); 
          break;
          
        case 500:
          console.error('Erro interno do servidor');
          window.alert('❌ Erro 500: Erro interno no servidor! \n(O backend falhou)');
          break;
          
        default:
          console.error('Erro desconhecido:', error.response.status);
          window.alert(`❌ Erro ${error.response.status}: Ocorreu um erro inesperado.`);
      }
    } else if (error.request) {
      console.error('Sem resposta do servidor (Timeout ou Rede)');
      window.alert('❌ Erro de Conexão: O servidor não respondeu. \n(Pode ser Timeout ou API desligada)');
    } else {
      window.alert(`❌ Erro: ${error.message}`);
    }
    
    return Promise.reject(error);
  }
);