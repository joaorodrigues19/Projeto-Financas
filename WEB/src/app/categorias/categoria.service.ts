import {Component, OnInit} from '@angular/core';
import {CategoriaService} from './categoria.http.service';
import {CategoriaResponse, CategoriaRequest} from "../models/categorias.model";

@Component({
    selector: 'app-categoria',
    templateUrl: 'categoria.service.html',
    styleUrls: ['categoria.service.css']
})
export class CategoriasComponent implements OnInit {
    categorias: CategoriaResponse[] = [];
    editandoId: number | null = null;
    form: CategoriaRequest = {nome:'',tipo:'DESPESA', cor:'#000000',icone:''};

    constructor(private categoriaService: CategoriaService) {}

    ngOnInit(): void {
        this.carregarCategorias();

    }
    carregarCategorias(): void{
        this.categoriaService.listar().subscribe
        (dados => this.categorias = dados);
    }
    salvar(): void {
        if (this.editandoId) {
            this.categoriaService.atualizar(this.editandoId, this.form).subscribe(() => {
                this.carregarCategorias();
                this.limparForm();
            });
        } else {
            this.categoriaService.criar(this.form).subscribe(() => {
                this.carregarCategorias();
                this.limparForm();
            });
        }
    }

    editar(cat: CategoriaResponse): void {
        this.editandoId = cat.id;
        this.form = {nome: cat.nome, tipo: cat.tipo, cor:
            cat.cor, icone : cat.icone};

    }


excluir(id:number): void {
    this.categoriaService.excluir(id).subscribe(() =>
        this.carregarCategorias());
}

limparForm(): void {
    this.editandoId = null;
    this.form = {
        nome: '', tipo: 'DESPESA', cor: '#000000',
        icone: ''
    };
  }
}


