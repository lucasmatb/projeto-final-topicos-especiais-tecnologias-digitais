import { useState } from 'react';
import { api } from '../services/api'; // Ajuste o import conforme onde seu axios está
import { Button } from './ui/Button';
import { AlertTriangle, WifiOff, FileWarning, ServerCrash } from 'lucide-react';

export function DebugArea() {
  const [status, setStatus] = useState<string>('');

  // 1. Forçar Erro 404 (Not Found)
  // Simplesmente chamamos uma rota que não existe no db.json
  const handle404 = async () => {
    setStatus('Testando 404...');
    try {
      await api.get('/rota-que-nao-existe-123');
      setStatus('Sucesso inesperado (???)');
    } catch (error: any) {
      setStatus(`Capturado: ${error.response?.status} - ${error.response?.statusText}`);
    }
  };

  // 2. Forçar Timeout (Simula internet lenta ou servidor demorando)
  // Definimos um timeout de 1ms para a requisição falhar instantaneamente
  const handleTimeout = async () => {
    setStatus('Testando Timeout...');
    try {
      await api.get('/carros', { timeout: 1 });
    } catch (error: any) {
      setStatus(`Capturado: ${error.code} (Timeout)`);
    }
  };

  // 3. Forçar Erro de Conexão (Network Error)
  // Tentamos conectar numa porta onde não tem nada rodando (ex: 9999)
  // Isso testa o bloco "else if (error.request)" do seu interceptor
  const handleNetworkError = async () => {
    setStatus('Testando Erro de Rede...');
    try {
      // Cria uma instância temporária apontando pro nada
      await api.get('http://localhost:9999/nada');
    } catch (error: any) {
      setStatus(`Capturado: ${error.message} (Network Error)`);
    }
  };

  return (
    <div className="mt-6 p-6 border-t border-b mb-6 border-dark-700 animate-fade-in">
      <div className="flex items-center gap-2 mb-4 text-dark-300">
        <AlertTriangle size={20} />
        <h3 className="font-bold uppercase tracking-wider text-sm">Área de Debug (Testes de API)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="secondary" 
          onClick={handle404}
          className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
        >
          <FileWarning size={18} className="mr-2" />
          Forçar 404
        </Button>

        <Button 
          variant="danger" 
          onClick={handleNetworkError}
        >
          <WifiOff size={18} className="mr-2" />
          Forçar Erro de Rede
        </Button>

        <Button 
          variant="ghost" 
          onClick={handleTimeout}
          className="bg-dark-800 hover:bg-dark-700 border border-dark-600"
        >
          <ServerCrash size={18} className="mr-2" />
          Forçar Timeout
        </Button>
      </div>

      {status && (
        <div className="mt-4 p-3 rounded bg-dark-800 border border-dark-700 font-mono text-xs text-dark-300">
          Last result: <span className="text-white">{status}</span>
        </div>
      )}
    </div>
  );
}