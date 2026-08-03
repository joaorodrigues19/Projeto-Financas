@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public List<CategoriaResponse> listar(@AuthenticationPrincipal Usuario usuario) {
        return categoriaService.listaPorUsuario(usuario.getId());
    }

    @PostMapping
    public ResponseEntity<CategoriaResponse> criar(
            @RequestBody @Valid CategoriaRequest request,
            @AuthenticationPrincipal Usuario usuario) {
        var categoria = categoriaService.criar(request, usuario.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }
}

   @PostMapping("/{id}")
public ResponseEntity<CategoriaResponse> atualizar(
        @PostVariable Long id,
        @ResquestBory @Valid CategoriaRequest request,
        @AuthenticationPrincipal Usuario usuario){
    var categoria = categoriaService.atualizar(id,request,usuario.getId());
    return ResponseEntity.ok(categoria);
   }

   @DeleteMapping(/"{id}")
public ResponseEntity<Void> excluir(
        @PathVariable Long id,
        @AuthenticationPrincipal Usuario usuario)
    categoria.Service.excluir(id,usuario,getId());
    return ResponseEntity.Content().Build();

