package com.financas.categoria;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categorias")
@Getter
@Setter
@NoArgsConstructor
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoCategoria tipo;

    private String cor;

    private String icone;

    public Categoria(String nome, TipoCategoria tipo, String cor, String icone) {
        this.nome = nome;
        this.tipo = tipo;
        this.cor = cor;
        this.icone = icone;
    }
}
