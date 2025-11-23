import { useState, FormEvent, useEffect } from 'react';
import { Carro, FormularioCarro } from '../types/carro';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Car, CarFront, Banknote, Calendar, Image, Copyright } from 'lucide-react';
import { CAPA_PADRAO } from '../lib/constants';

interface CarroFormProps {
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: (carro: FormularioCarro) => Promise<void>;
  carroEditando?: Carro | null;
}

export function CarroForm({ aberto, aoFechar, aoSalvar, carroEditando }: CarroFormProps) {
  
  const [tituloVenda, setTituloVenda] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [marca, setMarca] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  
  const [salvando, setSalvando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  useEffect(() => {
    if (carroEditando && aberto) {
      setTituloVenda(carroEditando.tituloVenda);
      setModelo(carroEditando.modelo);
      setAno(carroEditando.ano.toString());
      setPreco(carroEditando.preco);
      setDescricao(carroEditando.descricao);
      setMarca(carroEditando.marca);
      setCapaUrl(carroEditando.capaUrl);
    } else if (aberto) {
      limparFormulario();
    }
  }, [carroEditando, aberto]);

  const limparFormulario = () => {
    setTituloVenda('');
    setModelo('');
    setPreco(0);
    setAno('');
    setDescricao('');
    setMarca('');
    setCapaUrl('');
    setErros({});
  };

  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (!tituloVenda.trim()) {
      novosErros.tituloVenda = 'Título da venda é obrigatório';
    }

    if (!modelo.trim()) {
      novosErros.modelo = 'Modelo é obrigatório';
    }

    if (isNaN(preco) || preco <= 0) {
      novosErros.preco = 'Preço é obrigatório e deve ser um número válido';
    }

    const anoAtual = new Date().getFullYear();
    const anoNumero = parseInt(ano);

    if (!ano || ano.length !== 4 || isNaN(anoNumero) || anoNumero < 1900 || anoNumero > anoAtual + 1) {
      novosErros.ano = `Ano inválido (deve ser entre 1900 e ${anoAtual + 1})`;
    }

    if (!descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }

    if (!marca.trim()) {
      novosErros.marca = 'Marca é obrigatória';
    }

    if (capaUrl && !capaUrl.startsWith('http')) {
      novosErros.capaUrl = 'URL deve começar com http:// ou https://';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setSalvando(true);

      const carroData: FormularioCarro = {
        tituloVenda: tituloVenda.trim(),
        modelo: modelo.trim(),
        preco: preco,
        ano: parseInt(ano),
        descricao: descricao.trim(),
        marca: marca.trim(),
        capaUrl: capaUrl.trim() || CAPA_PADRAO,
      };

      await aoSalvar(carroData);

      limparFormulario();
      aoFechar();
    } catch (erro) {
      console.error('Erro ao salvar carro:', erro);
    } finally {
      setSalvando(false);
    }
  };

  const handleFechar = () => {
    limparFormulario();
    aoFechar();
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorTexto = e.target.value;
    
    const apenasNumeros = valorTexto.replace(/\D/g, '');
    const valorNumerico = Number(apenasNumeros) / 100;

    setPreco(valorNumerico);
  };

    const handleAnoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valorLimpo = e.target.value.replace(/\D/g, '');

      if (valorLimpo.length <= 4) {
        setAno(valorLimpo);
      }
    };

  return (
    <Modal
      aberto={aberto}
      aoFechar={handleFechar}
      titulo={carroEditando ? '✏️ Editar Carro' : '➕ Adicionar Novo Carro'}
      tamanho="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            label="Título da venda do Carro"
            placeholder="Celta preto"
            value={tituloVenda}
            onChange={(e) => setTituloVenda(e.target.value)}
            erro={erros.tituloVenda}
            icone={<Car size={18} />}
            required
          />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Marca"
            placeholder="Ex: Chevrolet"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            erro={erros.marca}
            icone={<Copyright size={18} />}
            required
          />

          <Input
            label="Modelo"
            placeholder="Ex: Celta 1.0 VHC 2006"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            erro={erros.modelo}
            icone={<CarFront size={18} />}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Preço"
            type="tel" 
            placeholder="R$ 0,00"
            value={preco === 0 ? '' : formatarMoeda(preco)}
            onChange={handlePrecoChange}
            erro={erros.preco}
            icone={<Banknote size={18} />}
            required
            maxLength={18}
          />

          <Input
            label="Ano"
            type="text"
            inputMode="numeric"
            placeholder="Ex: 2024"
            value={ano}
            onChange={handleAnoChange}
            erro={erros.ano}
            icone={<Calendar size={18} />}
            maxLength={4} 
            required
          />
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Carro em excelente estado, único dono..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          erro={erros.descricao}
          required
          textarea
        />

        <Input
          label="URL da Capa (opcional)"
          placeholder="https://exemplo.com/capa.jpg"
          value={capaUrl}
          onChange={(e) => setCapaUrl(e.target.value)}
          erro={erros.capaUrl}
          icone={<Image size={18} />}
        />

        {capaUrl && !erros.capaUrl && (
          <div className="mt-2">
            <p className="text-sm text-dark-300 mb-2">Preview:</p>
            <img
              src={capaUrl}
              alt="Preview da capa"
              className="w-32 h-32 object-cover rounded-lg border border-dark-700"
              onError={(e) => {
                e.currentTarget.src = CAPA_PADRAO;
              }}
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleFechar}
            className="flex-1"
            disabled={salvando}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={salvando}
            className="flex-1"
          >
            {salvando ? 'Salvando...' : carroEditando ? 'Atualizar' : 'Adicionar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
