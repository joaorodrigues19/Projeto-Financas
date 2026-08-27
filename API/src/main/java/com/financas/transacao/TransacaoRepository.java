package com.financas.transacao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    List<Transacao> findByTipo(com.financas.categoria.TipoCategoria tipo);
}
