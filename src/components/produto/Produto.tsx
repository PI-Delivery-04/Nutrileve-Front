import { useState, useEffect } from 'react';
import { Flame, Heart, Leaf, Plus, Star, Edit, Trash2, Search, Filter, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../../assets/imgfallback/ImageWithFallback';
import { ProductForm } from './adminproduto/ProductForm';
import { DeleteConfirmDialog } from './adminproduto/DeleteConfirmDialog';
import { toast } from 'sonner';
import * as api from '../../services/apiProduto';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { toastSucesso } from '../../utils/toast';

export function Produto() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form & Dialogs
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('available'); // Só mostrar disponíveis por padrão
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, categoryFilter, availabilityFilter]);


  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAllProducts();

      if (data.length === 0) {
        // setProducts(mockProducts);
      } else {
        setProducts(data);
      }
    } catch {
      // setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await api.getAllCategories();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  };


  const applyFilters = () => {
    let filtered = [...products];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(
        product => product.category?.id === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      if (product.id) {
        const updated = await api.updateProduct(product);
        setProducts(prev => prev.map(p => p.id === product.id ? updated : p));
        toastSucesso('Produto atualizado com sucesso!');
      } else {
        const created = await api.createProduct(product);
        setProducts(prev => [...prev, created]);
        toastSucesso('Produto criado com sucesso!');
      }
      setIsFormOpen(false);
    } catch (error) {
      if (product.id) {
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
        toastSucesso('Produto atualizado (modo offline)');
      } else {
        const newProduct = { ...product, id: Date.now() };
        setProducts(prev => [...prev, newProduct]);
        toastSucesso('Produto criado (modo offline)');
      }
      setIsFormOpen(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete?.id) return;

    try {
      await api.deleteProduct(productToDelete.id);
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      toastSucesso('Produto excluído com sucesso!');
    } catch (error) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      toastSucesso('Produto excluído (modo offline)');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setAvailabilityFilter('available');
  };

  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto p-8">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Nosso Cardápio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Escolha Sua Refeição Ideal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Todas as opções incluem informações nutricionais completas para você fazer escolhas conscientes
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="gap-2 hover:cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
            <Button
              onClick={loadProducts}
              variant="outline"
              disabled={isLoading}
              className="gap-2 hover:cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button
              onClick={handleCreateProduct}
              className="bg-emerald-600 hover:bg-emerald-700 gap-2 hover:cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-gray-900">Filtros Avançados</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={String(categoryFilter)}
                  onValueChange={(value) =>
                    setCategoryFilter(value === 'all' ? 'all' : Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>

                    {categories.length === 0 ? (
                      <SelectItem value="empty" disabled>
                        Nenhuma categoria cadastrada
                      </SelectItem>
                    ) : (
                      categories.map(category => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>


                {/* Availability Filter */}
                {/* <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Disponibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="available">Disponíveis</SelectItem>
                    <SelectItem value="unavailable">Indisponíveis</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-gray-600">
                Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> produtos
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Carregando produtos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600 mb-4">Nenhum produto encontrado com os filtros aplicados.</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className='hover:cursor-pointer'
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top Right Actions */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`bg-white/90 hover:bg-white backdrop-blur-sm hover:cursor-pointer ${favorites.includes(product.id || 0) ? 'text-red-500' : 'text-gray-600'
                        }`}
                      onClick={() => toggleFavorite(product.id || 0)}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(product.id || 0) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Admin Actions - Top Left */}
                  <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/90 hover:bg-emerald-50 hover:text-emerald-600 backdrop-blur-sm hover:cursor-pointer"
                      onClick={(e) => handleEditProduct(product, e)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/90 hover:bg-red-50 hover:text-red-600 backdrop-blur-sm hover:cursor-pointer"
                      onClick={(e) => handleDeleteClick(product, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Bottom Left - Tags & Status */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {!product.available && (
                      <Badge className="bg-red-600 hover:bg-red-600 gap-1">
                        <EyeOff className="w-3 h-3" />
                        Indisponível
                      </Badge>
                    )}
                    {product.tags && product.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} className="bg-emerald-600 hover:bg-emerald-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                    {/* {product.rating && ( */}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    </div>
                    {/* )} */}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  {/* Diet Types */}
                  {/* {product.dietType.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.dietType.map(diet => (
                        <Badge key={diet} variant="outline" className="text-xs">
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  )} */}

                  {/* Nutritional Info */}
                  <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-gray-900">{product.calories}</p>
                      <p className="text-xs text-gray-600">kcal</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-900">{product.protein}g</p>
                      <p className="text-xs text-gray-600">Prot.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-900">{product.carbs}g</p>
                      <p className="text-xs text-gray-600">Carb.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-900">{product.fat}g</p>
                      <p className="text-xs text-gray-600">Gord.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer"
                      disabled={!product.available}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={selectedProduct}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        productName={productToDelete?.name || ''}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteProduct}
      />
    </section>
  );
}
