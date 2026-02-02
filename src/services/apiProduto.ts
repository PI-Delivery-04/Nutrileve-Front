import { api } from './api';
import { EncomendaDTO } from '../models/EncomendaDTO';
import { Product } from '../models/Product';
import { encomendaToProduct, productToEncomenda } from '../adapters/encomendaAdapter';
import { Category } from '../models/Category';
import { RecomendacaoCategoria } from '../models/Recomendacao';

// GET - Todos os produtos
export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<EncomendaDTO[]>('/encomendas');
    return response.data.map(encomendaToProduct);
};

export const createProduct = async (
    product: Product
): Promise<Product> => {

    const encomenda = productToEncomenda(
        product
    );
    console.log(encomenda)
    const response = await api.post<EncomendaDTO>('/encomendas', encomenda);
    return encomendaToProduct(response.data);
};

export const updateProduct = async (
    product: Product
): Promise<Product> => {

    const encomenda = productToEncomenda(
        product
    );
    console.log(encomenda)
    const response = await api.put<EncomendaDTO>(
        `/encomendas`,
        encomenda
    );

    return encomendaToProduct(response.data);
};

// GET - Produto por ID
export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/encomendas/${id}`);
    return response.data;
};

// DELETE - Deletar produto
export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/encomendas/${id}`);
};

// GET - Produtos por categoria
export const getProductsByCategory = async (
    category: string
): Promise<Product[]> => {
    const response = await api.get<Product[]>(
        `/categoria/descricao/${category}`
    );
    return response.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categoria');
    return response.data.map((c: any) => ({
        id: c.id,
        name: c.nome
    }));
};

// GET - Buscar recomendações (top 3 encomendas com menos calorias por categoria)
export const getRecomendacoes = async (): Promise<RecomendacaoCategoria[]> => {
    try {
        const response = await api.get<RecomendacaoCategoria[]>('/recomendacao');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
        throw error;
    }
};


