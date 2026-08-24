import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {CategoriaRequest,CategoriaResponse} from "../models/categorias.model";
import {Observable} from 'rxjs'
@Injectable({providedIn: 'root'})
export class CategoriasService {
    constructor(private http: HttpClient) {
    }

    listar(): Observable<CategoriaResponse[]> {
        return this.http.get<CategoriaResponse[]>('/api/categorias');
    }


    criar(request: CategoriaRequest): Observable<CategoriaResponse> {
        return this.http.post<CategoriaResponse>('/api/categorias', request);
    }


    atualizar(id: number, request: CategoriaRequest): Observable<CategoriaResponse> {
        return this.http.put<CategoriaResponse>(`/api/categorias/${id}`, request);
    }


    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`/api/categorias/${id}`);
    }
  }