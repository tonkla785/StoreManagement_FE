import { Component, OnInit } from '@angular/core';
import { DashboardService, ProductSale } from '../service/dashboardservice';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { FormsModule, NgForm } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  productSales: ProductSale[] = [];
  monthlySale: number = 0;
  startDate: string = '';
  endDate: string = '';
  rangeSale: number = 0;

  // Chart.js data
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'ยอดขายสินค้า' }]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };

  loading: boolean = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchMonthlySale();
  }

  fetchData(): void {
    this.loading = true;

    this.dashboardService.getAllProductSales().subscribe((data) => {
      this.productSales = data;

      // กำหนด labels และ data ของ chart
      this.barChartData.labels = this.productSales.map(p => p.productName);
      this.barChartData.datasets[0].data = this.productSales.map(p => p.totalQuantity);

      this.loading = false;
    });
  }

  fetchMonthlySale(): void {
    this.dashboardService.getMonthlySale().subscribe(total => {
      this.monthlySale = total;
    });
  }

  fetchRangeSale(): void {
    if (!this.startDate || !this.endDate) return;

    this.dashboardService.getSalesBetween(this.startDate, this.endDate)
      .subscribe(total => {
        this.rangeSale = total;
      });
  }
}
