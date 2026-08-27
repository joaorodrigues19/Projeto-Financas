package com.financas.categoria;

import jakarta.persistence.*;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoCategoria tipo;

    private String cor;

    private String icone;

    public Categoria() {}

    public Categoria(String nome, TipoCategoria tipo, String cor, String icone) {
        this.nome = nome;
        this.tipo = tipo;
        this.cor = cor;
        this.icone = icone;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public TipoCategoria getTipo() { return tipo; }
    public void setTipo(TipoCategoria tipo) { this.tipo = tipo; }

    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }

    public String getIcone() { return icone; }
    public void setIcone(String icone) { this.icone = icone; }
}
