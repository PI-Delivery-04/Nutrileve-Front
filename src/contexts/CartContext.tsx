import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
  use,
} from "react";

import { CartItem } from "../models/Cart";
import { cartStorage } from "../utils/cartStorage";
import { Product } from "../models/Product";

// Definição do contexto do carrinho de compras
interface CartContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addToCart: (
    product: Product,
    quantity?: number,
    observations?: string,
  ) => void;
  removeFromCart: (produdctId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  updateObservations: (productId: string, observations: string) => void;
  clearCart: () => void;
}

// Criação do contexto
const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedItems = cartStorage.load();
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
  }, []);

  // salvar carrinho no storage sempre que houver mudanças
  useEffect(() => {
    cartStorage.save(items);
  }, [items]);

  //calculos de totais

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  //função para adicionar item ao carrinho
  const addToCart = (product: Product, quantity = 1, observations: "") => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id,
      );
      // caso o item já exista, apenas aumentar a quantidade
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { product, quantity, observations }];
    });
  };

  //função para remover item do carrinho
  const removeFromCart = (produdctId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== parseInt(produdctId)),
    );
  };

  // aumentar quantidade
  const increaseQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === parseInt(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  // diminuir quantidade
  const decreaseQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === parseInt(productId) && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // atualizar observações
  const updateObservations = (productId: string, observations: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === parseInt(productId)
          ? { ...item, observations }
          : item,
      ),
    );
  };

  // limpar carrinho
  const clearCart = () => {
    setItems(() => []);
    cartStorage.clear();
  };

  return (
    <CartContext.Provider //injetando valores e funções do contexto
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateObservations,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
