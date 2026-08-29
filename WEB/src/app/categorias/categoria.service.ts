import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoriasService} from './categoria.http.service';
import {CategoriaResponse, CategoriaRequest} from '../models/categorias.model';

@Component({
    selector: 'app-categoria',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: 'categoria.service.html',
    styleUrls: ['categoria.service.css']
})
export class CategoriasComponent implements OnInit {
    categorias: CategoriaResponse[] = [];
    editandoId: number | null = null;
    form: CategoriaRequest = {nome: '', tipo: 'DESPESA', cor: '#000000', icone: ''};
    mensagem: string = '';
    mensagemTipo: 'sucesso' | 'erro' = 'sucesso';
    confirmarExclusaoId: number | null = null;

    constructor(private categoriaService: CategoriasService) {}

    ngOnInit(): void {
        this.carregarCategorias();
    }

    carregarCategorias(): void {
        this.categoriaService.listar().subscribe(
            (dados: CategoriaResponse[]) => this.categorias = dados
        );
    }

    salvar(): void {
        if (this.editandoId) {
            this.categoriaService.atualizar(this.editandoId, this.form).subscribe({
                next: () => {
                    this.mostrarMensagem('Categoria atualizada com sucesso', 'sucesso');
                    this.carregarCategorias();
                    this.limparForm();
                },
                error: () => this.mostrarMensagem('Erro ao atualizar categoria', 'erro')
            });
        } else {
            this.categoriaService.criar(this.form).subscribe({
                next: () => {
                    this.mostrarMensagem('Categoria criada com sucesso', 'sucesso');
                    this.carregarCategorias();
                    this.limparForm();
                },
                error: () => this.mostrarMensagem('Erro ao criar categoria', 'erro')
            });
        }
    }

    editar(cat: CategoriaResponse): void {
        this.editandoId = cat.id;
        this.form = {nome: cat.nome, tipo: cat.tipo, cor: cat.cor, icone: cat.icone};
    }

    pedirConfirmacao(id: number): void {
        this.confirmarExclusaoId = id;
    }

    cancelarExclusao(): void {
        this.confirmarExclusaoId = null;
    }

    confirmarExclusao(): void {
        if (this.confirmarExclusaoId) {
            this.categoriaService.excluir(this.confirmarExclusaoId).subscribe({
                next: () => {
                    this.mostrarMensagem('Categoria excluída com sucesso', 'sucesso');
                    this.carregarCategorias();
                    this.confirmarExclusaoId = null;
                },
                error: () => {
                    this.mostrarMensagem('Erro ao excluir categoria', 'erro');
                    this.confirmarExclusaoId = null;
                }
            });
        }
    }

    limparForm(): void {
        this.editandoId = null;
        this.form = {nome: '', tipo: 'DESPESA', cor: '#000000', icone: ''};
    }

    mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
        this.mensagem = texto;
        this.mensagemTipo = tipo;
        setTimeout(() => this.mensagem = '', 3000);
    }
}
