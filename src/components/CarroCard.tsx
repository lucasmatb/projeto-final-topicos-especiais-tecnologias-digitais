import { Edit2, Trash2 } from 'lucide-react';
import { Carro } from '../types/carro';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { CAPA_PADRAO } from '../lib/constants';

interface CarroCardProps {
  carro: Carro;
  aoEditar: (carro: Carro) => void;
  aoDeletar: (id: number) => void;
  somenteLeitura?: boolean;
}

export function CarroCard({ carro, aoEditar, aoDeletar, somenteLeitura = false }: CarroCardProps) {
  
  const handleDeletar = () => {
    if (window.confirm(`Tem certeza que deseja deletar "${carro.tituloVenda}"?`)) {
      aoDeletar(carro.id!);
    }
  };

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <Card hover className="group animate-fade-in">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-dark-700 to-dark-800">
            <img
              src={carro.capaUrl || CAPA_PADRAO}
              alt={`Capa do álbum ${carro.capaUrl}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = CAPA_PADRAO;
              }}
            />
            
            {!somenteLeitura && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => aoEditar(carro)} 
                    className="flex-1"
                    aria-label={`Editar ${carro.tituloVenda}`}
                  >
                    <Edit2 size={16} className="mr-2" /> Editar
                  </Button>
                  
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={handleDeletar} 
                    className="flex-1"
                    aria-label={`Deletar ${carro.tituloVenda}`}
                  >
                    <Trash2 size={16} className="mr-2" /> Deletar
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1" title={carro.tituloVenda}>
                {carro.tituloVenda}
              </h3>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex items-center text-dark-400">
                <span className="font-medium text-dark-300 mr-2">Modelo:</span>
                <span className="line-clamp-1">{carro.modelo}</span>
              </div>

              <div className="flex items-center text-dark-400">
                <span className="font-medium text-dark-300 mr-2">Preço:</span>
                <span className="line-clamp-1 font-semibold text-primary-400">
                  {formatarPreco(carro.preco)}
                </span>
              </div>

              <div className="flex items-center text-dark-400">
                <span className="font-medium text-dark-300 mr-2">Marca:</span>
                <span className="line-clamp-1">{carro.marca}</span>
              </div>
              
              <div className="pt-2 mt-2 border-t border-dark-700 flex items-center justify-between text-dark-400">
                <div>
                  <span className="font-medium text-dark-300 mr-2">Ano:</span>
                  <span>{carro.ano}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}