export interface CategoriaRequest {
    nome: string;
    tipo?: 'RECEITA' | 'DESPESA';
    cor?: string;
    icone?:string;
}
export interface CategoriaResponse {
    id: number;
    nome: string;
    tipo: 'RECEITA' | 'DESPESA';
    cor?: string;
    icone?: string;
}