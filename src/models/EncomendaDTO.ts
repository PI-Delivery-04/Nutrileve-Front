export interface CategoriaDTO {
    id: number
    nome: string | undefined
}

export interface UsuarioDTO {
    id: number
    nome: string | undefined
}

export interface EncomendaDTO {
    id?: number
    nome: string
    ingredientes: string
    caloria: number
    preco: number
    avaliacao: number
    data: string

    foto: string
    proteina: number
    carboidrato: number
    gordura: number

    categoria?: CategoriaDTO | undefined
    usuario?: UsuarioDTO | undefined
}
