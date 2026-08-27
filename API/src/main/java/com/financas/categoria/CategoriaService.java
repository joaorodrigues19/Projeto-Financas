package com.financas.categoria;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<CategoriaResponse> listar() {
        return repository.findAll()
                .stream()
                .map(CategoriaResponse::fromEntity)
                .toList();
    }

    public CategoriaResponse criar(CategoriaRequest request) {
        var categoria = new Categoria(
                request.nome(),
                request.tipo(),
                request.cor(),
                request.icone()
        );
        return CategoriaResponse.fromEntity(repository.save(categoria));
    }

    public CategoriaResponse atualizar(Long id, CategoriaRequest request) {
        var categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        categoria.setNome(request.nome());
        categoria.setTipo(request.tipo());
        categoria.setCor(request.cor());
        categoria.setIcone(request.icone());
        return CategoriaResponse.fromEntity(repository.save(categoria));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
