import { useState } from 'react';
import { Flame, Star, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../../assets/imgfallback/ImageWithFallback';

interface MealItem {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  rating: number;
  image: string;
  tags: string[];
  prepTime: string;
  ingredients: string[];
}

const meals: MealItem[] = [
  {
    id: 1,
    name: 'Bowl Energético Completo',
    description: 'Quinoa, grão-de-bico, abacate, tomate cereja e molho tahine',
    calories: 450,
    protein: 18,
    carbs: 52,
    fat: 15,
    price: 32.90,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1640718153995-db4d3f0a6337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMHNhbGFkfGVufDF8fHx8MTc2OTQzMDc2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Vegano', 'Rico em Fibras'],
    prepTime: '35-45 min',
    ingredients: ['Quinoa tricolor', 'Grão-de-bico', 'Abacate', 'Tomate cereja', 'Molho tahine', 'Mix de folhas']
  },
  {
    id: 2,
    name: 'Frango Grelhado & Legumes',
    description: 'Peito de frango grelhado, brócolis, cenoura e batata doce',
    calories: 520,
    protein: 45,
    carbs: 38,
    fat: 12,
    price: 36.90,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzY5Mzk1MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Alto em Proteína', 'Low Carb'],
    prepTime: '30-40 min',
    ingredients: ['Peito de frango', 'Brócolis', 'Cenoura', 'Batata doce', 'Azeite', 'Temperos naturais']
  },
  {
    id: 3,
    name: 'Salmão com Abacate',
    description: 'Salmão grelhado, abacate, aspargos e arroz integral',
    calories: 580,
    protein: 38,
    carbs: 42,
    fat: 24,
    price: 44.90,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBhdm9jYWRvJTIwYm93bHxlbnwxfHx8fDE3Njk0MzA3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Premium', 'Ômega 3'],
    prepTime: '35-45 min',
    ingredients: ['Salmão fresco', 'Abacate', 'Aspargos', 'Arroz integral', 'Limão siciliano', 'Gergelim']
  },
  {
    id: 4,
    name: 'Buddha Bowl Vegano',
    description: 'Mix de grãos, hummus, falafel, vegetais assados e tahine',
    calories: 480,
    protein: 16,
    carbs: 58,
    fat: 18,
    price: 34.90,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1675092789086-4bd2b93ffc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGJ1ZGRoYSUyMGJvd2x8ZW58MXx8fHwxNzY5NDMwNzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Vegano', 'Sem Glúten'],
    prepTime: '40-50 min',
    ingredients: ['Mix de grãos', 'Hummus', 'Falafel', 'Cenoura', 'Beterraba', 'Couve', 'Tahine']
  },
  {
    id: 5,
    name: 'Power Bowl de Quinoa',
    description: 'Quinoa tricolor, edamame, manga, pepino e gergelim',
    calories: 420,
    protein: 14,
    carbs: 56,
    fat: 13,
    price: 29.90,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBoZWFsdGh5JTIwbWVhbHxlbnwxfHx8fDE3Njk0MzA3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Leve', 'Refrescante'],
    prepTime: '30-40 min',
    ingredients: ['Quinoa tricolor', 'Edamame', 'Manga', 'Pepino', 'Repolho roxo', 'Gergelim', 'Molho agridoce']
  },
  {
    id: 6,
    name: 'Bowl Mediterrâneo',
    description: 'Frango, couscous, tomate, pepino, azeitonas e feta',
    calories: 495,
    protein: 32,
    carbs: 44,
    fat: 16,
    price: 37.90,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1640718153995-db4d3f0a6337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMHNhbGFkfGVufDF8fHx8MTc2OTQzMDc2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Equilibrado'],
    prepTime: '35-45 min',
    ingredients: ['Frango grelhado', 'Couscous marroquino', 'Tomate', 'Pepino', 'Azeitonas', 'Queijo feta', 'Azeite']
  }
];

export function Produto() {
  const [selectedProduct, setSelectedProduct] = useState<MealItem | null>(null);

  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Refeições Saudáveis
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map(meal => (
              <Card
                key={meal.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProduct(meal)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {meal.tags.slice(0, 1).map(tag => (
                      <Badge key={tag} className="bg-white text-gray-900 hover:bg-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {meal.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{meal.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span>{meal.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{meal.prepTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                      R$ {meal.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )} */}
    </>
  );
}
