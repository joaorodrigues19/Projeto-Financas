package com.financas.transacao;

import com.financas.categoria.TipoCategoria;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransacaoResponse(
        Long id,
        String descricao,
        BigDecimal valor,
        TipoCategoria tipo,
        LocalDate data,
        Long categoriaId,
        String categoriaNome
) {
    public static TransacaoResponse fromEntity(Transacao transacao) {
        return new TransacaoResponse(
                transacao.getId(),
                transacao.getDescricao(),
                transacao.getValor(),
                transacao.getTipo(),
                transacao.getData(),
                transacao.getCategoria().getId(),
                transacao.getCategoria().getNome()
        );
    }
}
