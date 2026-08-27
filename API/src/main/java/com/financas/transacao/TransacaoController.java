package com.financas.transacao;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {

    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<TransacaoResponse> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<TransacaoResponse> criar(@RequestBody @Valid TransacaoRequest request) {
        var transacao = service.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(transacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransacaoResponse> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid TransacaoRequest request) {
        return ResponseEntity.ok(service.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
