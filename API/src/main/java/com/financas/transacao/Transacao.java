package com.financas.transacao;

import com.financas.categoria.Categoria;
import com.financas.categoria.TipoCategoria;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transacoes")
@Getter
@Setter
@NoArgsConstructor
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    private TipoCategoria tipo;

    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
