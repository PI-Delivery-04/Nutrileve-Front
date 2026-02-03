// src/components/CartDrawer.tsx

import { useState } from "react";
import { UseCart } from "../../contexts/CartContext";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { CartItemComponent } from "./CartItem";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, totalItems, totalPrice, clearCart } = UseCart();
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate(); // Se usar React Router

  const handleClearCart = () => {
    if (window.confirm("Deseja realmente limpar o carrinho?")) {
      setIsClearing(true);
      clearCart();
      setTimeout(() => setIsClearing(false), 300);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay (fundo escuro) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-white z-50
          transform transition-transform duration-300 ease-in-out
          flex flex-col shadow-2xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header do Drawer */}
        <div className="flex items-center justify-between p-4 border-b bg-linear-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-bold">Seu Carrinho</h2>
              <p className="text-sm text-green-100">
                {totalItems} {totalItems === 1 ? "item" : "itens"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Seu carrinho está vazio</p>
              <p className="text-sm">Adicione pratos incriveis!</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItemComponent key={item.product.id} item={item} />
              ))}

              {/* Botão Limpar Carrinho */}
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="w-full flex items-center justify-center gap-2 p-3 text-red-600 
                         hover:bg-red-50 rounded-lg transition-colors border border-red-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Limpar Carrinho</span>
              </button>
            </>
          )}
        </div>

        {/* Footer - Resumo e Checkout */}
        {items.length > 0 && (
          <div className="border-t bg-gray-50 p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            {/* Taxa de entrega (exemplo) */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de entrega</span>
              <span className="font-medium text-emerald-600">Grátis</span>
            </div>

            {/* Divider */}
            <div className="border-t pt-2" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-emerald-600">
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            {/* Botão Finalizar Pedido */}
            <button
              onClick={handleCheckout}
              className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 text-white 
                       py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-emerald-700 
                       transition-all transform hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-xl"
            >
              Finalizar Pedido
            </button>

            {/* Informação extra */}
            <p className="text-xs text-center text-gray-500">
              Entrega estimada: 30-45 min
            </p>
          </div>
        )}
      </div>
    </>
  );
};
