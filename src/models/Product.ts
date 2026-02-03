import { Category } from "./Category";

export interface Product {
  restaurant: null;
  id?: number;
  name: string;
  description: string;
  calories: number;
  price: number;
  rating?: number;

  image: string;
  category: Category;
  available: boolean;

  // Campos visuais (mock)
  dietType?: string[];
  tags?: string[];
  protein: number;
  carbs: number;
  fat: number;
}
