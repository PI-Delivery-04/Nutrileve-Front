// src/components/CartItem.tsx

import { useState } from "react";
import { UseCart } from "../../contexts/CartContext";
import { CartItem as CartItemType } from "../../models/Cart";
import { Minus, Plus, Trash2, MessageSquare } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export const CartItemComponent = ({ item }: CartItemProps) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    updateObservations,
  } = UseCart();
  const [showObservations, setShowObservations] = useState(false);
  const [observations, setObservations] = useState(item.observations || "");

  const handleSaveObservations = () => {
    updateObservations(String(item.product.id), observations);
    setShowObservations(false);
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        {/* Imagem */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          <img
            src={item.product.image || "/placeholder-food.jpg"}
            alt={item.product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-food.jpg";
            }}
          />
        </div>

        {/* Informações */}
        <div className="flex-1 min-w-0">
          {/* Nome e Remover */}
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">
              {item.product.name}
            </h3>
            <button
              onClick={() => removeFromCart(String(item.product.id))}
              className="text-red-500 hover:text-red-700 p-1 -mt-1"
              aria-label="Remover item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Descrição */}
          {item.product.description && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">
              {item.product.description}
            </p>
          )}

          {/* Observações */}
          {item.observations && !showObservations && (
            <div className="bg-yellow-50 border border-yellow-200 rounded px-2 py-1 mb-2">
              <p className="text-xs text-yellow-800 line-clamp-1">
                📝 {item.observations}
              </p>
            </div>
          )}

          {/* Controles */}
          <div className="flex items-center justify-between">
            {/* Quantidade */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => decreaseQuantity(String(item.product.id))}
                disabled={item.quantity === 1}
                className="w-7 h-7 flex items-center justify-center rounded-md 
                         hover:bg-white transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-8 text-center font-semibold text-sm">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(String(item.product.id))}
                className="w-7 h-7 flex items-center justify-center rounded-md 
                         hover:bg-white transition-colors"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Subtotal */}
            <span className="font-bold text-emerald-600">
              {subtotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          {/* Botão Observações */}
          <button
            onClick={() => setShowObservations(!showObservations)}
            className="mt-2 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
          >
            <MessageSquare className="w-3 h-3" />
            <span>
              {item.observations
                ? "Editar observações"
                : "Adicionar observações"}
            </span>
          </button>
        </div>
      </div>

      {/* Campo de Observações */}
      {showObservations && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Ex: Sem cebola, pouco sal..."
            className="w-full p-2 text-sm border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-emerald-600 focus:border-transparent
                     resize-none"
            rows={2}
            maxLength={100}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              {observations.length}/100
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowObservations(false)}
                className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveObservations}
                className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
