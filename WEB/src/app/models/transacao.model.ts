export interface TransacaoRequest {
    descricao: string;
    valor: number;
    tipo: 'RECEITA' | 'DESPESA';
    data: string;
    categoriaId: number;
}

export interface TransacaoResponse {
    id: number;
    descricao: string;
    valor: number;
    tipo: 'RECEITA' | 'DESPESA';
    data: string;
    categoriaId: number;
    categoriaNome: string;
}
