import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DashboardResponse} from '../models/dashboard.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DashboardHttpService {

    constructor(private http: HttpClient) {}

    getDashboard(): Observable<DashboardResponse> {
        return this.http.get<DashboardResponse>('/api/dashboard');
    }
}
