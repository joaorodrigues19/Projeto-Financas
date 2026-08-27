package com.financas.transacao;

import com.financas.categoria.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransacaoService {

    private final TransacaoRepository repository;
    private final CategoriaRepository categoriaRepository;

    public TransacaoService(TransacaoRepository repository, CategoriaRepository categoriaRepository) {
        this.repository = repository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<TransacaoResponse> listar() {
        return repository.findAll()
                .stream()
                .map(TransacaoResponse::fromEntity)
                .toList();
    }

    public TransacaoResponse criar(TransacaoRequest request) {
        var categoria = categoriaRepository.findById(request.categoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        var transacao = new Transacao();
        transacao.setDescricao(request.descricao());
        transacao.setValor(request.valor());
        transacao.setTipo(request.tipo());
        transacao.setData(request.data());
        transacao.setCategoria(categoria);

        return TransacaoResponse.fromEntity(repository.save(transacao));
    }

    public TransacaoResponse atualizar(Long id, TransacaoRequest request) {
        var transacao = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        var categoria = categoriaRepository.findById(request.categoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        transacao.setDescricao(request.descricao());
        transacao.setValor(request.valor());
        transacao.setTipo(request.tipo());
        transacao.setData(request.data());
        transacao.setCategoria(categoria);

        return TransacaoResponse.fromEntity(repository.save(transacao));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
