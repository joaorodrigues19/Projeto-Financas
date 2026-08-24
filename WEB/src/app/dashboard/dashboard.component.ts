import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
    saldo = 5789;
    receitas = 3939;
    despesas = 1324;

    @ViewChild('graficoPizza') graficoPizzaRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('graficoLinha') graficoLinhaRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('graficoBarra') graficoBarraRef!: ElementRef<HTMLCanvasElement>;

    ngAfterViewInit(): void {
        this.criarGraficoPizza();
        this.criarGraficoLinha();
        this.criarGraficoBarra();
    }

    criarGraficoPizza(): void {
        new Chart(this.graficoPizzaRef.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['Alimentacao', 'Transporte', 'Lazer', 'Moradia', 'Saude'],
                datasets: [{
                    data: [450, 280, 200, 800, 150],
                    backgroundColor: ['#00bcd4', '#4CAF50', '#FF9800', '#2196F3', '#f44336']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    criarGraficoLinha(): void {
        new Chart(this.graficoLinhaRef.nativeElement, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Receitas',
                        data: [3200, 3500, 3100, 3800, 3600, 3939],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Despesas',
                        data: [2800, 2600, 2900, 2400, 2700, 1324],
                        borderColor: '#f44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    criarGraficoBarra(): void {
        new Chart(this.graficoBarraRef.nativeElement, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Saldo Mensal',
                    data: [400, 900, 200, 1400, 900, 2615],
                    backgroundColor: '#00bcd4'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}
