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

        image: encomenda.foto ?? 'https://placehold.co/600x400',
        protein: encomenda.proteina,
        carbs: encomenda.carboidrato,
        fat: encomenda.gordura,

        available: true,
        dietType: [],
        tags: []
    };
}


export function productToEncomenda(
    product: Product
): EncomendaDTO {
    return {
        id: product.id,
        nome: product.name,
        ingredientes: product.description,
        caloria: product.calories,
        preco: product.price,
        avaliacao: product.rating ?? 0,
        data: new Date().toISOString().split('T')[0],

        foto: product.image,
        proteina: product.protein,
        carboidrato: product.carbs,
        gordura: product.fat,

        categoria: {
            id: product.category.id,
            nome: product.category.name
        }
        //usuario: { id: usuarioId, nome: usuarioName }
    }
}
