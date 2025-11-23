import { useState, useEffect } from 'react';
import { Search, Plus, Car, AlertCircle, Loader2, LogIn, LogOut, User } from 'lucide-react';
import Cookies from 'js-cookie';

import { useCarros } from './hooks/useCarros';
import { Carro, FormularioCarro } from './types/carro';

import { CarroCard } from './components/CarroCard';
import { CarroForm } from './components/CarroForm';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { DebugArea } from './components/DebugArea'; // O novo componente de testes

function App() {
  const { carros, carregando, erro, adicionar, atualizar, deletar } = useCarros();
  
  const [termoBusca, setTermoBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [carroEditando, setCarroEditando] = useState<Carro | null>(null);
  
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_demo_token');
    if (token) {
      setLogado(true);
    }
  }, []);

  const handleLogin = () => {
    Cookies.set('auth_demo_token', 'token-fake-acesso-admin', { expires: 1 });
    setLogado(true);
  };

  const handleLogout = () => {
    Cookies.remove('auth_demo_token');
    setLogado(false);
  };

  const carrosFiltrados = carros.filter((carro) => {
    const termo = termoBusca.toLowerCase();
    return (
      carro.tituloVenda.toLowerCase().includes(termo) ||
      carro.modelo.toLowerCase().includes(termo) ||
      carro.ano.toString().includes(termo) ||
      carro.preco.toString().includes(termo) ||
      carro.descricao.toLowerCase().includes(termo) ||
      carro.marca.toLowerCase().includes(termo)
    );
  });

  const handleAdicionar = () => {
    setCarroEditando(null);
    setModalAberto(true);
  };
  
  const handleEditar = (carro: Carro) => {
    setCarroEditando(carro);
    setModalAberto(true);
  };
  
  const handleSalvar = async (carroData: FormularioCarro) => {
    if (carroEditando) {
      await atualizar(carroEditando.id!, carroData);
    } else {
      await adicionar(carroData);
    }
   
    setModalAberto(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex justify-end mb-4 animate-fade-in">
          {logado ? (
            <div className="flex items-center gap-3 bg-dark-800/50 p-2 rounded-lg border border-dark-700 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-700 rounded-md">
                <User size={16} className="text-primary-500" />
                <span className="text-sm font-medium text-white">Admin</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={handleLogin} className="shadow-lg shadow-primary-500/20">
              <LogIn size={16} className="mr-2" />
              Login Admin
            </Button>
          )}
        </div>

        <header className="mb-8 animate-fade-in text-center">
          <div className="flex items-center justify-center mb-2">
            <Car className="mr-3 text-primary-500" size={40} />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              Estoque de Veículos
            </h1>
          </div>
          <p className="text-dark-300 text-lg">
            Gerencie e visualize os carros disponíveis para venda com estilo 🏎️
          </p>
        </header>

        <DebugArea />

        <div className="mb-8 flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="flex-1">
            <Input
              placeholder="Buscar por título, modelo, ano, preço, marca..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              icone={<Search size={18} />}
            />
          </div>
          
          {logado && (
            <Button
              onClick={handleAdicionar}
              size="lg"
              className="sm:w-auto shadow-lg shadow-primary-500/20"
            >
              <Plus size={20} className="mr-2" />
              Adicionar Carro
            </Button>
          )}
        </div>
        
        <main>
          {carregando && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <Loader2 className="animate-spin text-primary-500 mb-4" size={48} />
              <p className="text-dark-300 text-lg">Carregando carros...</p>
            </div>
          )}

          {erro && !carregando && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 flex items-start gap-4 animate-scale-in">
              <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-red-400 font-bold mb-1">Erro ao carregar carros</h3>
                <p className="text-red-300">{erro}</p>
                <p className="text-red-300/60 text-sm mt-2">Verifique se a API está rodando.</p>
              </div>
            </div>
          )}

          {!carregando && !erro && (
            <>
              <div className="mb-4 text-dark-300 flex justify-between items-end">
                {termoBusca ? (
                  <p>Encontrados <span className="text-primary-400 font-bold">{carrosFiltrados.length}</span> resultado(s)</p>
                ) : (
                  <p>Total de <span className="text-primary-400 font-bold">{carros.length}</span> veículos</p>
                )}
                
                {!logado && carros.length > 0 && (
                  <span className="text-xs text-dark-500 italic hidden sm:inline-block">
                    Faça login para adicionar, editar ou excluir
                  </span>
                )}
              </div>

              {carrosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {carrosFiltrados.map((carro) => (
                    <CarroCard
                      key={carro.id}
                      carro={carro}
                      aoEditar={handleEditar}
                      aoDeletar={deletar}
                      somenteLeitura={!logado}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 animate-fade-in border-2 border-dashed border-dark-700 rounded-xl bg-dark-800/30">
                  <Car className="mx-auto text-dark-600 mb-4" size={64} /> 
                  <h3 className="text-xl font-bold text-dark-300 mb-2">
                    {termoBusca ? 'Nenhum carro encontrado' : 'Sua coleção está vazia'}
                  </h3>
                  <p className="text-dark-400 mb-6">
                    {termoBusca 
                      ? 'Tente buscar por outros termos' 
                      : logado 
                        ? 'Comece adicionando seu primeiro veículo'
                        : 'Faça login para gerenciar o estoque'}
                  </p>
                  
                  {!termoBusca && logado && (
                    <Button onClick={handleAdicionar}>
                      <Plus size={20} className="mr-2" />
                      Adicionar Primeiro Carro
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </main>
        
        <CarroForm
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          aoSalvar={handleSalvar}
          carroEditando={carroEditando}
        />
      </div>
      
      <footer className="mt-16 pb-8 text-center text-dark-400 text-sm border-t border-dark-800 pt-8 mx-8">
        <p>
          Feito com ❤️ para ensinar React, TypeScript e APIs REST
        </p>
        <p className="mt-2 text-dark-500">
          Stack: React | Axios | Docker | TailwindCSS | JsonServer
        </p>
      </footer>
    </div>
  );
}

export default App;