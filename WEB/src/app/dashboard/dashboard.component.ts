import {Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Chart, registerables} from 'chart.js';
import {DashboardHttpService} from './dashboard.http.service';
import {DashboardResponse} from '../models/dashboard.model';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
    saldo = 0;
    receitas = 0;
    despesas = 0;

    private graficoBarra: Chart | null = null;
    private graficoPizza: Chart | null = null;
    private graficoLinha: Chart | null = null;

    @ViewChild('graficoPizza') graficoPizzaRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('graficoLinha') graficoLinhaRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('graficoBarra') graficoBarraRef!: ElementRef<HTMLCanvasElement>;

    constructor(private dashboardService: DashboardHttpService, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.carregarDados();
    }

    carregarDados(): void {
        this.dashboardService.getDashboard().subscribe((dados: DashboardResponse) => {
            this.saldo = dados.saldo;
            this.receitas = dados.totalReceitas;
            this.despesas = dados.totalDespesas;
            this.cdr.markForCheck();
            this.criarGraficoBarra(dados);
            this.criarGraficoPizza(dados);
            this.criarGraficoLinha(dados);
        });
    }

    criarGraficoBarra(dados: DashboardResponse): void {
        if (this.graficoBarra) this.graficoBarra.destroy();

        const meses = [...new Set([
            ...dados.receitasPorMes.map(r => r.mes),
            ...dados.despesasPorMes.map(d => d.mes)
        ])];

        this.graficoBarra = new Chart(this.graficoBarraRef.nativeElement, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [
                    {
                        label: 'Receitas',
                        data: meses.map(m => dados.receitasPorMes.find(r => r.mes === m)?.valor ?? 0),
                        backgroundColor: '#1a237e'
                    },
                    {
                        label: 'Despesas',
                        data: meses.map(m => dados.despesasPorMes.find(d => d.mes === m)?.valor ?? 0),
                        backgroundColor: '#FF9800'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {position: 'bottom'}
                },
                scales: {
                    y: {beginAtZero: true}
                }
            }
        });
    }

    criarGraficoPizza(dados: DashboardResponse): void {
        if (this.graficoPizza) this.graficoPizza.destroy();

        const cores = ['#1a237e', '#FF9800', '#00bcd4', '#4CAF50', '#f44336', '#9C27B0', '#795548'];
        const total = dados.despesasPorCategoria.reduce((sum, c) => sum + c.valor, 0);
        const maiorCategoria = dados.despesasPorCategoria.length > 0
            ? Math.round((dados.despesasPorCategoria[0].valor / total) * 100)
            : 0;

        this.graficoPizza = new Chart(this.graficoPizzaRef.nativeElement, {
            type: 'doughnut',
            data: {
                labels: dados.despesasPorCategoria.map(c => c.categoria),
                datasets: [{
                    data: dados.despesasPorCategoria.map(c => c.valor),
                    backgroundColor: cores.slice(0, dados.despesasPorCategoria.length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {display: false}
                }
            },
            plugins: [{
                id: 'centerText',
                afterDraw(chart) {
                    const {ctx, width, height} = chart;
                    ctx.save();
                    ctx.font = 'bold 24px Segoe UI';
                    ctx.fillStyle = '#1a1a2e';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(maiorCategoria + '%', width / 2, height / 2);
                    ctx.restore();
                }
            }]
        });
    }

    criarGraficoLinha(dados: DashboardResponse): void {
        if (this.graficoLinha) this.graficoLinha.destroy();

        const meses = [...new Set([
            ...dados.receitasPorMes.map(r => r.mes),
            ...dados.despesasPorMes.map(d => d.mes)
        ])];

        this.graficoLinha = new Chart(this.graficoLinhaRef.nativeElement, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [
                    {
                        label: 'Receitas',
                        data: meses.map(m => dados.receitasPorMes.find(r => r.mes === m)?.valor ?? 0),
                        borderColor: '#1a237e',
                        backgroundColor: 'rgba(26, 35, 126, 0.15)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Despesas',
                        data: meses.map(m => dados.despesasPorMes.find(d => d.mes === m)?.valor ?? 0),
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.15)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {position: 'bottom'}
                },
                scales: {
                    y: {beginAtZero: true}
                }
            }
        });
    }
}
