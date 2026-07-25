import {Component, OnInit} from '@angular/core';
import {CategoriaService} from './categoria.service';
import {CategoriaResponse} from "../models/categorias.model";

@Component({
    selector: 'app-categoria',
    templateUrl: 'categorias.service.html',
    styleUrls: ['categorias.service.css']
})
export class CategoriasComponent implements OnInit {
    categorias: CategoriaResponse[] = [];

    constructor(private categoriaService: CategoriaService) {}

    ngOnInit(): void {
        this.categoriaService.listar().subscribe(dados =>
            this.categorias = dados);
    }
}

