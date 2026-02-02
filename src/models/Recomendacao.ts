import { EncomendaDTO } from "./EncomendaDTO";

export interface RecomendacaoCategoria {
    categoriaId: number;
    categoriaNome: string;
    encomendas: EncomendaDTO[];
}