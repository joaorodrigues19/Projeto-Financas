package com.financas.transacao;

import com.financas.categoria.TipoCategoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransacaoRequest(
        @NotBlank String descricao,
        @NotNull @Positive BigDecimal valor,
        @NotNull TipoCategoria tipo,
        @NotNull LocalDate data,
        @NotNull Long categoriaId
) {}
