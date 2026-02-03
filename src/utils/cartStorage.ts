import { CartItem } from "../models/Cart";

const CART_KEY = "nutrileve-cart";

export const cartStorage = {
  save: (items: CartItem[]): void => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
  },

  load: (): CartItem[] => {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
      return [];
    }
  },

  clear: (): void => {
    localStorage.removeItem(CART_KEY);
  },
};
