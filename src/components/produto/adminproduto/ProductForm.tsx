import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Category } from '../../../models/Category';
import { getAllCategories } from '../../../services/apiProduto';
import { Product } from '../../../models/Product';
import { AuthContext } from '../../../contexts/AuthContext';


interface ProductFormProps {
    product?: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

export function ProductForm({ product, isOpen, onClose, onSave }: ProductFormProps) {

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        image: '',
        category: { id: 0, name: '' },
        dietType: [],
        available: true,
        restaurant: null
    });

    const [selectedDietTypes, setSelectedDietTypes] = useState<string[]>([]);

    useEffect(() => {
        if (product) {
            setFormData(product);
            setSelectedDietTypes(product.dietType || []);
        } else {
            setFormData({
                name: '',
                description: '',
                price: 0,
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                image: '',
                category: { id: 0, name: '' },
                dietType: [],
                available: true,
                restaurant: null
            });
            setSelectedDietTypes([]);
        }
    }, [product]);

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories({
            headers: { Authorization: token }
        }).then(setCategories);
    }, []);


    const handleChange = (field: keyof Product, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, dietType: selectedDietTypes });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        {product ? 'Editar Produto' : 'Novo Produto'}
                    </DialogTitle>
                    <DialogDescription>
                        {product ? 'Atualize as informações do produto abaixo.' : 'Preencha os campos abaixo para criar um novo produto.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nome do Produto *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Ex: Bowl Energético Completo"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Descrição *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Descreva os ingredientes e características do produto"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Preço (R$) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="category">Categoria *</Label>
                                <Select
                                    value={formData.category?.id ? String(formData.category.id) : ''}
                                    onValueChange={(value) => {
                                        const category = categories.find(c => c.id === Number(value));
                                        if (category) {
                                            handleChange('category', category);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>


                            </div>
                        </div>

                        <div>
                            <Label htmlFor="image">URL da Imagem *</Label>
                            <Input
                                id="image"
                                type="url"
                                value={formData.image}
                                onChange={(e) => handleChange('image', e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                                required
                            />
                        </div>
                    </div>

                    {/* Nutritional Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Informações Nutricionais</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="calories">Calorias (kcal) *</Label>
                                <Input
                                    id="calories"
                                    type="number"
                                    min="0"
                                    value={formData.calories}
                                    onChange={(e) => handleChange('calories', parseInt(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="protein">Proteína (g) *</Label>
                                <Input
                                    id="protein"
                                    type="number"
                                    min="0"
                                    value={formData.protein}
                                    onChange={(e) => handleChange('protein', parseInt(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="carbs">Carboidratos (g) *</Label>
                                <Input
                                    id="carbs"
                                    type="number"
                                    min="0"
                                    value={formData.carbs}
                                    onChange={(e) => handleChange('carbs', parseInt(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="fat">Gorduras (g) *</Label>
                                <Input
                                    id="fat"
                                    type="number"
                                    min="0"
                                    value={formData.fat}
                                    onChange={(e) => handleChange('fat', parseInt(e.target.value))}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                            {product ? 'Atualizar Produto' : 'Criar Produto'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}