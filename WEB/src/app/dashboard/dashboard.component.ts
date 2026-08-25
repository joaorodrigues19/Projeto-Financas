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
        this.criarGraficoBarra();
        this.criarGraficoPizza();
        this.criarGraficoLinha();
    }

    criarGraficoBarra(): void {
        new Chart(this.graficoBarraRef.nativeElement, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Receitas',
                        data: [3200, 3500, 3100, 3800, 3600, 3939],
                        backgroundColor: '#1a237e'
                    },
                    {
                        label: 'Despesas',
                        data: [2800, 2600, 2900, 2400, 2700, 1324],
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

    criarGraficoPizza(): void {
        new Chart(this.graficoPizzaRef.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['Alimentacao', 'Transporte', 'Lazer', 'Moradia', 'Saude'],
                datasets: [{
                    data: [450, 280, 200, 800, 150],
                    backgroundColor: ['#1a237e', '#FF9800', '#00bcd4', '#4CAF50', '#f44336'],
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
                    ctx.fillText('45%', width / 2, height / 2);
                    ctx.restore();
                }
            }]
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
                        borderColor: '#1a237e',
                        backgroundColor: 'rgba(26, 35, 126, 0.15)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Despesas',
                        data: [2800, 2600, 2900, 2400, 2700, 1324],
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
