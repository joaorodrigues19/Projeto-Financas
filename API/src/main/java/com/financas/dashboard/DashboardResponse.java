package com.financas.dashboard;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponse(
        BigDecimal saldo,
        BigDecimal totalReceitas,
        BigDecimal totalDespesas,
        List<MesResumo> receitasPorMes,
        List<MesResumo> despesasPorMes,
        List<CategoriaResumo> despesasPorCategoria
) {
    public record MesResumo(String mes, BigDecimal valor) {}
    public record CategoriaResumo(String categoria, BigDecimal valor) {}
}
