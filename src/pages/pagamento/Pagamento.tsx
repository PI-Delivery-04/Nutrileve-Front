// src/pages/checkout/Checkout.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCart } from "../../contexts/CartContext";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { toastSucesso } from "../../utils/toast";

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = UseCart();

  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      return;
    }

    setLoading(true);

    // Simular processamento
    setTimeout(() => {
      toastSucesso("Pedido realizado com sucesso! 🎉");
      clearCart();
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  if (items.length === 0) {
    navigate("/produtos");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-2xl mx-auto px-4">
        {/* Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Finalizar Pedido
        </h1>

        {/* Card Principal */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          {/* Resumo dos Items */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4">Seu Pedido</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-emerald-600">
                    {(item.product.price * item.quantity).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      },
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl font-bold text-emerald-600">
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handlePagar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual seu nome?
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         text-lg"
                required
              />
            </div>

            {/* Botão Pagar */}
            <Button
              type="submit"
              disabled={loading || !nome.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white 
                       py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Pagar{" "}
                  {totalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            🚚 Entrega em 30-45 minutos
          </p>
        </div>
      </div>
    </div>
  );
};
