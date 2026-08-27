import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TransacaoHttpService} from './transacao.http.service';
import {TransacaoRequest, TransacaoResponse} from '../models/transacao.model';
import {CategoriasService} from '../categorias/categoria.http.service';
import {CategoriaResponse} from '../models/categorias.model';

@Component({
    selector: 'app-transacoes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: 'transacoes.component.html',
    styleUrls: ['transacoes.component.css']
})
export class TransacoesComponent implements OnInit {
    transacoes: TransacaoResponse[] = [];
    categorias: CategoriaResponse[] = [];
    editandoId: number | null = null;
    form: TransacaoRequest = {descricao: '', valor: 0, tipo: 'DESPESA', data: '', categoriaId: 0};

    constructor(
        private transacaoService: TransacaoHttpService,
        private categoriaService: CategoriasService
    ) {}

    ngOnInit(): void {
        this.carregarTransacoes();
        this.carregarCategorias();
    }

    carregarTransacoes(): void {
        this.transacaoService.listar().subscribe(
            (dados: TransacaoResponse[]) => this.transacoes = dados
        );
    }

    carregarCategorias(): void {
        this.categoriaService.listar().subscribe(
            (dados: CategoriaResponse[]) => this.categorias = dados
        );
    }

    salvar(): void {
        if (this.editandoId) {
            this.transacaoService.atualizar(this.editandoId, this.form).subscribe(() => {
                this.carregarTransacoes();
                this.limparForm();
            });
        } else {
            this.transacaoService.criar(this.form).subscribe(() => {
                this.carregarTransacoes();
                this.limparForm();
            });
        }
    }

    editar(t: TransacaoResponse): void {
        this.editandoId = t.id;
        this.form = {
            descricao: t.descricao,
            valor: t.valor,
            tipo: t.tipo,
            data: t.data,
            categoriaId: t.categoriaId
        };
    }

    excluir(id: number): void {
        this.transacaoService.excluir(id).subscribe(() =>
            this.carregarTransacoes());
    }

    limparForm(): void {
        this.editandoId = null;
        this.form = {descricao: '', valor: 0, tipo: 'DESPESA', data: '', categoriaId: 0};
    }
}
