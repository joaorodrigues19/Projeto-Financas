import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categoria.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransacoesComponent } from './transacoes/transacoes.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'transacoes', component: TransacoesComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
