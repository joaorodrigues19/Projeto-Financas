package com.financas.categoria;

public record CategoriaResponse(
        Long id,
        String nome,
        TipoCategoria tipo,
        String cor,
        String icone
) {
    public static CategoriaResponse fromEntity(Categoria categoria) {
        return new CategoriaResponse(
                categoria.getId(),
                categoria.getNome(),
                categoria.getTipo(),
                categoria.getCor(),
                categoria.getIcone()
        );
    }
}
