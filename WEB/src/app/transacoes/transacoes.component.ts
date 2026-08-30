import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
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
    mensagem: string = '';
    mensagemTipo: 'sucesso' | 'erro' = 'sucesso';
    confirmarExclusaoId: number | null = null;

    constructor(
        private transacaoService: TransacaoHttpService,
        private categoriaService: CategoriasService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.carregarTransacoes();
        this.carregarCategorias();
    }

    carregarTransacoes(): void {
        this.transacaoService.listar().subscribe(
            (dados: TransacaoResponse[]) => {
                this.transacoes = dados;
                this.cdr.markForCheck();
            }
        );
    }

    carregarCategorias(): void {
        this.categoriaService.listar().subscribe(
            (dados: CategoriaResponse[]) => {
                this.categorias = dados;
                this.cdr.markForCheck();
            }
        );
    }

    salvar(): void {
        if (this.editandoId) {
            this.transacaoService.atualizar(this.editandoId, this.form).subscribe({
                next: () => {
                    this.mostrarMensagem('Transação atualizada com sucesso', 'sucesso');
                    this.carregarTransacoes();
                    this.limparForm();
                },
                error: () => this.mostrarMensagem('Erro ao atualizar transação', 'erro')
            });
        } else {
            this.transacaoService.criar(this.form).subscribe({
                next: () => {
                    this.mostrarMensagem('Transação criada com sucesso', 'sucesso');
                    this.carregarTransacoes();
                    this.limparForm();
                },
                error: () => this.mostrarMensagem('Erro ao criar transação', 'erro')
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

    pedirConfirmacao(id: number): void {
        this.confirmarExclusaoId = id;
    }

    cancelarExclusao(): void {
        this.confirmarExclusaoId = null;
    }

    confirmarExclusao(): void {
        if (this.confirmarExclusaoId) {
            this.transacaoService.excluir(this.confirmarExclusaoId).subscribe({
                next: () => {
                    this.mostrarMensagem('Transação excluída com sucesso', 'sucesso');
                    this.carregarTransacoes();
                    this.confirmarExclusaoId = null;
                },
                error: () => {
                    this.mostrarMensagem('Erro ao excluir transação', 'erro');
                    this.confirmarExclusaoId = null;
                }
            });
        }
    }

    limparForm(): void {
        this.editandoId = null;
        this.form = {descricao: '', valor: 0, tipo: 'DESPESA', data: '', categoriaId: 0};
    }

    mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
        this.mensagem = texto;
        this.mensagemTipo = tipo;
        this.cdr.markForCheck();
        setTimeout(() => {
            this.mensagem = '';
            this.cdr.markForCheck();
        }, 3000);
    }
}
