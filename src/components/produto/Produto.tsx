import { X, Plus, Minus, Flame, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../../assets/imgfallback/ImageWithFallback';


interface ProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto: {
    id: number;
    nome: string;
    descricao: string;
    calorias: number;
    proteina: number;
    carboidratos: number;
    gordura: number;
    preco: number;
    avaliacao: number;
    imagem: string;
    ingredientes: string[];
  };
}

export function ProdutoModal({ isOpen, onClose, produto }: ProdutoModalProps) {
  const [quantidade, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    // Aqui você adicionaria a lógica do carrinho
    alert(`${quantidade}x ${produto.nome} adicionado ao carrinho!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Image */}
        <div className="relative">
          <ImageWithFallback
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-64 md:h-80 object-cover"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 bg-white hover:bg-gray-100 rounded-full shadow-lg"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900">{produto.nome}</h2>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">{produto.avaliacao}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{produto.descricao}</p>
          {/* Nutritional Info */}
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-green-600" />
              Informações Nutricionais
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">{produto.calorias}</p>
                <p className="text-sm text-gray-600">Calorias</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{produto.proteina}g</p>
                <p className="text-sm text-gray-600">Proteínas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{produto.carboidratos}g</p>
                <p className="text-sm text-gray-600">Carboidratos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{produto.gordura}g</p>
                <p className="text-sm text-gray-600">Gorduras</p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Ingredientes</h3>
            <p className="text-gray-600">{produto.ingredientes.join(', ')}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantidade - 1))}
                disabled={quantidade <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold w-8 text-center">{quantidade}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(quantidade + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 flex-1"
              onClick={handleAddToCart}
            >
              Adicionar - R$ {(produto.preco * quantidade).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoModal;