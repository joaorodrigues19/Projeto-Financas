public record CategoriaRequest (
        @NotBlank String nome,
        @NotNull TipoCategoria tipo,
        String cor,
        String icone
){}