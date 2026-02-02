import { api } from './api';
import { EncomendaDTO } from '../models/EncomendaDTO';
import { Product } from '../models/Product';
import { encomendaToProduct, productToEncomenda } from '../adapters/encomendaAdapter';
import { Category } from '../models/Category';
import { RecomendacaoCategoria } from '../models/Recomendacao';

// GET - Todos os produtos
export const getAllProducts = async (header: Object): Promise<Product[]> => {
    const response = await api.get<EncomendaDTO[]>('/encomendas', header);
    return response.data.map(encomendaToProduct);
};

export const createProduct = async (
    product: Product, header: Object
): Promise<Product> => {

    const encomenda = productToEncomenda(
        product
    );
    console.log(encomenda)
    const response = await api.post<EncomendaDTO>('/encomendas', encomenda, header);
    return encomendaToProduct(response.data);
};

export const updateProduct = async (
    product: Product, header: Object
): Promise<Product> => {

    const encomenda = productToEncomenda(
        product
    );
    console.log(encomenda)
    const response = await api.put<EncomendaDTO>(
        `/encomendas`,
        encomenda, header
    );

    return encomendaToProduct(response.data);
};

// GET - Produto por ID
export const getProductById = async (id: number, header: Object): Promise<Product> => {
    const response = await api.get<Product>(`/encomendas/${id}`, header);
    return response.data;
};

// DELETE - Deletar produto
export const deleteProduct = async (id: number, header: Object): Promise<void> => {
    await api.delete(`/encomendas/${id}`, header);
};

// GET - Produtos por categoria
export const getProductsByCategory = async (
    category: string, header: Object
): Promise<Product[]> => {
    const response = await api.get<Product[]>(
        `/categoria/descricao/${category}`,
        header
    );
    return response.data;
};

export const getAllCategories = async (header: Object): Promise<Category[]> => {
    const response = await api.get('/categoria', header);
    return response.data.map((c: any) => ({
        id: c.id,
        name: c.nome
    }));
};

// GET - Buscar recomendações (top 3 encomendas com menos calorias por categoria)
export const getRecomendacoes = async (header: Object): Promise<RecomendacaoCategoria[]> => {
    try {
        const response = await api.get<RecomendacaoCategoria[]>('/recomendacao', header);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
        throw error;
    }
};


