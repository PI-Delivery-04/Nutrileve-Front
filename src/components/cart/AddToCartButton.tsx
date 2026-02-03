import { Product } from "../../models/Product";
import { UseCart } from "../../contexts/CartContext";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  variant?: "default" | "icon" | "full";
}

export const AddToCartButton = ({
  product,
  variant = "default",
}: AddToCartButtonProps) => {
  const { addToCart, items } = UseCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cartItem = items.find((item) => item.product.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart(product, quantity);

    // Exibir mensagem de sucesso por 2 segundos
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    setQuantity(1);
  };

  if (variant === "default") {
    return (
      <div className="flex flex-col gap-2">
        {/* Contador de quantidade */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-8 w-8"
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="text-lg font-semibold w-8 text-center">
            {quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="h-8 w-8"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Botão de adicionar ao carrinho */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {showSuccess ? (
            <>
              <Check className="w-4 h-4 mr-2 " />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>

        {isInCart && (
          <p className="text-xs text-center text-emerald-600">
            {cartItem.quantity}{" "}
            {cartItem.quantity === 1 ? "unidade" : "unidades"} no carrinho
          </p>
        )}
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <Button
        onClick={() => addToCart(product, 1)}
        size="icon"
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        {showSuccess ? (
          <Check className="w-4 h-4" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
      </Button>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      {/* Contador */}
      <div className="flex items-center gap-2 border rounded-lg p-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="text-lg font-semibold min-w-10 text-center">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Botão grande */}
      <Button
        onClick={handleAddToCart}
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg"
      >
        {showSuccess ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Adicionado ao Carrinho!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Adicionar por{" "}
            {(product.price * quantity).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </>
        )}
      </Button>
    </div>
  );
};
