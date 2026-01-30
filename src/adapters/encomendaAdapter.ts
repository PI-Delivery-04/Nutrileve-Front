import { EncomendaDTO } from '../models/EncomendaDTO'
import { Product } from '../models/Product'

export function encomendaToProduct(encomenda: EncomendaDTO): Product {
    return {
        id: encomenda.id,
        name: encomenda.nome,
        description: encomenda.ingredientes,
        calories: Number(encomenda.caloria),
        price: Number(encomenda.preco),
        rating: encomenda.avaliacao,

        category: {
            id: encomenda.categoria?.id ?? 0,
            name: encomenda.categoria?.nome ?? 'Sem categoria'
        },

        image: 'https://placehold.co/600x400',
        available: true,

        protein: 0,
        carbs: 0,
        fat: 0,
        dietType: [],
        tags: []
    };
}


export function productToEncomenda(
    product: Product,
    usuarioId: number,
    usuarioName: string
): EncomendaDTO {
    return {
        id: product.id,
        nome: product.name,
        ingredientes: product.description,
        caloria: product.calories,
        preco: product.price,
        avaliacao: product.rating ?? 0,
        data: new Date().toISOString().split('T')[0],

        categoria: {
            id: product.category.id,
            nome: product.category.name
        },
        usuario: { id: usuarioId, nome: usuarioName }
    }
}
