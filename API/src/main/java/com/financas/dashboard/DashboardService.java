package com.financas.dashboard;

import com.financas.categoria.TipoCategoria;
import com.financas.transacao.Transacao;
import com.financas.transacao.TransacaoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TransacaoRepository transacaoRepository;

    public DashboardService(TransacaoRepository transacaoRepository) {
        this.transacaoRepository = transacaoRepository;
    }

    public DashboardResponse getDashboard() {
        var transacoes = transacaoRepository.findAll();

        var totalReceitas = somarPorTipo(transacoes, TipoCategoria.RECEITA);
        var totalDespesas = somarPorTipo(transacoes, TipoCategoria.DESPESA);
        var saldo = totalReceitas.subtract(totalDespesas);

        var receitasPorMes = agruparPorMes(transacoes, TipoCategoria.RECEITA);
        var despesasPorMes = agruparPorMes(transacoes, TipoCategoria.DESPESA);
        var despesasPorCategoria = agruparPorCategoria(transacoes, TipoCategoria.DESPESA);

        return new DashboardResponse(saldo, totalReceitas, totalDespesas, receitasPorMes, despesasPorMes, despesasPorCategoria);
    }

    private BigDecimal somarPorTipo(List<Transacao> transacoes, TipoCategoria tipo) {
        return transacoes.stream()
                .filter(t -> t.getTipo() == tipo)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private List<DashboardResponse.MesResumo> agruparPorMes(List<Transacao> transacoes, TipoCategoria tipo) {
        return transacoes.stream()
                .filter(t -> t.getTipo() == tipo)
                .collect(Collectors.groupingBy(
                        t -> t.getData().getMonth().getDisplayName(TextStyle.SHORT, new Locale("pt", "BR")),
                        LinkedHashMap::new,
                        Collectors.reducing(BigDecimal.ZERO, Transacao::getValor, BigDecimal::add)
                ))
                .entrySet().stream()
                .map(e -> new DashboardResponse.MesResumo(e.getKey(), e.getValue()))
                .toList();
    }

    private List<DashboardResponse.CategoriaResumo> agruparPorCategoria(List<Transacao> transacoes, TipoCategoria tipo) {
        return transacoes.stream()
                .filter(t -> t.getTipo() == tipo)
                .collect(Collectors.groupingBy(
                        t -> t.getCategoria().getNome(),
                        Collectors.reducing(BigDecimal.ZERO, Transacao::getValor, BigDecimal::add)
                ))
                .entrySet().stream()
                .map(e -> new DashboardResponse.CategoriaResumo(e.getKey(), e.getValue()))
                .toList();
    }
}
