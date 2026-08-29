export interface MesResumo {
    mes: string;
    valor: number;
}

export interface CategoriaResumo {
    categoria: string;
    valor: number;
}

export interface DashboardResponse {
    saldo: number;
    totalReceitas: number;
    totalDespesas: number;
    receitasPorMes: MesResumo[];
    despesasPorMes: MesResumo[];
    despesasPorCategoria: CategoriaResumo[];
}
