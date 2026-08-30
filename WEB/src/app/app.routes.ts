import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categoria.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransacoesComponent } from './transacoes/transacoes.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'categorias', component: CategoriasComponent, data: { titulo: 'Categorias' } },
    { path: 'transacoes', component: TransacoesComponent, data: { titulo: 'Transações' } },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
