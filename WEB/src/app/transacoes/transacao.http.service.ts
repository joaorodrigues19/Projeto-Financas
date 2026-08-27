import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TransacaoRequest, TransacaoResponse} from '../models/transacao.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TransacaoHttpService {

    constructor(private http: HttpClient) {}

    listar(): Observable<TransacaoResponse[]> {
        return this.http.get<TransacaoResponse[]>('/api/transacoes');
    }

    criar(request: TransacaoRequest): Observable<TransacaoResponse> {
        return this.http.post<TransacaoResponse>('/api/transacoes', request);
    }

    atualizar(id: number, request: TransacaoRequest): Observable<TransacaoResponse> {
        return this.http.put<TransacaoResponse>(`/api/transacoes/${id}`, request);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`/api/transacoes/${id}`);
    }
}
